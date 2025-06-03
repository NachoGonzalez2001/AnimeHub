"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Home,
  Search,
  BookOpen,
  TrendingUp,
  Star,
  Menu,
  X,
  Lightbulb,
  CalendarDays,
  User
} from "lucide-react";
import { useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

const navigationItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/anime", label: "Anime", icon: Search },
  { href: "/manga", label: "Manga", icon: BookOpen },
  { href: "/personaje", label: "Personaje", icon: User},
  { href: "/top-anime", label: "Top Anime", icon: TrendingUp },
  { href: "/top-manga", label: "Top Manga", icon: Star },
  { href: "/recommendations", label: "Recomendaciones", icon: Lightbulb },
  { href: "/test", label: "Test", icon: Search }, // para pruebas
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AH</span>
              </div>
              <span className="font-bold text-xl">AnimeHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 ml-[5%]">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button variant={isActive ? "default" : "ghost"} className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}

            {/* Dropdown personalizado para "Temporada" */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={pathname.startsWith("/temporada") ? "default" : "ghost"}
                  className="flex items-center space-x-2"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Temporada</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <Link href="/temporada/anime" className="block px-2 py-1 hover:bg-muted rounded">
                  Anime
                </Link>
                <Link href="/temporada/manga" className="block px-2 py-1 hover:bg-muted rounded">
                  Manga
                </Link>
                <Link href="/temporada/proximos" className="block px-2 py-1 hover:bg-muted rounded">
                  Próximos Estrenos
                </Link>
              </PopoverContent>
            </Popover>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start space-x-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}

            {/* Separador visual */}
            <hr className="mx-4 my-2 border-muted" />

            {/* Temporada en mobile */}
            <div className="px-4 pt-2">
              <p className="text-sm text-muted-foreground mb-1">Temporada</p>
              <Link href="/temporada/anime">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Anime
                </Button>
              </Link>
              <Link href="/temporada/manga">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Manga
                </Button>
              </Link>
              <Link href="/temporada/proximos">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Próximos Estrenos
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
