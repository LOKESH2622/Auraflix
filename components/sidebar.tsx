"use client"

import type React from "react"

import { Home, Film, Tv, Heart, Bookmark, History, Settings, Flame } from "lucide-react"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"

export default function Sidebar() {
  const isMobile = useMobile()

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800">
        <div className="flex justify-around py-2">
          <SidebarIcon icon={<Home size={20} />} label="Home" href="/" />
          <SidebarIcon icon={<Film size={20} />} label="Movies" href="/movies" />
          <SidebarIcon icon={<Tv size={20} />} label="Shows" href="/shows" />
          <SidebarIcon icon={<Heart size={20} />} label="My List" href="/my-list" />
          <SidebarIcon icon={<Flame size={20} />} label="Trending" href="/trending" />
        </div>
      </div>
    )
  }

  return (
    <div className="hidden sm:flex flex-col w-16 min-h-screen bg-zinc-900 border-r border-zinc-800">
      <div className="flex flex-col items-center pt-8 pb-4">
        <Link href="/" className="text-2xl font-bold text-purple-400 mb-8">
          <span>X</span>
        </Link>
        <div className="flex flex-col space-y-6">
          <SidebarIcon icon={<Home size={20} />} label="Home" href="/" />
          <SidebarIcon icon={<Film size={20} />} label="Movies" href="/movies" />
          <SidebarIcon icon={<Tv size={20} />} label="Shows" href="/shows" />
          <SidebarIcon icon={<Heart size={20} />} label="My List" href="/my-list" />
          <SidebarIcon icon={<Bookmark size={20} />} label="Saved" href="/saved" />
          <SidebarIcon icon={<History size={20} />} label="History" href="/history" />
          <SidebarIcon icon={<Flame size={20} />} label="Trending" href="/trending" />
        </div>
      </div>
      <div className="mt-auto mb-8 flex justify-center">
        <SidebarIcon icon={<Settings size={20} />} label="Settings" href="/settings" />
      </div>
    </div>
  )
}

function SidebarIcon({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center w-12 h-12 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-zinc-800 transition-colors group"
    >
      {icon}
      <span className="sr-only">{label}</span>
      <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1">
        {label}
      </span>
    </Link>
  )
}

