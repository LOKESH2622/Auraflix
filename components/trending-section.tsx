"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { Play } from "lucide-react"

export default function TrendingSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(true)
  const isMobile = useMobile()

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftScroll(scrollLeft > 0)
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const trendingItems = [
    { id: "quantum-effect", title: "The Quantum Effect", genre: "Thriller", year: "2023", rating: "8.7" },
    { id: "eternal-echo", title: "Eternal Echo", genre: "Drama", year: "2023", rating: "9.0" },
    { id: "neon-nights", title: "Neon Nights", genre: "Action", year: "2022", rating: "8.5" },
    { id: "silent-whisper", title: "Silent Whisper", genre: "Horror", year: "2023", rating: "7.9" },
    { id: "digital-dreams", title: "Digital Dreams", genre: "Sci-Fi", year: "2023", rating: "8.8" },
    { id: "crimson-tide", title: "Crimson Tide", genre: "Adventure", year: "2022", rating: "8.3" },
    { id: "azure-skies", title: "Azure Skies", genre: "Fantasy", year: "2023", rating: "9.1" },
    { id: "midnight-run", title: "Midnight Run", genre: "Action", year: "2022", rating: "8.6" },
  ]

  return (
    <div className="px-4 md:px-8 py-8 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">Trending Now</h2>
        <Link href="/trending" className="text-sm text-gray-400 hover:text-white flex items-center">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="relative">
        {!isMobile && showLeftScroll && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full h-10 w-10"
            onClick={() => scroll("left")}
          >
            <ChevronRight className="h-6 w-6 rotate-180" />
          </Button>
        )}

        <div ref={scrollRef} className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4" onScroll={handleScroll}>
          {trendingItems.map((item) => (
            <Link key={item.id} href={`/watch/${item.id}`} className="flex-none">
              <div className="group relative w-48 md:w-64 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div
                  className="aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url('/placeholder.svg?height=360&width=640')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  <div className="flex items-center text-xs text-gray-300 mt-1">
                    <span>{item.genre}</span>
                    <span className="mx-1">•</span>
                    <span>{item.year}</span>
                    <div className="ml-auto flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" className="bg-purple-600 hover:bg-purple-700 rounded-full h-12 w-12">
                    <Play className="h-6 w-6 fill-white" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!isMobile && showRightScroll && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full h-10 w-10"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  )
}

