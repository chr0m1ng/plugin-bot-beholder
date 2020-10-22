import { IframeMessageProxy } from 'iframe-message-proxy';
import IMPConstants from 'constants/iframe-message-proxy-container';

const startLoading = () =>
    IframeMessageProxy.sendMessage({
        action: IMPConstants.Actions.start_loading
    });

const stopLoading = () =>
    IframeMessageProxy.sendMessage({
        action: IMPConstants.Actions.stop_loading
    });

const setHeight = (height) =>
    IframeMessageProxy.sendMessage({
        action: IMPConstants.Actions.height_change,
        content: height
    });

const showToast = (toast) =>
    IframeMessageProxy.sendMessage({
        action: IMPConstants.Actions.toast,
        content: toast
    });

const showModal = (title, body, confirm = 'ok') =>
    IframeMessageProxy.sendMessage({
        action: IMPConstants.Actions.show_modal,
        content: {
            title,
            body,
            confirm
        }
    });

const withLoading = async (func) => {
    startLoading();
    try {
        return await func();
    } finally {
        stopLoading();
    }
};

export {
    startLoading,
    stopLoading,
    setHeight,
    showToast,
    withLoading,
    showModal
};
