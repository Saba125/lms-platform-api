import Joi from "joi"
const movieSchema = Joi.object({
  id: Joi.number().integer().positive().optional(), // id is auto-incremented, optional here
  title: Joi.string().min(1).max(255).required(), // title is required and must be a non-empty string
  year: Joi.string()
    .pattern(/^\d{4}$/)
    .required(), // year should be a 4-digit string (e.g., "2022")
  genre: Joi.string().min(1).max(100).required(), // genre is required and a non-empty string
  director: Joi.string().min(1).max(100).required(), // director is required
  actors: Joi.array().items(Joi.string()).min(1).required(), // actors should be an array of strings
  plot: Joi.string().min(10).max(1000).required(), // plot should be a string between 10 and 1000 characters
  rating: Joi.string().valid("G", "PG", "PG-13", "R", "NC-17").required(), // rating should be one of these valid values
  imageUrl: Joi.string().uri().required(), // imageUrl should be a valid URL
  createdAt: Joi.date().optional(), // createdAt is auto-generated, optional here
  updatedAt: Joi.date().optional(), // updatedAt is auto-generated, optional here
})
export default movieSchema
