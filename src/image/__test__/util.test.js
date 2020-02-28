import { resize } from '../util'

describe('Image processing', () => {
  it('Should resize an image', async () => {
    const pic = await resize({ width: 128, height: 128 }, 'assets/sample.png')
    expect(pic.getWidth()).toEqual(128)
  })
})
