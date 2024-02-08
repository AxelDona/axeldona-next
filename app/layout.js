import '@/styles/globals.scss'
import { Inter } from 'next/font/google'
import {HomeLogo} from "@/components/header/HomeLogo";
import {AboutButton} from "@/components/header/AboutButton";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Axel Dona',
  description: 'Ingénieur polyvalent du numérique',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HomeLogo/>
        <AboutButton/>
        {children}
      </body>
    </html>
  )
}
