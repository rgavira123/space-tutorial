import { Request, Response, NextFunction } from 'express';
import { SpaceClient } from 'space-node-client';

// Middleware factory: pass SpaceClient to generate PricingToken header in every response
const pricingTokenMiddleware = (spaceClient: SpaceClient, userId: string) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    const setHeaders = async () => {
      try {
        const token = await spaceClient.features.generateUserPricingToken(userId);
        // Align header name with frontend expectation
        res.setHeader('PricingToken', token);
      } catch (error) {
        console.error('Error generating pricing token:', error);
      }
    };

    const wrap = (method: 'send' | 'json' | 'end') => {
      const original = (res as any)[method];
      (res as any)[method] = async function (...args: any[]) {
        await setHeaders();
        return original.apply(this, args);
      };
    };

    wrap('send');
    wrap('json');
    wrap('end');

    next();
  };
};

export default pricingTokenMiddleware;