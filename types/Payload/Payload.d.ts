import {IDatedObject, IObjectWithId} from '../base';

/**
 * Webhook Events are triggered by changes in objects you've created via the API.
 * Every time an Event related to one of your objects is created, EasyPost guarantees at least one POST request will be sent to each of the webhook URLs set up for your account.
 * A Payload represents the data sent and received in the POST request.
 *
 * @see [webhooks guide] https://www.easypost.com/webhooks-guide
 * @see https://www.easypost.com/docs/api/node#events
 */
export declare interface IPayload extends IObjectWithId<'Payload'>, IDatedObject {
    /**
     * The URL the webhook payload was sent to
     */
    request_url: string;

    /**
     * The headers sent with the payload in the webhook request
     */
    request_headers: object;

    /**
     * The body of the webhook request
     */
    request_body: object;

    /**
     * The headers received in the webhook response
     */
    response_headers: object;

    /**
     * The body of the webhook response
     */
    response_body: string;

    /**
     * The HTTP status code of the webhook response
     */
    response_status: number;

    /**
     * The total time in milliseconds it took to send the webhook request and receive the response
     */
    total_time: number;
}

export declare class Payload implements IPayload {
    id: string;
    object: 'Payload';
    mode: 'test' | 'production';
    request_url: string;
    request_headers: object;
    request_body: object;
    response_headers: object;
    response_body: string;
    response_status: number;
    total_time: number;
    created_at: string;
    updated_at: string;
}
