import express from 'express';
import body_parser from 'body-parser';
import config from '../config';
import controllers from './controllers';
import logger_provider from './providers/logger-provider';
import res_body_middleware from './middlewares/res-body-middleware';
import error_middleware from './middlewares/error-middleware';
import 'express-async-errors';

const logger = logger_provider.getLogger();

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use(body_parser.json());
app.use(res_body_middleware);

app.use(controllers);

app.use(error_middleware);

app.listen(config.api.port);

logger.info(`API listening on ${config.api.port}`);
