import React from 'react'
import Jimp from 'jimp'
import { toIntGrayscale } from '../../image/util'

function Image({ image, width }) {
  const resized = image.clone().resize(width, Jimp.AUTO)
  const grayscale = toIntGrayscale(resized)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${grayscale.length}, 1fr)`,
        gridTemplateRows: `repeat(${grayscale[0].length}, 1fr)`,
        fontSize: '0.8em'
      }}
    >
      {grayscale.map(height =>
        height.map(pixel => {
          const opposite = pixel > 128 ? 'inherit' : 'white'
          return (
            <div
              style={{
                width: 16,
                height: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `rgb(${pixel}, ${pixel}, ${pixel})`,
                color: opposite
              }}
            ></div>
          )
        })
      )}
    </div>
  )
}

export default Image
