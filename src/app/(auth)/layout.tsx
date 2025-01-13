export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <h1>AuthLayout</h1>
      <div>{children}</div>
    </>
  )
}
