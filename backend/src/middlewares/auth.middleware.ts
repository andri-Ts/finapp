import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/auth.types';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  //Lire le header
  const authHeader = req.headers.authorization;

  // Vérifier qu'il existe (si le front oublie d'envoyer )
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });
  // console.log('authHeader: ', authHeader);

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Format de token invalide' });
  }

  // Extraire uniquement le JWT
  const token = authHeader.split(' ')[1]; // on reçoit : Bearer eyJhbGc..., mais verify() veut seuelemnt eyJhbGc
  // console.log('token: ', token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    // console.log('payload: ', payload);

    // valeur de request à envoyer vers le controller
    req.user = payload as JwtPayload; // { userId: string; email: string;};

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
}
