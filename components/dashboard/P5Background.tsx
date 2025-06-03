"use client"

import { useEffect, useRef } from "react"

const P5Background = () => {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This would normally contain p5.js initialization code
    // For now, we'll just create a placeholder
    const canvas = document.createElement("canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.position = "absolute"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.zIndex = "-1"

    if (canvasRef.current) {
      canvasRef.current.appendChild(canvas)
    }

    return () => {
      if (canvasRef.current && canvas.parentNode === canvasRef.current) {
        canvasRef.current.removeChild(canvas)
      }
    }
  }, [])

  return <div ref={canvasRef} className="fixed inset-0 -z-10"></div>
}

export default P5Background
