import { useEffect, useState } from "react"

function Countdown({ onComplete }) {
  const [time, setTime] = useState(5)

  useEffect(() => {
    if (time === 0) {
      onComplete()
      setTime(5)
      return
    }

    const timer = setTimeout(() => {
      setTime(prev => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [time])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-md opacity-50 animate-pulse"></div>
        
        {/* Main countdown circle */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-purple-500/50 flex items-center justify-center shadow-2xl">
          <span className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            {time}
          </span>
        </div>
      </div>
      <p className="text-gray-400 text-sm animate-pulse">Get ready!</p>
    </div>
  )
}

export default Countdown
