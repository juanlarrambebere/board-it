import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Operation,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

/**
 * Evaluates whether the graphql operation is a subscription or not.
 *
 * @param operation the graphql operation
 * @returns true if the operation is a subscription, false otherwise
 */
const isSubscription = (operation: Operation): boolean => {
  const definition = getMainDefinition(operation.query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
};

type ClientProps = {
  httpURL: string;
  wsURL?: string;
  headers?: Record<string, string>;
};

/**
 * Creates an ApolloClient instance that connects to the backend graphql endpoint.
 *
 * The link it uses to connect to the backend depends both on the runtime environment and the operation type.
 * On the server side, subscriptions don't make sense. Therefore an httpLink is used.
 * On the client side, subscriptions are supported. Therefore, a websocket link is used for subscriptions and an httpLink for queries and mutations.
 *
 * @param props the client props
 * @returns an instance of ApolloClient
 */
const createApolloClient = ({ httpURL, wsURL, headers }: ClientProps) => {
  const isSSR = typeof window === 'undefined';
  const httpLink = new HttpLink({
    uri: httpURL,
    headers,
    credentials: 'include',
  });

  let smartLink: ApolloLink | undefined;

  if (isSSR || !wsURL) {
    smartLink = httpLink;
  } else {
    const wsLink = new GraphQLWsLink(
      createClient({
        url: wsURL,
        connectionParams: {
          reconnect: true,
          headers,
        },
      })
    );
    smartLink = split(isSubscription, wsLink, httpLink);
  }

  return new ApolloClient({
    link: smartLink,
    cache: new InMemoryCache(),
    ssrMode: isSSR,
  });
};

export const backendCLient = createApolloClient({
  httpURL: process.env.NEXT_PUBLIC_BOARD_IT_BACKEND_GRAPHQL_HTTP_URL!,
  wsURL: process.env.NEXT_PUBLIC_BOARD_IT_BACKEND_GRAPHQL_WS_URL!,
  headers: {},
});
