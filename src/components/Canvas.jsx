import React, { useEffect, useRef, useState } from 'react'
import './Canvas.scss';

function Canvas() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    const canvas = canvasRef.current;
    const [sideNavWidth, mainContentPadding] = [250, 16];
    canvas.width = (window.innerWidth - (sideNavWidth + 2 * mainContentPadding)) * devicePixelRatio;
    canvas.height = (window.innerHeight - 100) * devicePixelRatio;
    canvas.style.width = `${(window.innerWidth - (sideNavWidth + 2 * mainContentPadding))}px`;
    canvas.style.height = `${(window.innerHeight - 100)}px`;
    context.lineJoin = "round";
    context.lineCap = "round";
    context.scale(devicePixelRatio, devicePixelRatio);
    contextRef.current = context;
  }, [])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  const finishDrawing = (e) => {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  const saveImage = () => {
    console.log("TODO: implement functionality to save image");
  }

  return (
    <>
      <canvas
        id="canvas"
        onMouseDown={e => startDrawing(e)}
        onMouseMove={e => draw(e)}
        onMouseUp={e => finishDrawing(e)}
        ref={canvasRef}
      >
        your browser doesn't support canvas
      </canvas>
      <button
        onClick={saveImage}
      >
        Save Image
      </button>
    </>
  )
}

export default Canvas
