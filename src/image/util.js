import * as math from 'mathjs'

export const toIntGrayscale = image => {
  const grayscaled = image.grayscale()
  const data = [...grayscaled.bitmap.data]
  const result = []
  for (let i = 1; i < data.length; i += 4) {
    result.push(data[i])
  }
  return math.reshape(result, [grayscaled.getHeight(), grayscaled.getWidth()])
}

export const makeEmptyImage = (width, height, fill = 255) =>
  Array(height)
    .fill(-1)
    .map(() => Array(width).fill(fill))

export const convolve = (filter, image, onStep = () => {}) => {
  const imageHeight = image.length
  const imageWidth = image[0].length
  const filterRadius = math.floor(filter.length / 2)
  const result = makeEmptyImage(imageWidth, imageHeight)

  let count = 0
  for (let x = filterRadius; x < imageWidth - filterRadius; x++) {
    for (let y = filterRadius; y < imageHeight - filterRadius; y++) {
      let newPixel = 0
      for (let i = -filterRadius; i <= filterRadius; i++) {
        for (let j = -filterRadius; j <= filterRadius; j++) {
          const pixel = image[y - i][x - j]
          const weight = filter[i + filterRadius][j + filterRadius]
          newPixel += pixel * weight
        }
      }
      result[y][x] = newPixel
      onStep(
        result.map(i => [...i]),
        count++
      )
    }
  }

  return result
}
