import { ApolloProvider } from "@apollo/client";
import { backendCLient } from "@graphql/apollo";
import type { AppProps } from "next/app";
import { FC } from "react";
import "../styles/globals.css";

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={backendCLient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
