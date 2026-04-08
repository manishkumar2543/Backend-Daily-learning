import express from 'express';
import authRouter from './routes/auth.routes.js';
import handleError from './middlewares/error.middleware.js';

const app=express();


app.use(express.json())
app.use('/api/auth',authRouter)




// handleError sbse niche (app.use - kiya jata hai)
app.use(handleError)

export default app