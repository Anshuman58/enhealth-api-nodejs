
import { Application as FeathersApplication } from '@feathersjs/feathers';
import { Application } from '../declarations';
import ProductionErrorMessages from '../configs/error_message_production.json';

/**
 * Returns error messages according to environment of application.
 *
 * @param app - Application object
 * @param errorCode - Type of the error.
 * @param message - Message of the error.
 *
 * @returns A string representing the error message.
 */
const setErrorMessage = (app: FeathersApplication | Application, errorCode: string, message: string): string => {
    const env = app.get('env');

    const errorMessageConfig: any = ProductionErrorMessages;

    if (env === 'production') {
        return errorMessageConfig[errorCode];
    } else {
        return message;
    }
};

export default setErrorMessage;
