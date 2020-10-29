import { POST } from 'http-methods-constants';
import { v4 } from 'uuid';
import config from 'config';

const BASE_URL = config.commands_url;

const createAuthorizationKey = (identifier, access_key) => {
    const encoded_part = btoa(`${identifier}:${atob(access_key)}`);
    return `Key ${encoded_part}`;
};

const processCommandAsync = async (command, tenant, identifier, access_key) => {
    command.id = command.id || v4();
    const fixed_tenant = tenant === '' ? '' : `${tenant}.`;
    const res = await fetch(`https://${fixed_tenant}${BASE_URL}`, {
        method: POST,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: createAuthorizationKey(identifier, access_key)
        },
        body: JSON.stringify(command)
    });
    const { resource } = await res.json();

    return resource;
};

export { processCommandAsync };
