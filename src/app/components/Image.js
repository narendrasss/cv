import React, { useState, useEffect } from 'react'
import Jimp from 'jimp'
import { toIntGrayscale, convolve } from '../../image/util'

function Image({ image, pixelSize, width }) {
  const im = image.clone().resize(width, Jimp.AUTO)
  const grayscale = toIntGrayscale(im)
  const [copy, setCopy] = useState(null)

  useEffect(() => {
    if (copy) {
      console.log(copy[0])
    }
  }, [copy])

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
          gridTemplateRows: `repeat(${grayscale.length}, 1fr)`,
          gridTemplateColumns: `repeat(${grayscale[0].length}, 1fr)`,
          fontSize: '0.6em'
        }}
      >
        {grayscale.map((height, x) =>
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
      <button onClick={() => setCopy(convolve(filter, grayscale))}>Blur</button>
      {copy && (
        <div
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(${copy.length}, 1fr)`,
            gridTemplateColumns: `repeat(${copy[0].length}, 1fr)`,
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
      )}
    </div>
  )
}

export default Image
