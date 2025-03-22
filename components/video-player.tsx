"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { FastForward, Maximize, Minimize, Pause, Play, SkipForward, Volume2, VolumeX } from "lucide-react"
import { formatTime } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface VideoPlayerProps {
  videoData: {
    id: string
    title: string
    duration: number
    currentTime: number
    nextInQueue: string
  }
  showControls: boolean
  syncStatus: "synced" | "syncing" | "delayed"
}

export default function VideoPlayer({ videoData, showControls, syncStatus }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(100)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(videoData.currentTime)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Initialize video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = videoData.currentTime

      // Simulate buffering occasionally
      const bufferInterval = setInterval(() => {
        if (Math.random() > 0.9) {
          setIsBuffering(true)
          setTimeout(() => setIsBuffering(false), 1500)
        }
      }, 15000)

      return () => clearInterval(bufferInterval)
    }
  }, [videoData.currentTime])

  // Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && isPlaying && !isBuffering) {
        setCurrentTime(videoRef.current.currentTime)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, isBuffering])

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100
    }
    setIsMuted(newVolume === 0)
  }

  // Handle mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume / 100
      } else {
        videoRef.current.volume = 0
      }
      setIsMuted(!isMuted)
    }
  }

  // Handle seeking
  const handleSeek = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }

    setIsFullscreen(!isFullscreen)
  }

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Calculate buffer progress (simulated)
  const bufferProgress = Math.min(currentTime + videoData.duration * 0.1, videoData.duration)

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden" onClick={togglePlay}>
      {/* Video Element */}
      <video ref={videoRef} className="w-full h-full object-contain" autoPlay playsInline>
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
        <track src="/placeholder.vtt" kind="subtitles" srcLang="en" label="English" />
        Your browser does not support the video tag.
      </video>

      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-purple-500 border-purple-300/30 rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-sm">Buffering...</p>
            {syncStatus === "delayed" && (
              <p className="text-yellow-400 text-xs mt-2">Connection delayed. Resyncing...</p>
            )}
          </div>
        </div>
      )}

      {/* Video Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-6 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar */}
        <div className="mb-2 px-2">
          <div className="relative">
            {/* Buffer Progress */}
            <div
              className="absolute h-1 bg-white/30 rounded-full"
              style={{ width: `${(bufferProgress / videoData.duration) * 100}%` }}
            ></div>

            {/* Progress Slider */}
            <Slider
              value={[currentTime]}
              min={0}
              max={videoData.duration}
              step={1}
              onValueChange={handleSeek}
              className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-transparent [&_[role=slider]]:bg-purple-500 [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-purple-500 [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-3 px-2">
          <Button size="icon" variant="ghost" className="text-white hover:bg-white/10" onClick={togglePlay}>
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
            <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/10"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime += 10
                setCurrentTime(videoRef.current.currentTime)
              }
            }}
          >
            <FastForward className="w-5 h-5" />
            <span className="sr-only">Forward 10s</span>
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/10"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = videoData.duration
                setCurrentTime(videoData.duration)
              }
            }}
          >
            <SkipForward className="w-5 h-5" />
            <span className="sr-only">Next</span>
          </Button>

          <div className="relative flex items-center">
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={toggleMute}
              onMouseEnter={() => setShowVolumeSlider(true)}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
            </Button>

            {showVolumeSlider && (
              <div
                className="absolute bottom-full left-0 mb-2 p-2 bg-zinc-900 rounded-md w-32"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-purple-500 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-purple-500 [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0"
                />
              </div>
            )}
          </div>

          <div className="text-sm text-white ml-2">
            {formatTime(currentTime)} / {formatTime(videoData.duration)}
          </div>

          {/* Next Video Info */}
          {!isMobile && (
            <div className="ml-4 text-xs text-gray-300 flex items-center">
              <span>Next:</span>
              <span className="ml-1 text-white">{videoData.nextInQueue}</span>
            </div>
          )}

          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/10 ml-auto"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            <span className="sr-only">{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

