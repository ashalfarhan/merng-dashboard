import { User } from "../../entity/User";
import { sign } from "jsonwebtoken";

export const createToken = (user: User) => {
  const accessToken = sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "2m",
    }
  );

  const refreshToken = sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
  return {
    accessToken,
    refreshToken,
  };
};
