import { Request, Response } from 'express';
declare class FlexMLCtrl {
    get: (req: Request, res: Response) => Promise<void>;
    post: (req: Request, res: Response) => Promise<void>;
    joke: (req: Request, res: Response) => Promise<void>;
    private phoneNumberToNiceText;
    private numberToWords;
    private lookupPhoneNumber;
}
export default FlexMLCtrl;
