const twilio = require('twilio');

const {
  Adapter,
  Database,
  Device,
} = require('gateway-addon');

const config = {
  accountSid: null,
  authToken: null,
  fromPhoneNumber: null,
};

function getOptions() {
  return {
    from: config.fromPhoneNumber,
    to: '',
    body: '',
  };
}

function sendText(to, body) {
  const api = twilio(config.accountSid, config.authToken);
  return api.messages.create(Object.assign(getOptions(), {
    to: to,
    body: body,
  })).catch((err) => {
    console.warn(err);
  });
}

const twilioThing = {
  type: 'thing',
  '@context': 'https://iot.mozilla.org/schemas',
  '@type': [],
  name: 'Twilio',
  properties: [],
  actions: [
    {
      name: 'sendNotification',
      metadata: {
        label: 'Send Notification',
        description: 'Send notification text to a number',
        input: {
          type: 'object',
          required: [
            'to',
          ],
          properties: {
            to: {
              type: 'string',
            },
          },
        },
      },
    },
    {
      name: 'send',
      metadata: {
        label: 'Send Text',
        description: 'Send text specifying all details',
        input: {
          type: 'object',
          required: [
            'to',
          ],
          properties: {
            to: {
              type: 'string',
            },
            body: {
              type: 'string',
            },
          },
        },
      },
    },
  ],
  events: [],
};

/**
 * A text sending device
 */
class TwilioDevice extends Device {
  /**
   * @param {TwilioAdapter} adapter
   * @param {String} id - A globally unique identifier
   * @param {Object} template - the virtual thing to represent
   */
  constructor(adapter, id, template) {
    super(adapter, id);

    this.name = template.name;

    this.type = template.type;
    this['@context'] = template['@context'];
    this['@type'] = template['@type'];

    this.pinRequired = false;
    this.pinPattern = false;

    for (const action of template.actions) {
      this.addAction(action.name, action.metadata);
    }

    for (const event of template.events) {
      this.addEvent(event.name, event.metadata);
    }

    this.adapter.handleDeviceAdded(this);
  }

  async performAction(action) {
    action.start();

    if (action.name === 'send') {
      await sendText(action.input.to,
                      action.input.body || '');
    } else if (action.name === 'sendNotification') {
      await sendText(action.input.to, 'Notification from Things Gateway');
    }

    action.finish();
  }
}

/**
 * Twilio adapter
 * Instantiates one twilio device
 */
class TwilioAdapter extends Adapter {
  constructor(adapterManager, manifestName) {
    super(adapterManager, 'twilio', manifestName);

    adapterManager.addAdapter(this);
    this.addAllThings();
  }

  startPairing() {
    this.addAllThings();
  }

  async loadConfig() {
    const db = new Database(this.packageName);
    await db.open();
    const dbConfig = await db.loadConfig();
    Object.assign(config, dbConfig);
  }

  addAllThings() {
    this.loadConfig().catch(function(err) {
      console.warn('Error updating config', err);
    });

    if (!this.devices['twilio-0']) {
      new TwilioDevice(this, 'twilio-0', twilioThing);
    }
  }
}

module.exports = TwilioAdapter;

