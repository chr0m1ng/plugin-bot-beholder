import { POST } from 'http-methods-constants';
import { v4 } from 'uuid';

const createAuthorizationKey = (identifier, access_key) => {
    const encoded_part = btoa(`${identifier}:${atob(access_key)}`);
    return `Key ${encoded_part}`;
};

const processCommandAsync = async (command, tenant, identifier, access_key) => {
    command.id = command.id || v4();
    const fixed_tenant = tenant === '' ? '' : `${tenant}.`;
    console.log(command);
    const res = await fetch('/commands', {
        method: POST,
        headers: {
            'Content-Type': 'application/json',
            Authorization: createAuthorizationKey(identifier, access_key),
            tenant: fixed_tenant
        },
        body: JSON.stringify(command)
    });
    const { resource } = await res.json();

    return resource;
};

export { processCommandAsync };
