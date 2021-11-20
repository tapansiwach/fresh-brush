import React, { useEffect, useState } from 'react'
import { getImageDocs } from '../firebase/db';
import './Gallery.scss';

function Gallery({ uid }) {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getImageDocs(uid);
      const allUrls = []
      snap.forEach(doc => {
        const aUrl = doc.data().downloadURL;
        allUrls.push(aUrl);
      });
      setUrls(allUrls);
    }
    fetchData();
  }, [uid]);


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
