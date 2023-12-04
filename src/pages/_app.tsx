import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Script from "next/script";

import Auth from "./../components/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
import WalletProvider from "@/providers/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy={"beforeInteractive"}
      ></Script>
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </WalletProvider>
    </>
  );
}
