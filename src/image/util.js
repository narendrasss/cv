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

export const correlate = (filter, image) => {
  const imageWidth = image.length
  const imageHeight = image[0].length
  const filterRadius = math.floor(filter.length / 2)
  const result = Array(imageWidth)
    .fill(-1)
    .map(() => Array(imageHeight).fill(0))

  for (let x = filterRadius; x < imageWidth - filterRadius; x++) {
    for (let y = filterRadius; y < imageHeight - filterRadius; y++) {
      let newPixel = 0
      for (let i = -filterRadius; i <= filterRadius; i++) {
        for (let j = -filterRadius; j <= filterRadius; j++) {
          const pixel = image[x + i][y + j]
          const weight = filter[i + filterRadius][j + filterRadius]
          newPixel += pixel * weight
        }
      }
      result[x][y] = newPixel
    }
  }

  return result
}
