"use client"

import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const isMobile = useMobile()

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4">
        {!isMobile && (
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-purple-400">
              <span className="flex items-center">
                Neo<span className="text-purple-300">X</span>
              </span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-white hover:text-purple-300 transition-colors">
                Home
              </Link>
              <Link href="/movies" className="text-white hover:text-purple-300 transition-colors">
                Movies
              </Link>
              <Link href="/shows" className="text-white hover:text-purple-300 transition-colors">
                TV Shows
              </Link>
              <Link href="/my-list" className="text-white hover:text-purple-300 transition-colors">
                My List
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2 ml-auto">
          {isSearchOpen ? (
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full md:w-[300px] bg-zinc-800 border-zinc-700 text-white focus-visible:ring-purple-500"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full text-gray-400"
                onClick={() => setIsSearchOpen(false)}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-zinc-800"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-800">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full bg-purple-500 text-white hover:bg-purple-600">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}

