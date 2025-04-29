import { Router, Request, Response, response } from 'express';
const router = Router();


function isValidUername(username: string): boolean {
    return /^[a-zA-Z]{3,10}$/.test(username);
}

function isValidPassword(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/.test(password);
}



router.get('/', (req: Request, res: Response): void => {
    res.json({
        msg: "hlo there"
    })
});

router.post('/signup', (req: Request, res: Response): void => {
    const { username, password } = req.body;
    if (!isValidPassword(username) || (!isValidUername)) {
        res.status(411).json({
            msg: "Error in inputs"
        })
    }

})



export default router;
