import express, { Request, Response } from 'express'
import taskRoutes from './routes/User';
const app = express()
const port = process.env.Port || 3000;

app.use(express.json())


app.use('/api/v1', taskRoutes);
app.get('/', (req: Request, res: Response) => {
    res.send('hello there')
})

app.listen(port, () => {
    console.log(`server running ${port}`)
})