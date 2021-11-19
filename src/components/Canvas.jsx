import React, { useEffect, useRef, useState } from 'react'
import './Canvas.scss';

function Canvas() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.lineJoin = "round";
    context.lineCap = "round";
    contextRef.current = context;
  }, [])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const [x, y] = [offsetX / devicePixelRatio, offsetY / devicePixelRatio];
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  }

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const [x, y] = [offsetX / devicePixelRatio, offsetY / devicePixelRatio];
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  }

  const finishDrawing = (e) => {
    contextRef.current.closePath();
    setIsDrawing(false);
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
