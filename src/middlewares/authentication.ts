import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const authentication = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const authorization = req.headers.authorization;
      if (!authorization) {
         res.status(401).json({ message: "Unauthorized" });
         return;
      }

      const token = authorization.split(" ")[1];

      if (!token) {
         res.status(401).json({ message: "Unauthorized" });
         return;
      }

      const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET || "jifioqahdiwaio!jdoi2123k1"
      );

      if (!decoded) {
         res.status(401).json({ message: "Unauthorized" });
         return;
      }

      res.locals.user = decoded;

      next();
   } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Unauthorized" });
   }
};
