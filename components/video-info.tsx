export default function VideoInfo({ videoData }: { videoData: any }) {
  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-2">{videoData.title}</h2>
      <div className="flex items-center space-x-2 text-sm text-gray-300 mb-3">
        <span>{videoData.genre}</span>
        <span>•</span>
        <span>{videoData.year}</span>
        <span>•</span>
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-white">{videoData.rating}</span>
        </div>
      </div>
      <p className="text-sm text-gray-300 mb-4">{videoData.description}</p>

      <div className="text-xs text-gray-400">
        <div className="mb-1">
          <span className="font-semibold">Next in Queue:</span> {videoData.nextInQueue}
        </div>
        <div>
          <span className="font-semibold">Stream Quality:</span> 4K Ultra HD
        </div>
      </div>
    </div>
  )
}

