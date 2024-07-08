import jwt from "jsonwebtoken";

export const decodeToken = (token: any) => {
  const secret = "Sekire_maFybE";
  return jwt.verify(token, secret);
};
