import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import usersSchema from "./schema"
import { StatusCodes } from "http-status-codes"
const register = async (req: Request, res: Response) => {
  const { error } = usersSchema.validate(req.body)
  if (error) {
    Utils.sendError(res, {
      status: "error",
      message: "Validation failed",
      details: error.details.map((err) => err.message),
    })
    return
  }
  const { email, password } = req.body
  const oneDay = 1000 * 60 * 60 * 24
  const hashedPassword = Utils.getCryptoHash(password)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })
  const token = Utils.createToken(user)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  })
  return Utils.sendSuccess(res, {
    user,
    token,
  })
}
export default register
