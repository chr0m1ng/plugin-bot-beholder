import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import config from 'config';

const SERVER = `${config.pret_url}/beholder`;

const hubConnection = new HubConnectionBuilder()
    .withUrl(SERVER)
    .configureLogging(LogLevel.Information)
    .build();

export default hubConnection;
