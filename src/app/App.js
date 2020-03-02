import React, { useEffect, useState } from 'react'
import Jimp from 'jimp'
import './App.css'

import Image from './components/Image'
import { toIntGrayscale, convolve, makeEmptyImage } from '../image/util'
import { BOX_FILTER } from '../image/filters'

function App() {
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => {
    Jimp.read('assets/peacock.png').then(im => {
      const resized = im.resize(48, Jimp.AUTO)
      setImage(toIntGrayscale(resized))
      setResult(makeEmptyImage(resized.getWidth(), resized.getHeight()))
    })
  }, [])

  useEffect(() => {
    console.log('Rerendered!')
  })

  if (!image) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <header className="header">
        <Image image={image} />
        {result && <Image image={result} />}
      </header>
      <button
        onClick={() =>
          convolve(BOX_FILTER, image, (partialResult, i) => {
            setTimeout(() => setResult(partialResult), 500 + i * 50)
          })
        }
      >
        Blur
      </button>
    </div>
  )
}

export default App
