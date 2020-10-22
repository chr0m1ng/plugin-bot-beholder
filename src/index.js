import React from 'react';
import ReactDOM from 'react-dom';
import { IframeMessageProxy } from 'iframe-message-proxy';
import './index.scss';
import { ResizeObserver } from 'resize-observer';
import { setHeight } from 'services/common-service';
import App from 'pages/App';
import * as service_worker from 'service-worker';

IframeMessageProxy.listen();

const ROOT_ID = 'root';

const ROOT_DIV = document.getElementById(ROOT_ID);

const DOCUMENT_OBSERVER = new ResizeObserver(() => {
    setHeight(ROOT_DIV.scrollHeight);
});

DOCUMENT_OBSERVER.observe(ROOT_DIV);

ReactDOM.render(<App />, document.getElementById(ROOT_ID));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
service_worker.unregister();
