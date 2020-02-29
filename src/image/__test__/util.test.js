import Jimp from 'jimp'
import { correlate, toIntGrayscale } from '../util'

describe('Image processing', () => {
  const setup = () =>
    Jimp.read('public/assets/sample.jpg').then(im => im.resize(Jimp.AUTO, 8))

  describe('toIntGrayscale', () => {
    it('Should convert image to 1D grayscale array', async () => {
      const im = await setup()
      const width = im.getWidth()
      const height = im.getHeight()
      const arr = toIntGrayscale(im)

      expect(arr.length).toEqual(width)
      expect(arr[0].length).toEqual(height)
      arr.forEach(a => {
        a.forEach(n => {
          expect(n).toBeLessThanOrEqual(255)
          expect(n).toBeGreaterThanOrEqual(0)
        })
      })
    })
  })

  describe('correlate', () => {
    it('should correlate a simple filter and an image', () => {
      const image = [
        [1, 0, 2, 3, 4],
        [0, 1, 3, 1, 0],
        [4, 5, 1, 0, 2],
        [1, 2, 0, 3, 4],
        [0, 1, 3, 4, 1]
      ]
      const filter = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 1, 0]
      ]
      const result = correlate(filter, image)
      expect(result).toEqual([
        [0, 0, 0, 0, 0],
        [0, 5, 1, 0, 0],
        [0, 2, 0, 3, 0],
        [0, 1, 3, 4, 0],
        [0, 0, 0, 0, 0]
      ])
    })
  })
})
