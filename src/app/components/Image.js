import React from 'react'
import Jimp from 'jimp'
import styled from 'styled-components'

import { prop } from '../../util'
import { toIntGrayscale } from '../../image/util'

function Image({ image, pixelSize, width }) {
  const resized = image.clone().resize(width, Jimp.AUTO)
  const grayscale = toIntGrayscale(resized)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${grayscale.length}, 1fr)`,
        gridTemplateRows: `repeat(${grayscale[0].length}, 1fr)`,
        fontSize: '0.6em'
      }}
    >
      {grayscale.map(height =>
        height.map(pixel => <Pixel size={pixelSize} value={pixel} />)
      )}
    </div>
  )
}

export default Image

const Pixel = styled.code`
  width: ${prop('size')}px;
  height: ${prop('size')}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(${prop('value')}, ${prop('value')}, ${prop('value')});
  color: ${({ value }) => (value > 128 ? 'inherit' : 'white')};

  &:after {
    content: "${prop('value')}";
    opacity: 0;
    transform: translateY(8px);
    transition: all 0.1s ease-out;
  }

  &:hover {
    &:after {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
