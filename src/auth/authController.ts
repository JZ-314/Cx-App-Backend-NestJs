import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  UsePipes,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/userCreateDto';
import { RegistrationStatus } from './interfaces/registrationStatusInterface';
import { AuthService } from './authService';
import { LoginStatus } from './interfaces/loginStatusInterface';
import { LoginUserDto } from '../users/dto/userLoginDto';
import { JwtPayload } from './interfaces/payloadInterface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );
    // if (!result.success) {
    //   throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    // }

    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @Get('whoami')
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
