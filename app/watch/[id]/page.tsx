"use client"

import { useEffect, useState } from "react"
import VideoPlayer from "@/components/video-player"
import { ArrowLeft, Info } from "lucide-react"
import Link from "next/link"
import VideoInfo from "@/components/video-info"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import AIAssistant from "@/components/ai-assistant"

export default function WatchPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [videoData, setVideoData] = useState<any>(null)
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing" | "delayed">("syncing")
  const { toast } = useToast()
  const isMobile = useMobile()

  // Simulate loading video data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setVideoData({
        id: params.id,
        title: "Cosmic Horizon",
        description:
          "An interstellar explorer journeys to the edge of the known universe, discovering a gateway to another dimension where time and space collide in spectacular fashion.",
        duration: 7260, // 2 hours 1 minute in seconds
        currentTime: 120, // 2 minutes in
        nextInQueue: "The Quantum Effect",
        genre: "Sci-Fi",
        year: "2023",
        rating: "9.2",
      })

      // Simulate sync completion
      setTimeout(() => {
        setSyncStatus("synced")
        toast({
          title: "Video synchronized",
          description: "You're now watching in real-time with other viewers",
        })
      }, 3000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [params.id, toast])

  // Hide controls after inactivity
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowControls(false)
      }, 3000)

      const handleMouseMove = () => {
        setShowControls(true)
        clearTimeout(timer)
      }

      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("touchstart", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("touchstart", handleMouseMove)
        clearTimeout(timer)
      }
    }
  }, [isLoading, showControls])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-purple-300">Preparing your stream...</p>
          <p className="text-sm text-gray-400 mt-2">Synchronizing with server</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black">
      <VideoPlayer videoData={videoData} showControls={showControls} syncStatus={syncStatus} />

      <div
        className={`absolute top-0 left-0 right-0 p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center">
          <Link href={`/title/${params.id}`}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-black/30">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="ml-2 text-xl font-bold text-white">{videoData.title}</h1>

          <div className="ml-auto flex items-center gap-2">
            {syncStatus === "syncing" && (
              <div className="flex items-center bg-yellow-900/60 px-3 py-1 rounded-full text-xs">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                Syncing...
              </div>
            )}
            {syncStatus === "synced" && (
              <div className="flex items-center bg-green-900/60 px-3 py-1 rounded-full text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Live Sync
              </div>
            )}
            {syncStatus === "delayed" && (
              <div className="flex items-center bg-red-900/60 px-3 py-1 rounded-full text-xs">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                Delayed (3s)
              </div>
            )}

            <Button variant="ghost" size="icon" className="text-white hover:bg-black/30">
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {!isMobile && showControls && (
        <div className="absolute right-0 top-20 bg-black/70 p-4 rounded-l-lg w-80 transition-opacity duration-300">
          <VideoInfo videoData={videoData} />
        </div>
      )}

      <AIAssistant />
    </div>
  )
}

