import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthController {
  constructor(
    public authService: AuthService
  ) { }

  private handleError(error: unknown, resp: Response) {
    if (error instanceof CustomError) {
      return resp.status(error.statusCode)
        .json({ message: error.message })
    }

    return resp.status(500).json({ message: 'Internal server error' })
  }

  register = (req: Request, resp: Response) => {
    const [error, dto] = RegisterUserDto.create(req.body)

    if (error) return resp.status(400)
      .json({ message: error })

    this.authService.registerUser(dto!)
      .then((data) => resp.json({ data, message: 'User created' }))
      .catch((error) => this.handleError(error, resp))
  }

  login = (req: Request, resp: Response) => {

    const [error, dto] = LoginUserDto.create(req.body)

    if (error) return resp.status(400)
      .json({ message: error })

    this.authService.loginUser(dto!)
      .then((data) => resp.json({ data }))
      .catch((error) => this.handleError(error, resp))
  }

  validateEmail = (req: Request, resp: Response) => {
    const { token } = req.params

    this.authService.validateEmail(token)
      .then(() => resp.json({ message: 'Email validated' }))
      .catch((error) => this.handleError(error, resp))
  }
}