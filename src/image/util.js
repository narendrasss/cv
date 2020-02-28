import Jimp from 'jimp'

export const resize = async ({ width, height }, image) => {
  const loadedIm = await Jimp.read(image)
  return loadedIm.resize(width, height)
}
