import { JWTAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthService {
  constructor() { }

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

      return { user: rest, token: 'token' }

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
}