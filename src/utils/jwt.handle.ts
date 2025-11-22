import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "token.0101010101"
const generateToken = async (id:string) => {

    const jwt = sign({ id }, JWT_SECRET, { expiresIn: "2h"
});
return jwt;

}

const verifyToken = (jwt:string) => {
  const idOk = verify(jwt, JWT_SECRET);
  return idOk
}

export { generateToken, verifyToken }