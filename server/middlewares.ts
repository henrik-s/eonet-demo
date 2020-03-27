import * as express from 'express';

interface CustomResponse extends express.Response {
    custom: {
        latency?: number
    }
}

export const customResponseDecorator = express.Router();
customResponseDecorator.use((req, res: CustomResponse, next) => {
    if (res.custom == null) {
        res.custom = {};
    }
    next();
});

export const enableCors = express.Router();
enableCors.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

function msleep(milliseconds: number) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}

export const latency = express.Router();
latency.use((req, res: CustomResponse, next) => {
    const interval = [5, 800];

    const delay = interval[0] + Math.round(Math.random() * interval[1]);
    res.custom.latency = delay;
    msleep(delay);
    next();
});


export const logger = express.Router();
logger.use((req, res: CustomResponse, next) => {
    let log = `${req.method} ${req.path}`;

    if (res.custom.latency) {
        log += `, latency: ${res.custom.latency} ms`;
    }

    console.log(log);
    next();
});
