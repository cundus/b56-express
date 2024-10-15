import { RegisterDto } from "../dto/auth-dto";
import { prisma } from "../libs/prisma";

export const findUserByEmailOrUsername = async (usernameOrEmail: string) => {
   return prisma.user.findFirst({
      where: {
         OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
   });
};

export const createUser = async (registerDto: RegisterDto) => {
   return prisma.user.create({
      data: {
         email: registerDto.email,
         password: registerDto.password,
         username: registerDto.username!,
         profile: {
            create: {
               fullname: registerDto.fullname,
            },
         },
      },
   });
};

export const findUserAndProfile = async (username: string) => {
   return prisma.user.findFirst({
      where: {
         username,
      },
      select: {
         id: true,
         email: true,
         username: true,
         profile: true,
      },
   });
};
