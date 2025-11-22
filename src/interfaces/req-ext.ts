import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface RequestExt extends Request {
  user?: JwtPayload | { id: string } 
}

export { RequestExt };
