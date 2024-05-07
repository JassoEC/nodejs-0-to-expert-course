import { JWTAdapter, bcryptAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { EmailService } from "./email.service";

export class AuthService {
  constructor(
    private readonly emailService: EmailService
  ) { }

  public async registerUser(dto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: dto.email })

    if (existUser) {
      throw CustomError.badRequest('User already exists')
    }

    try {
      const user = new UserModel(dto)

      user.password = bcryptAdapter.hash(dto.password)

      await user.save()
      const { password, ...rest } = UserEntity.fromObject(user)

      await this.sendEmailValidationLink(user.email)

      const token = await JWTAdapter.generateToken({ id: user.id, email: user.email })
      if (!token) throw CustomError.internalServer('Error generating token')

      return { user: rest, token }

    } catch (error) {
      throw CustomError.internalServer(`Error creating user: ${error}`)
    }
  }

  public async loginUser(dto: LoginUserDto) {
    try {

      const user = await UserModel.findOne({ email: dto.email })

      if (!user) throw CustomError.badRequest('Invalid credentials')

      const isMatching = bcryptAdapter.compare(dto.password, user.password)

      if (!isMatching) throw CustomError.badRequest('Invalid credentials')

      const { password, ...rest } = UserEntity.fromObject(user)

      const token = await JWTAdapter.generateToken({ id: user.id, email: user.email })
      if (!token) throw CustomError.internalServer('Error generating token')

      return { user: rest, token }

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  private sendEmailValidationLink = async (email: string) => {
    const token = await JWTAdapter.generateToken({ email })
    if (!token) throw CustomError.internalServer('Error generating token')

    const link = `${envs.WEB_SERVICE_URL}/auth/validate-email/${token}`;

    const html = `
      <h1>Validate your email</h1>
      <p>Click on the link below to validate your email</p>
      <a href="${link}">Validate email</a>
      `

    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html
    }

    const isSent = await this.emailService.sendEmail(options)
    if (!isSent) throw CustomError.internalServer('Error sending email')
  }

  public async validateEmail(token: string) {
    const payload = await JWTAdapter.validateToken(token)
    if (!payload) throw CustomError.unauthorized('Invalid token')

    const { email } = payload as { email: string }

    const user = await UserModel.findOne({ email })
    if (!user) throw CustomError.notFound('User not found')

    user.emailValidated = true

    await user.save()

    return true
  }

}