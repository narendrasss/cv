import React, { useEffect, useState } from 'react'
import Jimp from 'jimp'
import './App.css'

import Image from './components/Image'

function App() {
  const [image, setImage] = useState(null)

  useEffect(() => {
    Jimp.read('assets/peacock.png').then(im => setImage(im))
  }, [])

  if (!image) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <header className="header">
        <Image image={image} pixelSize={8} width={96} />
      </header>
    </div>
  )
}

export default App
