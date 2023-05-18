import './globals.css'

export const metadata = {
  title: 'memory-game',
  description: 'funny memory game',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  )
}
