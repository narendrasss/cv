import React, { useEffect, useState } from 'react'
import Jimp from 'jimp'
import './App.css'

import Image from './components/Image'
import { toIntGrayscale, convolve } from '../image/util'
import { BOX_FILTER } from '../image/filters'

function App() {
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => {
    Jimp.read('assets/peacock.png').then(im => {
      const resized = im.resize(32, Jimp.AUTO)
      setImage(toIntGrayscale(resized))
    })
  }, [])

  if (!image) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <header className="header">
        <Image image={image} pixelSize={16} />
        {result && <Image image={result} pixelSize={16} />}
      </header>
      <button onClick={() => setResult(convolve(BOX_FILTER, image))}>
        Blur
      </button>
    </div>
  )
}

export default App
