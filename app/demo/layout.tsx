import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "A little joy, revealed | Vector Vending",
  description:
    "Explore real Polar Puffs & Cakes and Uncle Lee machines in an interactive simulation. Choose a treat, watch a virtual dispense and discover the product. Selection varies by machine.",
};
export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
