import { Crimson_Text, Mukta } from "next/font/google";

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

export default function Home() {
  return (
    <main
      className={`flex min-h-screen h-full flex-col items-center bg-semiblack text-beige ${crimson.variable} ${mukta.variable} font-mukta`}
    >
      <h1>Hello world</h1>
    </main>
  );
}
