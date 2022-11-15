import cors from 'cors';
import express from 'express';
import { routes } from './routes/router';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3000, () => {
  console.log('server running on port ' + 3000)
});