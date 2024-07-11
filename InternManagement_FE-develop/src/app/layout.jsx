import './globals.css'
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import MainLayout from './rootPage';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Internship Management',
  description: 'Manage Intern Student In Business',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout children={children}/>
      </body>
    </html>
  )
}
