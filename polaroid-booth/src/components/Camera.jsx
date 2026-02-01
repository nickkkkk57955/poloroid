import { useEffect, useRef, useState } from "react"
import Countdown from "./Countdown"

const TOTAL_PHOTOS = 4

function Camera({ setPhotos }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const [captured, setCaptured] = useState([])
  const [start, setStart] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    async function startCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
    }
    startCamera()
  }, [])

  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Flip horizontally to match mirror view
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0)
    ctx.setTransform(1, 0, 0, 1, 0, 0) // Reset transform

    const image = canvas.toDataURL("image/png")
    setCaptured(prev => [...prev, image])
  }

  useEffect(() => {
    if (captured.length === TOTAL_PHOTOS) {
      setPhotos(captured)
    }
  }, [captured])

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Camera viewfinder */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl blur-sm opacity-50"></div>
        <div className="relative bg-black rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="rounded-xl w-96 shadow-2xl"
          />
          
          {/* Photo counter overlay */}
          {start && current < TOTAL_PHOTOS && (
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              📷 {current + 1} / {TOTAL_PHOTOS}
            </div>
          )}

          {/* Captured photos thumbnails */}
          {captured.length > 0 && (
            <div className="absolute bottom-3 left-3 right-3 flex gap-2 justify-center">
              {captured.map((photo, idx) => (
                <div key={idx} className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white/50 shadow-lg">
                  <img src={photo} alt={`Captured ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              {Array.from({ length: TOTAL_PHOTOS - captured.length }).map((_, idx) => (
                <div key={`empty-${idx}`} className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-500/50 bg-gray-800/50"></div>
              ))}
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {!start && (
        <button
          onClick={() => setStart(true)}
          className="px-8 py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        >
          🎬 Start Photo Session
        </button>
      )}

      {start && current < TOTAL_PHOTOS && (
        <Countdown
          onComplete={() => {
            capturePhoto()
            setCurrent(prev => prev + 1)
          }}
        />
      )}

      {!start && (
        <p className="text-gray-400 text-sm text-center max-w-xs">
          Get ready! You'll have a few seconds between each photo. We'll take {TOTAL_PHOTOS} photos total.
        </p>
      )}
    </div>
  )
}

export default Camera
