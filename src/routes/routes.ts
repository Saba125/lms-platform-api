import express from "express"
const Router = express.Router()
import usersController from "../controllers/auth/export"
import moviesController from "../controllers/movies/export"
import authMiddleware from "../middlewares/auth"
import upload from "../config/multer"
// auth
Router.post("/auth/register", usersController.register)
Router.post("/auth/login", usersController.login)
// movies
Router.get("/movies", authMiddleware, moviesController.get_movies)
Router.post(
  "/movies",
  authMiddleware,
  upload.single("imageUrl"),
  moviesController.add_movie
)
Router.put(
  "/movies/:id",
  authMiddleware,
  upload.single("imageUrl"),
  moviesController.edit_movie
)
Router.delete("/movies/:id", authMiddleware, moviesController.delete_movie)
export default Router
