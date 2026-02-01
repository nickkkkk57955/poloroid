import { useState } from "react"

const FILTERS = [
  { id: "none", name: "Original", css: "" },
  { id: "grayscale", name: "B&W", css: "grayscale(100%)" },
  { id: "vintage", name: "Vintage", css: "sepia(60%) contrast(90%) brightness(90%)" },
  { id: "warm", name: "Warm", css: "sepia(30%) saturate(120%) brightness(105%)" },
  { id: "cool", name: "Cool", css: "saturate(80%) hue-rotate(20deg) brightness(105%)" },
  { id: "dramatic", name: "Dramatic", css: "contrast(130%) brightness(90%) saturate(110%)" },
]

function FilterPreview({ photos, selectedFilter, onFilterSelect }) {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-200">Choose a Filter</h3>
      
      {/* Filter Options */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterSelect(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedFilter.id === filter.id
                ? "bg-white text-gray-900 shadow-lg scale-105"
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white"
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      {/* Photo Preview Grid */}
      <div className="grid grid-cols-2 gap-3 p-4 bg-gray-800/30 rounded-xl backdrop-blur-sm">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-md bg-white p-1"
          >
            <img
              src={photo}
              alt={`Photo ${index + 1}`}
              className="w-full h-auto rounded"
              style={{ filter: selectedFilter.css }}
            />
            <span className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { FILTERS }
export default FilterPreview
