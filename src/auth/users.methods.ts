// import { AuthService } from './auth.service';
// import { AuthCredentialsDto } from './dto/auth-credentials.dto';
// import { User } from './user.entity';
// import { Repository } from 'typeorm';

// export class UserMethods extends AuthService {
//   public async createUser(
//     authCredentialsDto: AuthCredentialsDto,
//   ): Promise<void> {
//     const { username, password } = authCredentialsDto;

//     const user = this.usersRepository.create({
//       username,
//       password,
//     });

//     await this.usersRepository.save(user);
//     return;
//   }
// }

//export class Methods {
//   print(input) {
//     console.log('Hello' + input);
//   }
// }
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './user.entity';
// import { Repository } from 'typeorm';
// import { AuthCredentialsDto } from './dto/auth-credentials.dto';

// @Injectable()
// export class AuthMethods {
//   constructor(
//     @InjectRepository(User)
//     public usersRepository: Repository<User>,
//   ) {}

//   public async createUser(
//     authCredentialsDto: AuthCredentialsDto,
//   ): Promise<void> {
//     const { username, password } = authCredentialsDto;

//     const user = this.usersRepository.create({
//       username,
//       password,
//     });

//     await this.usersRepository.save(user);
//     return;
//   }
// }
