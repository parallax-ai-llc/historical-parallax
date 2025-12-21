import { MapSidebar } from "@/components/map-sidebar"
import { MapMobileNav } from "@/components/map-mobile-nav"

export default function MapsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 flex-col py-8 px-2 md:px-4 lg:pl-80">
      <MapSidebar />
      <main className="mx-auto w-full max-w-[1400px]">
        <MapMobileNav />
        {children}
      </main>
    </div>
  )
}
