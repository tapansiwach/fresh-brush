import React, { useEffect, useState } from 'react'
import { getImageDocs } from '../firebase/db';
import './Gallery.scss';

function Gallery({ uid }) {
  const [images, setImages] = useState([]);

  useEffect(async () => {
    const snap = await getImageDocs(uid);
    snap.forEach(doc => {
      console.log(`doc.data()`, doc.data());
    })
  }, []);

  return (
    <div>
      Gallery
    </div>
  )
}

export default Gallery
