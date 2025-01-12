import Joi from "joi"
const usersSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email is required",
    "string.email": "Emails format is not correct",
    "any.required": "The email field must not be empty",
  }),
  password: Joi.string()
    .min(8)
    .max(15)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .required()
    .messages({
      "string.base": "auth.password.mustText",
      "string.min": "auth.password.min",
      "string.max": "auth.password.max",
      "string.pattern.base": "auth.password.pattern",
      "any.required": "auth.password.empty",
    }),
})
export default usersSchema
