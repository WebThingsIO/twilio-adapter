/**
 * index.js - Loads the Twilio adapter
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const TwilioAdapter = require('./twilio-adapter');

module.exports = (addonManager) => {
  new TwilioAdapter(addonManager);

  try {
    const TwilioNotifier = require('./twilio-notifier');
    new TwilioNotifier(addonManager);
  } catch (e) {
    if (!(e instanceof TypeError)) {
      console.error(e);
    }
  }
};

