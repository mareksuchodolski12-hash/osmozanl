import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
