import Logo from "@/components/Logo";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Crimson_Text, Mukta } from "next/font/google";
import Link from "next/link";

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
  return (
    <main
      className={`flex min-h-screen h-full flex-col items-center bg-semiblack text-beige ${crimson.variable} ${mukta.variable} font-mukta`}
    >
      <nav className=" w-[90%] xl:w-[1224px] h-28 flex items-end">
        <Link href={"/"}>
          <Logo />
        </Link>
      </nav>
      <Component {...pageProps} />{" "}
    </main>
  );
}
