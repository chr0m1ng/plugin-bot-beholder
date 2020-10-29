import { IframeMessageProxy } from 'iframe-message-proxy';
import IMPContainer from 'constants/iframe-message-proxy-container';
import { getApplicationAsync } from 'services/application-service';
import { processCommandAsync } from 'services/commands-service';
import config from 'config';

const BASE_URL = '/buckets/blip_portal';
const BASE_TRACE_TARGET = `${config.pret_url}/trace`;
const TRACE_MODE = 'All';
const TRACE_TARGET_TYPE = 'Http';
const ROUTER_TEMPLATE = 'master';
const GET_TENNANT_COMMAND = 'getCurrentTenant';

const createGetVariablesCommand = (version) => ({
    method: IMPContainer.CommandMethods.GET,
    uri: `${BASE_URL}:builder_${version}_configuration`
});

const createSetVariablesCommand = (version, variables) => ({
    method: IMPContainer.CommandMethods.SET,
    type: 'application/json',
    uri: `${BASE_URL}:builder_${version}_configuration`,
    resource: variables
});

const getVariablesWithCommandsAsync = async (
    version,
    tenant,
    identifier,
    access_key
) => {
    const res = await processCommandAsync(
        createGetVariablesCommand(version),
        tenant,
        identifier,
        access_key
    );
    return res;
};

const setVariablesWithCommandsAsync = async (
    version,
    variables,
    tenant,
    identifier,
    access_key
) => {
    const res = await processCommandAsync(
        createSetVariablesCommand(version, variables),
        tenant,
        identifier,
        access_key
    );
    return res;
};

const getVariablesWithIMPAsync = async (version) => {
    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPContainer.Actions.send_command,
            content: {
                destination: IMPContainer.Destinations.messaging_hub_service,
                command: createGetVariablesCommand(version)
            }
        });
        return response;
    } catch {
        return {};
    }
};

const setVariablesWithIMPAsync = async (version, variables) => {
    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPContainer.Actions.send_command,
            content: {
                destination: IMPContainer.Destinations.messaging_hub_service,
                command: createSetVariablesCommand(version, variables)
            }
        });
        return response;
    } catch {
        return null;
    }
};

const getCurrentTenantAsync = async () => {
    const {
        response: { id }
    } = await IframeMessageProxy.sendMessage({
        action: IMPContainer.Actions.get_user_context,
        content: {
            command: GET_TENNANT_COMMAND
        }
    });

    return id;
};

const getSubbotsAsync = async (application) => {
    const subbots_identities = application.applicationJson.settings.children.map(
        (b) => b.identity
    );
    const subbots_applications = await Promise.all(
        subbots_identities.map((si) => getApplicationAsync(si))
    );
    return subbots_applications;
};

const setTracingVariablesAsync = async (
    identifier,
    getVariablesAsync,
    setVariablesAsync,
    tenant = null,
    access_key = null,
    subbot_identifier = null
) => {
    await Promise.all(
        ['working', 'published'].map(async (v) => {
            const bot_variables = await getVariablesAsync(
                v,
                tenant,
                subbot_identifier,
                access_key
            );
            bot_variables.TraceTargetType = TRACE_TARGET_TYPE;
            bot_variables.TraceMode = TRACE_MODE;
            bot_variables.TraceTarget = `${BASE_TRACE_TARGET}/${identifier}`;
            return setVariablesAsync(
                v,
                bot_variables,
                tenant,
                subbot_identifier,
                access_key
            );
        })
    );
};

const configureRouterTracingAsync = async (application) => {
    const subbots = await getSubbotsAsync(application);
    const tenant = await getCurrentTenantAsync();
    await Promise.all(
        subbots.map((s) =>
            setTracingVariablesAsync(
                application.shortName,
                getVariablesWithCommandsAsync,
                setVariablesWithCommandsAsync,
                tenant,
                s.accessKey,
                s.shortName
            )
        )
    );
};

const isRouter = (application) => {
    return application.template === ROUTER_TEMPLATE;
};

const configureTracingAsync = async (application) => {
    if (isRouter(application)) {
        await configureRouterTracingAsync(application);
    } else {
        await setTracingVariablesAsync(
            application.shortName,
            getVariablesWithIMPAsync,
            setVariablesWithIMPAsync
        );
    }
};

export { configureTracingAsync };
