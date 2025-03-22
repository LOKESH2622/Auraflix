import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import FeaturedContent from "@/components/featured-content"
import TrendingSection from "@/components/trending-section"
import AIAssistant from "@/components/ai-assistant"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-black to-zinc-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <FeaturedContent />
          <TrendingSection />
        </div>
      </div>
      <AIAssistant />
    </main>
  )
}

