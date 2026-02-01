import { useEffect, useState } from "react"
import combineImages from "../utils/combineImages"
import DownloadButton from "./DownloadButton"
import FilterPreview, { FILTERS } from "./FilterPreview"

function PhotoStrip({ photos, setPhotos }) {
  const [finalImage, setFinalImage] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0])
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    async function generateStrip() {
      setIsGenerating(true)
      const combined = await combineImages(photos, selectedFilter.id)
      setFinalImage(combined)
      setIsGenerating(false)
    }
    generateStrip()
  }, [photos, selectedFilter])

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-6xl mx-auto">
      {/* Left side - Filter Preview */}
      <div className="w-full lg:w-1/2">
        <FilterPreview
          photos={photos}
          selectedFilter={selectedFilter}
          onFilterSelect={setSelectedFilter}
        />
      </div>

      {/* Right side - Final Polaroid Strip */}
      <div className="w-full lg:w-1/2 flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-200">Your Polaroid Strip</h3>
        
        <div className="relative bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
          {isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-xl z-10">
              <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
            </div>
          )}
          
          {finalImage && (
            <img 
              src={finalImage} 
              className="max-h-[500px] w-auto rounded-lg shadow-2xl transform hover:scale-[1.02] transition-transform duration-300" 
              alt="Polaroid Strip"
            />
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <DownloadButton image={finalImage} filterName={selectedFilter.name} />
          
          <button
            onClick={() => setPhotos([])}
            className="px-6 py-3 rounded-lg font-semibold bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white transition-all duration-200"
          >
            ↺ Retake Photos
          </button>
        </div>
      </div>
    </div>
  )
}

export default PhotoStrip
