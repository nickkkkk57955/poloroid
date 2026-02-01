// Filter functions for canvas manipulation
const applyFilter = (ctx, filter, width, height) => {
  if (!filter || filter === "none") return

  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    switch (filter) {
      case "grayscale": {
        const gray = 0.299 * r + 0.587 * g + 0.114 * b
        data[i] = gray
        data[i + 1] = gray
        data[i + 2] = gray
        break
      }
      case "vintage": {
        // Sepia + reduced contrast
        data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189)
        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168)
        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131)
        break
      }
      case "warm": {
        // Add warmth (increase red, decrease blue)
        data[i] = Math.min(255, r * 1.1)
        data[i + 1] = g
        data[i + 2] = Math.max(0, b * 0.9)
        break
      }
      case "cool": {
        // Add coolness (increase blue, decrease red)
        data[i] = Math.max(0, r * 0.9)
        data[i + 1] = g
        data[i + 2] = Math.min(255, b * 1.1)
        break
      }
      case "dramatic": {
        // Increase contrast and saturation
        const factor = 1.3
        data[i] = Math.min(255, Math.max(0, factor * (r - 128) + 128))
        data[i + 1] = Math.min(255, Math.max(0, factor * (g - 128) + 128))
        data[i + 2] = Math.min(255, Math.max(0, factor * (b - 128) + 128))
        break
      }
    }
  }

  ctx.putImageData(imageData, 0, 0)
}

// Helper function to load a single image
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    // Only set crossOrigin for non-data URLs
    if (!src.startsWith('data:')) {
      img.crossOrigin = "anonymous"
    }
    img.onload = () => resolve(img)
    img.onerror = (err) => {
      console.error("Failed to load image:", src.substring(0, 50) + "...")
      reject(err)
    }
    img.src = src
  })
}

export default async function combineImages(images, filter = "none") {
  try {
    // Load all images in parallel while preserving order
    const imgElements = await Promise.all(images.map(src => loadImage(src)))

    if (imgElements.length === 0) {
      throw new Error("No images to combine")
    }

    const width = imgElements[0].width
    const height = imgElements[0].height

    // Polaroid style dimensions
    const padding = 40
    const bottomPadding = 80
    const photoGap = 20
    
    const canvas = document.createElement("canvas")
    canvas.width = width + padding * 2
    canvas.height = (height + photoGap) * images.length + bottomPadding + padding

    const ctx = canvas.getContext("2d")

    // White polaroid background with subtle shadow effect
    ctx.fillStyle = "#fafafa"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add subtle border
    ctx.strokeStyle = "#e0e0e0"
    ctx.lineWidth = 2
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2)

    imgElements.forEach((img, i) => {
      ctx.drawImage(
        img,
        padding,
        padding + i * (height + photoGap),
        width,
        height
      )
    })

    // Apply filter to the entire canvas
    applyFilter(ctx, filter, canvas.width, canvas.height)

    // Add a subtle date stamp at the bottom (polaroid style)
    ctx.fillStyle = "#888"
    ctx.font = "16px 'Courier New', monospace"
    ctx.textAlign = "center"
    const date = new Date().toLocaleDateString()
    ctx.fillText(date, canvas.width / 2, canvas.height - 25)

    return canvas.toDataURL("image/png")
  } catch (error) {
    console.error("Error combining images:", error)
    return null
  }
}
