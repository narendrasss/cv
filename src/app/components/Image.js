import React, { useState } from 'react'
import Jimp from 'jimp'
import { toIntGrayscale, correlate } from '../../image/util'

function Image({ image, pixelSize, width }) {
  const im = image.clone().resize(width, Jimp.AUTO)
  const [copy, setCopy] = useState(toIntGrayscale(im))

  const filter = [
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9]
  ]

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${copy.length}, 1fr)`,
          gridTemplateRows: `repeat(${copy[0].length}, 1fr)`,
          fontSize: '0.6em'
        }}
      >
        {copy.map((height, x) =>
          height.map((pixel, y) => (
            <code
              key={`${x}-${y}`}
              style={{
                width: pixelSize,
                height: pixelSize,
                backgroundColor: `rgb(${pixel}, ${pixel}, ${pixel})`
              }}
            ></code>
          ))
        )}
      </div>
      <button onClick={() => setCopy(correlate(filter, copy))}>Blur</button>
    </div>
  )
}

export default Image
