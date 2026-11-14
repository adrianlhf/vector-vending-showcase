import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL('https://vectorvending.pages.dev'),title:'Vector Vending | Local favourites. Closer to you.',description:'Discover Uncle Lee Confectionery and Polar Puffs & Cakes through Vector Vending. Find a machine, explore the virtual demo, or partner with us in Singapore.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
