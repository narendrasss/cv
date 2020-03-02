import React from 'react'
import Types from 'prop-types'

function Image({ image, pixelSize }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${image.length}, 1fr)`,
        gridTemplateColumns: `repeat(${image[0].length}, 1fr)`,
        fontSize: '0.6em'
      }}
    >
      {image.map((height, x) =>
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
  )
}

Image.propTypes = {
  image: Types.arrayOf(Types.arrayOf(Types.number)).isRequired,
  pixelSize: Types.number
}

Image.defaultProps = {
  pixelSize: 16
}

export default Image
