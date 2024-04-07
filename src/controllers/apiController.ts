import { Request, Response, NextFunction } from 'express';

async function getMessage(req: Request, res: Response, next: NextFunction) {
  res.json({ message: "Hello from server!" });
}

export default {
  getMessage
}