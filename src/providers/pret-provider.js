import { showToast } from 'services/common-service';
import { getApplication } from 'services/application-service';
import PretSocketMethods from 'constants/pret-socket-methods';
import BlipToastTypes from 'constants/blip-portal-toast-types';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import config from 'config';

const SERVER = `${config.pret_url}/beholder`;
const PRET_PRIMARY_KEY = 'id';
const PRET_ADD_TRACE_ENDPOINT = '/trace';

const pret_web_socket = new HubConnectionBuilder()
    .withUrl(SERVER)
    .configureLogging(LogLevel.Information)
    .build();

pret_web_socket
    .start()
    .then(async () => {
        await pret_web_socket.send(
            PretSocketMethods.send_command,
            PRET_PRIMARY_KEY,
            PRET_ADD_TRACE_ENDPOINT,
            [(await getApplication()).shortName]
        );
    })
    .catch((error) => {
        console.error(error);
        showToast({
            type: BlipToastTypes.danger,
            message: `Erro ao carregar beholder: ${error}`
        });
    });

export default pret_web_socket;
