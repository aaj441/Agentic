import { Nav } from '@/components/marketing/nav'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      <div className="pt-16">{children}</div>
    </>
  )
}
