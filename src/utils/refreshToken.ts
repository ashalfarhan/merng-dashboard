import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { UserModel } from "../entity/User";
import { createToken } from "./helpers/createToken";

export const refreshTokenHandler: RequestHandler = async (req, res) => {
  const token = req.cookies.fwas;
  if (!token) {
    return res.status(403).json({
      ok: false,
      message: "Please include your refresh token",
      accessToken: "",
    });
  }
  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: error.message,
      accessToken: "",
    });
  }
  const user = await UserModel.findOne({ _id: payload.userId });
  if (!user) {
    return res.status(403).json({
      ok: false,
      message: "You should be a user to request refresh token",
      accessToken: "",
    });
  }
  const { accessToken } = createToken(user);
  return res.status(200).send({
    ok: true,
    message: "Success create access token",
    accessToken,
  });
};
