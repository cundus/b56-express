import { LoginDto, RegisterDto } from "../dto/auth-dto";
import { prisma } from "../libs/prisma";
import * as userRepositories from "../repositories/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (loginInfo: LoginDto) => {
   // 1. kita cari user dengan email yang sesuai
   const user = await userRepositories.findUserByEmailOrUsername(
      loginInfo.username
   );
   if (!user) {
      throw new Error("User not found");
   }

   // 2. kita cek passwordnya
   const isValidPassword = await bcrypt.compare(
      loginInfo.password,
      user.password
   );

   if (!isValidPassword) {
      throw new Error("User not found");
   }

   // 3. generate token
   const token = jwt.sign(
      {
         id: user.id,
         email: user.email,
         username: user.username,
      },
      process.env.JWT_SECRET || "jifioqahdiwaio!jdoi2123k1",
      {
         expiresIn: "1d",
      }
   );

   // 4. return token
   return token;
};

export const register = async (registerInfo: RegisterDto) => {
   const existedUser = await userRepositories.findUserByEmailOrUsername(
      registerInfo.email
   );

   if (existedUser) {
      throw new Error("User already exists");
   }

   const hashedPassword = await bcrypt.hash(registerInfo.password, 10);
   const generatedUsername = registerInfo.email.split("@")[0];

   const createdUser = await userRepositories.createUser({
      ...registerInfo,
      username: generatedUsername,
      password: hashedPassword,
   });

   return createdUser;
};
