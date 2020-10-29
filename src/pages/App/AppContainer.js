import React, { useEffect, useState } from 'react';
import { getApplicationAsync } from 'services/application-service';
import { showToast, withLoading } from 'services/common-service';
import { configureTracingAsync } from 'services/configuration-service';
import BlipPortalToastTypes from 'constants/blip-portal-toast-types';
import PretSocketMethods from 'constants/pret-socket-methods';
import pret_web_socket from 'providers/pret-provider';
import BlipTrace from 'models/blip-trace';
import { BlipTabs } from 'blip-toolkit';
import AppComponent from './AppComponent';

const TITLE = 'Bot Beholder';

const AppContainer = () => {
    const [application, setApplication] = useState({});
    const [traces, setTraces] = useState([]);
    const [filter, setFilter] = useState('');
    const [is_configure_enabled, setIsConfigureEnabled] = useState(true);

    useEffect(() => {
        withLoading(async () => {
            setApplication(await getApplicationAsync());
            // eslint-disable-next-line no-new
            new BlipTabs('tab-nav');
        });
    }, [application.shortName]);

    useEffect(() => {
        const appendTrace = (trace) => {
            if (Array.isArray(trace)) {
                setTraces(trace.map((t) => new BlipTrace(t)));
            } else {
                setTraces([new BlipTrace(trace), ...traces]);
            }
        };

        withLoading(async () => {
            pret_web_socket.on(
                PretSocketMethods.answer_command,
                (id, route, value) => appendTrace(value)
            );
            pret_web_socket.on(PretSocketMethods.trace, (trace) =>
                appendTrace(trace)
            );
        });

        return () => {
            pret_web_socket.off(PretSocketMethods.answer_command);
            pret_web_socket.off(PretSocketMethods.trace);
        };
    }, [application.shortName, traces]);

    useEffect(() => {
        showToast({
            type: BlipPortalToastTypes.success,
            message: 'Carregado com sucesso'
        });
    }, []);

    const changeFilter = (e) => {
        setFilter(e.target.value);
    };

    const configureBotTracingAsync = async () => {
        try {
            showToast({
                type: BlipPortalToastTypes.info,
                message: 'Configurando...'
            });
            setIsConfigureEnabled(false);

            await configureTracingAsync(application);

            showToast({
                type: BlipPortalToastTypes.success,
                message: 'Configurado com sucesso!'
            });
        } catch (error) {
            showToast({
                type: BlipPortalToastTypes.danger,
                message: `Falha ao tentar configurar: ${error}`
            });
            console.error(error);
            setIsConfigureEnabled(true);
        }
    };

    return (
        <AppComponent
            title={TITLE}
            configureBotTracing={configureBotTracingAsync}
            filter={filter}
            changeFilter={changeFilter}
            traces={traces}
            is_configure_enabled={is_configure_enabled}
        />
    );
};

export default AppContainer;
