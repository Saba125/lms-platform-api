import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db/index"
export default async function delete_movie(req: Request, res: Response) {
  const { id } = req.params
  const numberId = parseInt(id)
  const movie = await prisma.movie.delete({ where: { id: numberId } })
  if (!movie) {
    Utils.sendError(res, {
      status: "error",
      message: `Movie with id ${id} does not exist`,
    })
    return
  }
  return Utils.sendSuccess(res, {
    msg: `Movie with id ${id} has been deleted`,
  })
}
