twilio-adapter
==============
A simple adapter exposing actions to send texts through the Mozilla IoT
Gateway. Requires a Twilio API account.

Setup
-----
On Twilio's homepage click sign up
![Twilio's homepage, highlighting the sign up button](doc/twilio_0.png)
Fill out your account details.
![Twilio's new account form](doc/twilio_1.png)
Verify a phone number with Twilio. This should be the number you're planning to
send text messages to using the adapter.
![Twilio's verify phone number form](doc/twilio_2.png)
Click on the Flex project to create a simple base to get an account SID and
auth token. Because we're just using this project for API access, it's name and
specific details don't matter too much.
![Twilio's create project page](doc/twilio_3.png)
![Name prompt in the create project flow](doc/twilio_4.png)
With the Flex project created we now want to get to the Twilio Console to get
our API access information. I found the easiest way to get to this is to
navigate to [https://twilio.com/console](https://twilio.com/console). Take note
of the account SID and auth token for configuring the adapter later.

![Twilio's console view, highlighting the account SID and auth token
fields](doc/twilio_5.png)

We also need to know what phone number Twilio plans to use for us. If we scroll
down on this console page, we can navigate to the Phone Numbers section. Like
the account SID and auth token, copy down this phone number for later.

![Twilio's console view scrolled down to see phone number section](doc/twilio_console_phone.png)

![Twilio's phone number section, highlighting the phone number field](doc/twilio_phone.png)

Next, we install the Twilio adapter from the addon list. On your gateway, go to
the Settings section and click on Addons. Next, click the plus (+) button and
scroll down to install the Twilio adapter.
With the adapter installed, we can click "Configure" to configure the adapter
with our account SID, auth token, and assigned phone number from the Twilio
console.
![Gateway's addon list, highlighting the plus button](doc/addon_list_plus.png)
![Gateway's addon list, highlighting the Twilio adapter's configure button](doc/twilio_addon_list.png)
![Configuration screen for the Twilio adapter](doc/twilio_config.png)

With the adapter installed we can now navigate to the main Things page and
click the plus button to add the Twilio thing.

![Image of the Twilio Thing's detail page](doc/twilio_detail.png)

Finally, we navigate to the Rules section of the Gateway to use
Twilio notifications in a rule. We drag and drop the Twilio Notification block
to the Effect (right) side of the rule and click "Configure" to setup a basic
message.

![The rule screen with a Twilio notification block](doc/rule_overview.png)
![The rule screen with a Twilio notification block being configured](doc/rule_config.png)
