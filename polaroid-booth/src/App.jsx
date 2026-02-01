import { useState } from "react"
import Camera from "./components/Camera"
import PhotoStrip from "./components/PhotoStrip"

function App() {
  const [photos, setPhotos] = useState([])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Studio backdrop effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            📸 Polaroid Booth
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {photos.length === 0 
              ? "Strike a pose and capture your memories!" 
              : "Choose a filter and download your polaroid strip!"}
          </p>
        </div>

        {/* Main content area */}
        <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 shadow-2xl">
          {photos.length === 0 ? (
            <Camera setPhotos={setPhotos} />
          ) : (
            <PhotoStrip photos={photos} setPhotos={setPhotos} />
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Made with ❤️ | Your photos are processed locally and never uploaded
        </p>
      </div>
    </div>
  )
}

export default App
