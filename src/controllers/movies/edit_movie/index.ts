import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import movieSchema from "../add_movie/schema"
export default async function edit_movie(req: Request, res: Response) {
  const { id } = req.params
  const idNumber = parseInt(id)
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
  const movie = await prisma.movie.update({
    where: { id: idNumber },
    data: {
      imageUrl,
      ...req.body,
    },
  })
  if (!movie) {
    Utils.sendError(res, {
      status: "error",
      message: "Movie not found",
    })
    return
  }
  return Utils.sendSuccess(res, {
    movie,
  })
}
