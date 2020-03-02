import React, { useEffect, useState } from 'react'
import Jimp from 'jimp'
import './App.css'

import Image from './components/Image'
import { toIntGrayscale, convolve, makeEmptyImage } from '../image/util'
import { GAUSSIAN, BOX } from '../image/filters'

const filters = {
  gaussian: GAUSSIAN,
  box: BOX
}

function App() {
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('gaussian')
  const filter = filters[selectedFilter]

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
          convolve(filter, image, (partialResult, i) => {
            setTimeout(() => setResult(partialResult), 500 + i * 5)
          })
        }
      >
        Blur
      </button>
      <select
        value={selectedFilter}
        onChange={e => setSelectedFilter(e.target.value)}
      >
        {Object.keys(filters).map(f => (
          <option value={f}>{f[0].toUpperCase() + f.slice(1)}</option>
        ))}
      </select>
    </div>
  )
}

export default App
