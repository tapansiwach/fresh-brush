import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { saveImageToStorage } from '../firebase/storage';
import { ImUndo2 } from 'react-icons/im';
import { MdLayersClear } from 'react-icons/md';

import './Canvas.scss';

function Canvas() {
  const [user] = useAuthState(auth);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const colorInputRef = useRef(null);
  const thicknessInputRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState([]);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    const canvas = canvasRef.current;
    const [sideNavWidth, mainContentPadding] = [250, 16];
    canvas.width = (window.innerWidth - (sideNavWidth + 2 * mainContentPadding)) * devicePixelRatio;
    canvas.height = (window.innerHeight - 140) * devicePixelRatio;
    canvas.style.width = `${(window.innerWidth - (sideNavWidth + 2 * mainContentPadding))}px`;
    canvas.style.height = `${(window.visualViewport.height - 140)}px`;
    context.lineJoin = "round";
    context.lineCap = "round";
    context.strokeStyle = colorInputRef.current.value;
    context.lineWidth = thicknessInputRef.current.value;
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
    const [width, height] = [canvasRef.current.width, canvasRef.current.height];
    const data = contextRef.current.getImageData(0, 0, width, height);
    setStrokes([...strokes, { width, height, data }]);
  }

  const undoStroke = () => {
    if (strokes.length > 0) {
      strokes.pop();
      const restorePoint = strokes[strokes.length - 1];
      if (strokes.length > 0) {
        contextRef.current.putImageData(restorePoint.data, 0, 0);
      } else {
        clearCanvas();
      }
    }
  }

  const clearCanvas = () => {
    const [width, height] = [canvasRef.current.width, canvasRef.current.height];
    contextRef.current.clearRect(0, 0, width, height);
    setStrokes([]);
  }

  const saveImage = () => {
    const uid = user.uid;
    const fileName = Date.now();
    canvasRef.current.toBlob(blob => {
      saveImageToStorage(uid, fileName, blob);
    });
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
      <div className="tools">
        <div className="brush-inputs">
          <input
            type="color"
            name="color"
            ref={colorInputRef}
            onChange={e => contextRef.current.strokeStyle = e.target.value}
          />
          <input
            type="range"
            name="thickness"
            min="1"
            max="30"
            ref={thicknessInputRef}
            onChange={e => contextRef.current.lineWidth = e.target.value}
          />
        </div>
        <div className="canvas-controls">
          <ImUndo2
            title="Undo Stroke"
            className="control undo"
            onClick={undoStroke}
          />
          <MdLayersClear
            title="Clear Canvas"
            className="control clear"
            onClick={clearCanvas}
          />
        </div>
      </div>
      <div
        className="save"
        onClick={saveImage}
      >
        Save Image
      </div>
    </>
  )
}

export default Canvas
