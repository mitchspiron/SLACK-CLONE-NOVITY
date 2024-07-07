import jwt from "jsonwebtoken";

export const decodeToken = (token: any) => {
  return jwt.verify(token, "Sekire_maFybE");
};
