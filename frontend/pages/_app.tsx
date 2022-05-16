import { ApolloProvider } from '@apollo/client';
import { backendCLient } from 'graphql/apollo';
import type { AppProps } from 'next/app';
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ApolloProvider client={backendCLient}>
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
        />
        <Component {...pageProps} />
      </ApolloProvider>
    </RecoilRoot>
  );
};

export default MyApp;
