import { Request, Response } from "express"
import prisma from "../../../db/index"
import Utils from "../../../utils"

type Filters = {
  title?: string
  year?: string
  genre?: string
}

export default async function get_movies(req: Request, res: Response) {
  try {
    const { title, year, genre } = req.query
    const filters: Filters = {}
    if (title) {
      filters.title = String(title)
    }
    if (year) {
      filters.year = String(year)
    }
    if (genre) {
      filters.genre = String(genre)
    }

    // Query the database using Prisma
    const movies = await prisma.movie.findMany({
      where: {
        ...(filters.title && {
          title: {
            contains: filters.title,
            mode: "insensitive",
          },
        }),
        ...(filters.year && {
          year: filters.year,
        }),
        ...(filters.genre && {
          genre: {
            contains: filters.genre,
            mode: "insensitive",
          },
        }),
      },
    })
    return Utils.sendSuccess(res, {
      movies,
    })
  } catch (error) {
    console.error("Error fetching movies:", error)
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching movies.",
    })
  }
}
