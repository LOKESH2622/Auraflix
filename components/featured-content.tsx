"use client"

import { Button } from "@/components/ui/button"
import { Info, Play, Plus } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function FeaturedContent() {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundPosition: "center 20%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-6 md:px-16 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Cosmic Horizon</h1>

        <div className="flex items-center space-x-3 mb-4">
          <Badge variant="outline" className="border-purple-500 text-purple-300">
            Sci-Fi
          </Badge>
          <span className="text-gray-300">2023</span>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-white">9.2</span>
          </div>
          <span className="text-gray-300">2h 1m</span>
        </div>

        <p className="text-gray-200 text-sm md:text-base mb-8 max-w-2xl">
          An interstellar explorer journeys to the edge of the known universe, discovering a gateway to another
          dimension where time and space collide in spectacular fashion.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="/watch/cosmic-horizon">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Play className="mr-2 h-4 w-4 fill-current" /> Play Now
            </Button>
          </Link>
          <Button variant="secondary" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
            <Plus className="mr-2 h-4 w-4" /> Add to List
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
            <Info className="mr-2 h-4 w-4" /> More Info
          </Button>
        </div>
      </div>
    </div>
  )
}

