import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Crimson_Text, Mukta } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import { ContextProvider } from "@/context/ContextProvider";

const crimson = Crimson_Text({
  weight: ["400", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--crimson-font",
  display: "swap",
});
const mukta = Mukta({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--mukta-font",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Picasso Explorer</title>
        </Head>
        <main
          className={`flex min-h-screen h-full flex-col items-center bg-semiblack text-beige ${crimson.variable} ${mukta.variable} font-mukta`}
        >
          <Component {...pageProps} />
          <ToastContainer />
        </main>
      </QueryClientProvider>
    </ContextProvider>
  );
}
