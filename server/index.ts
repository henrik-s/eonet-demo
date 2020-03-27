import * as express from 'express';
import {
    customResponseDecorator,
    enableCors,
    logger,
    latency,
} from './middlewares';

const app = express();
const port = 3000;
const USE_LATENCY = true;

app.use(customResponseDecorator, enableCors);
if (USE_LATENCY) {
    app.use(latency);
}
app.use(logger);

app.get('/', (req, res) => res.send('Hellow rold'));

app.get('/json', (req, res) => {
    res.json([5, 4, 3, 2, 1, 0]);
});

app.listen(port, () => console.log(`Started local api server on port ${port}`));
