import { v2 as cloudinary } from 'cloudinary'
import { ThreadImage } from '../dto/thread-dto'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploader = async (files: Express.Multer.File[]) => {
  console.log(files)

  const urls: ThreadImage[] = []
  await Promise.all(
    files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString('base64')
      const dataURI = 'data:' + file.mimetype + ';base64,' + b64
      const uploadedFile = await cloudinary.uploader.upload(dataURI, {
        folder: 'circle'
      })
      urls.push({
        url: uploadedFile.secure_url
      })
    })
  )

  return urls
}

export default uploader
