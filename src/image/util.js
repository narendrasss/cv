import * as math from 'mathjs'

export const toIntGrayscale = image => {
  const grayscaled = image.grayscale()
  const data = [...grayscaled.bitmap.data]
  const result = []
  for (let i = 1; i < data.length; i += 4) {
    result.push(data[i])
  }
  return math.reshape(result, [grayscaled.getWidth(), grayscaled.getHeight()])
}
