import axios from 'axios';
import config from '../../config';

const BASE_URL = config.commands_url;
const EMPTY_STRING = '';

const processCommandAsync = async (command, tenant, authorization) => {
    if (tenant !== EMPTY_STRING) {
        tenant = `${tenant}.`;
    }
    const command_res = await axios.post(
        `https://${tenant}${BASE_URL}`,
        command,
        {
            headers: {
                Authorization: authorization
            }
        }
    );
    return command_res.data;
};

export { processCommandAsync };
