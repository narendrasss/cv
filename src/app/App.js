import React, { useState } from 'react'
import Jimp from 'jimp'
import './App.css'

import Image from './components/Image'

function App() {
  const [image, setImage] = useState(null)

  React.useEffect(() => {
    Jimp.read('assets/sample.jpg').then(im => setImage(im))
  }, [])

  if (!image) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <header className="header">
        <Image image={image} width={50} />
      </header>
    </div>
  )
}

export default App
