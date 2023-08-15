import { errorResponse } from "../helpers/responsError";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user-model";
import dotenv from "dotenv";
import { User } from "../core/User-type";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export async function login(req: Request, res: Response) {
  try {
    const { login, password } = req.body;
    const user = await userModel
      .findOne({
        $or: [{ user_name: login }, { email: login }, { phone: login }],
      })
      .exec();

    if (!user) {
      return errorResponse(
        { codeError: 404, message: `cridential are not valid!` },
        res
      );
    }
    const passwordMatch = bcrypt.compare(password, user.password!);
    if (!passwordMatch) {
      return errorResponse(
        { codeError: 404, message: `cridential are not valid!` },
        res
      );
    }

    const token = jwt.sign(
      {
        user: { id: user._id },
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (error) {
    errorResponse({ codeError: 500, message: "Somethismg went wrong." }, res);
  }
}

export async function signIn(req: Request, res: Response) {
  const body: User = req.body;

  try {
    if (!body.user_name || !body.f_name || !body.l_name || !body.password)
      return res.json({
        user_name: !body.user_name && true,
        f_name: !body.f_name && true,
        l_name: !body.l_name && true,
        password: !body.password && true,
      });

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const createdUser = await userModel.create({
      user_name: body.user_name,
      f_name: body.f_name,
      l_name: body.l_name,
      password: hashedPassword,
      email: body?.email,
      phone: body?.phone,
    });

    if (createdUser) {
      return res.json({ user: createdUser });
    }
    return res.json({ mesage: "user was not created" });
  } catch (error) {
    return errorResponse(
      { codeError: 500, message: "Somethismg went wrong." },
      res
    );
  }
}
