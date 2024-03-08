import 'dotenv/config'
import express from 'express';
import { connectDB } from './adapters/db.js';
import router from './routes/routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running on port:  ${process.env.PORT}`);
    });
})

