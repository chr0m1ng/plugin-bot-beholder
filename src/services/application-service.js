import { IframeMessageProxy } from 'iframe-message-proxy';
import IMPActions from 'constants/iframe-message-proxy-actions';

const getApplication = async () => {
    const { response: application } = await IframeMessageProxy.sendMessage({
        action: IMPActions.get_application
    });
    return application;
};

export { getApplication };
