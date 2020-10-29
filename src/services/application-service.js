import { IframeMessageProxy } from 'iframe-message-proxy';
import IMPActions from 'constants/iframe-message-proxy-actions';

const getApplicationAsync = async (full_identity = null) => {
    const { response: application } = await IframeMessageProxy.sendMessage({
        action: IMPActions.get_application,
        content: full_identity
    });
    return application;
};

export { getApplicationAsync };
