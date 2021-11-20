import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/config';
import { getImageDocs } from '../firebase/db';
import './Gallery.scss';

function Gallery({ uid }) {
  const [urls, setUrls] = useState([]);

  useEffect(async () => {
    const snap = await getImageDocs(uid);
    const allUrls = []
    snap.forEach(doc => {
      const aUrl = doc.data().downloadURL;
      allUrls.push(aUrl);
    });
    setUrls(allUrls);
  }, []);


  return (
    <div id="gallery">
      {urls.length > 0 &&
        urls.map(url => <img
          key={url}
          src={url}
          alt=""
          height="250px"
        />)
      }
    </div>
  )
}

export default Gallery
