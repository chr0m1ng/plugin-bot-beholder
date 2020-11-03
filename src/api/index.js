import express from 'express';
import axios from 'axios';
import body_parser from 'body-parser';
import config from '../config';

const BASE_URL = config.commands_url;

const app = express();
app.use(body_parser.json());

app.post('/commands', async (req, res) => {
    const { tenant, authorization } = req.headers;
    const fixed_tenant = tenant === '' ? '' : `${tenant}.`;
    const command_res = await axios.post(
        `https://${fixed_tenant}${BASE_URL}`,
        req.body,
        {
            headers: {
                Authorization: authorization
            }
        }
    );

    return res.send(command_res.data);
});

app.listen(3030);

console.log('API listening to 3030');
