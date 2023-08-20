// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toast-provider'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jumpers ecommerce-admin',
  description: 'Admin section to manage Jumpers ',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  return (
    
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <ModalProvider />
            <ToasterProvider />
            {children}
          </body>
        </html>
      </ClerkProvider>
    
  )
}
