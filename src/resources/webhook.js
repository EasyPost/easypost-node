import T from 'proptypes';

import base from './base';

const crypto = require('crypto');

export const propTypes = {
  id: T.string,
  object: T.string,
  mode: T.string,
  url: T.string,
  disabled_at: T.oneOfType([T.object, T.string]),
  webhook_secret: T.string,
};

export default (api) =>
  class Webhook extends base(api) {
    static _name = 'Webhook';

    static _url = 'webhooks';

    static key = 'webhook';

    static propTypes = propTypes;

    static validateWebhook(eventBody, headers, webhookSecret) {
      let webhook = {};
      const easypostHmacSignature = headers['X-Hmac-Signature'] ?? null;

      if (easypostHmacSignature != null) {
        const normalizedSecret = webhookSecret.normalize('NFKD');
        const encodedSecret = Buffer.from(normalizedSecret, 'utf8');

        const expectedSignature = crypto
          .createHmac('sha256', encodedSecret)
          .update(eventBody, 'utf-8')
          .digest('hex');

        const digest = `hmac-sha256-hex=${expectedSignature}`;

        if (
          crypto.timingSafeEqual(
            Buffer.from(easypostHmacSignature, 'utf8'),
            Buffer.from(digest, 'utf8'),
          )
        ) {
          webhook = JSON.parse(eventBody.toString());
        } else {
          throw new Error(
            'Webhook received did not originate from EasyPost or had a webhook secret mismatch.',
          );
        }
      } else {
        throw new Error('Webhook received does not contain an HMAC signature.');
      }

      return webhook;
    }
  };
