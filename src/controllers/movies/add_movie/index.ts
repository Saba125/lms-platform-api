import { Request, Response } from "express"
import Utils from "../../../utils/index"
import movieSchema from "./schema"
import prisma from "../../../db/index"
export default async function add_movie(req: Request, res: Response) {
  const { error } = movieSchema.validate(req.body)
  const imageUrl = req.file ? `/movie-images/${req.file.filename}` : null
  if (error) {
    Utils.sendError(res, {
      status: "error",
      message: "Validation failed",
      details: error.details.map((err) => err.message),
    })
    return
  }
  const movie = await prisma.movie.create({
    data: {
      imageUrl,
      ...req.body,
    },
  })
  return Utils.sendSuccess(res, {
    movie,
  })
}
