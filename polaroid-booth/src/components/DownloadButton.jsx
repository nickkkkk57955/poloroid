function DownloadButton({ image, filterName = "Original" }) {
  const download = () => {
    const link = document.createElement("a")
    link.href = image
    link.download = `polaroid-strip-${filterName.toLowerCase()}.png`
    link.click()
  }

  return (
    <button
      onClick={download}
      disabled={!image}
      className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
    >
      ⬇ Download Strip
    </button>
  )
}

export default DownloadButton
