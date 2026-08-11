import { Request, Response } from 'express';
import { getAuthentificatedUser } from '../utils/auth';
import { getDashboardService } from '../services/dashboard.service';

export async function getDashboard(req: Request, res: Response) {
  try {
    const userId = getAuthentificatedUser(req);
    const dashboard = await getDashboardService(userId);

    return res.status(200).json(dashboard);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
