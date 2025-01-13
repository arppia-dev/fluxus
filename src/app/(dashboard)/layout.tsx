export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <h1>DashboardLayout</h1>
      <div>{children}</div>
    </>
  )
}
