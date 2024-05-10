import { Response } from "express"
import { CustomError } from "../../domain"

export const handleError = (error: unknown, resp: Response) => {
  if (error instanceof CustomError) {
    return resp.status(error.statusCode)
      .json({ message: error.message })
  }

  return resp.status(500).json({ message: 'Internal server error' })
}