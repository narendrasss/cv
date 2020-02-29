import Jimp from 'jimp'
import { toIntGrayscale } from '../util'

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
})
