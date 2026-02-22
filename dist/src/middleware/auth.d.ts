import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            adminId?: string;
        }
    }
}
declare const auth: (req: Request, res: Response, next: NextFunction) => void;
export default auth;
//# sourceMappingURL=auth.d.ts.map