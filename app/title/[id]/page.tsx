import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Play, Plus, ThumbsUp, Share2, Download, Info } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import ReviewSection from "@/components/review-section"
import AIAssistant from "@/components/ai-assistant"

export default function TitlePage({ params }: { params: { id: string } }) {
  // This would normally fetch data based on the ID
  const title = {
    id: params.id,
    title: "Cosmic Horizon",
    description:
      "An interstellar explorer journeys to the edge of the known universe, discovering a gateway to another dimension where time and space collide in spectacular fashion.",
    year: "2023",
    genre: "Sci-Fi",
    rating: "9.2",
    duration: "2h 1m",
    director: "Alexandra Chen",
    cast: ["Michael Rivera", "Sophia Kim", "David Oyelowo", "Zoe Saldana"],
    similarTitles: [
      { id: "quantum-effect", title: "The Quantum Effect" },
      { id: "digital-dreams", title: "Digital Dreams" },
      { id: "neon-nights", title: "Neon Nights" },
    ],
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-black to-zinc-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />

          {/* Hero Banner */}
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
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{title.title}</h1>

              <div className="flex items-center space-x-3 mb-4">
                <Badge variant="outline" className="border-purple-500 text-purple-300">
                  {title.genre}
                </Badge>
                <span className="text-gray-300">{title.year}</span>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-white">{title.rating}</span>
                </div>
                <span className="text-gray-300">{title.duration}</span>
              </div>

              <p className="text-gray-200 text-sm md:text-base mb-8 max-w-2xl">{title.description}</p>

              <div className="flex flex-wrap gap-4">
                <Link href={`/watch/${params.id}`}>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Play className="mr-2 h-4 w-4 fill-current" /> Play Now
                  </Button>
                </Link>
                <Button variant="secondary" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                  <Plus className="mr-2 h-4 w-4" /> Add to List
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <ThumbsUp className="mr-2 h-4 w-4" /> Rate
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="px-6 md:px-16 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-4">About {title.title}</h2>
                  <p className="text-gray-300 mb-4">{title.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Director</h3>
                      <p className="text-white">{title.director}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Cast</h3>
                      <p className="text-white">{title.cast.join(", ")}</p>
                    </div>
                  </div>
                </div>

                <ReviewSection />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4">Similar Titles</h2>
                <div className="space-y-4">
                  {title.similarTitles.map((similar) => (
                    <Link key={similar.id} href={`/title/${similar.id}`}>
                      <div className="group flex items-center bg-zinc-800 hover:bg-zinc-700 rounded-lg overflow-hidden transition-colors">
                        <div
                          className="w-24 h-16 bg-cover bg-center"
                          style={{ backgroundImage: `url('/placeholder.svg?height=180&width=320')` }}
                        ></div>
                        <div className="p-3">
                          <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                            {similar.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-8 bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Info className="h-5 w-5 text-purple-400 mr-2" />
                    <h3 className="font-medium text-white">AI Insights</h3>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    This title has a 94% positive sentiment score based on viewer reviews and engagement metrics.
                  </p>
                  <div className="bg-zinc-700/50 rounded p-2">
                    <p className="text-xs text-gray-400">
                      NeoxAI has detected authentic engagement with minimal manipulation attempts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AIAssistant />
    </main>
  )
}

