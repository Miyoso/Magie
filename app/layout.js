import { Inter, Cinzel } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })

export const metadata = {
    title: 'Suivi des Jetons - Académie',
    description: 'Gérez votre progression académique',
}

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
        <body className={`${inter.variable} ${cinzel.variable} font-sans`}>{children}</body>
        </html>
    )
}