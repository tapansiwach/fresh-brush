import React, { useEffect, useRef } from 'react'
import './Canvas.scss';

function Canvas() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    contextRef.current = context;
  }, [])

  const startDrawing = (e) => {
    console.log("starting to draw");
    console.log(`e`, e);
  }

  const draw = (e) => {
    console.log("draw");
    console.log(`e`, e);
  }

  const finishDrawing = (e) => {
    console.log("finish drawing")
  }
  return (
    <canvas
      id="canvas"
      onMouseDown={e => startDrawing(e)}
      onMouseMove={e => draw(e)}
      onMouseUp={e => finishDrawing(e)}
      ref={canvasRef}
    >
      your browser doesn't support canvas
    </canvas>
  )
}

export default Canvas
