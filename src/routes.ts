import { Request, Response, Router } from 'express';
const route = Router();

route.get('/', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/views/index.html');
});
route.get('/chat', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/views/chat.html');
});

export default route;
