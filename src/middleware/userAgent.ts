import { Request, Response, NextFunction } from 'express';

// @author      ASHUTOSH PANDA (@ashutosh4336)
// @desc        Custom Midleware to Stop Spamming
const userAgentCheck = (req: Request, res: Response, next: NextFunction) => {
  const userAgent: string | undefined = req.headers['user-agent'];
  const acceptUser = userAgent && userAgent.startsWith('Mozilla/');

  if (process.env.NODE_ENV === 'production' && !acceptUser) {
    return res.status(400).json({
      code: 400,
      message: 'WOOO-HOOOO... Stop Right There and Use a Browser',
    });
  }

  return next();
};

export { userAgentCheck };
