# MMM-websocket

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

The module connects to a websocket-server and publish global notifications from the MagicMirror to the websocket server and publish incoming messages from the websocket server to the MagicMirror. So you can listen and send  events via websocket connections. An example server can be started via `node server.js` in the modules directory.

## Using the module

1. Navigate into your MagicMirror's modules folder and execute  `git clone https://github.com/JanLoebel/MMM-websocket.git`
2. Execute `cd MMM-websocket` && `npm install` to install the node dependencies.
3. To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
var config = {
    modules: [
        {
            module: 'MMM-websocket',
            config: {
                // See below for configurable options
            }
        }
    ]
}
```

## Configuration options

| Option                 | Description
|----------------------- |-----------
| `host`                 | *Required* Host to connect to.<br><br>**Type:** `string` <br>Default localhost 
| `port`                 | *Required* Port to connect to.<br><br>**Type:** `int` <br>Default 8081 
| `reconnectInterval`    | *Optional* If the connection is lost, how many milliseconds should be waited before a reconnect should be executed.<br><br>**Type:** `int` (milliseconds) <br>Default 3000 milliseconds (3 seconds)
| `outgoingFilter`       | *Optional* Function to filter outgoing messages. Function must return `true` if the notification is allowed to pass, `false` will not publish the notification to the websocket-server. <br><br>**Type:** `function` <br>Default always return true
| `incomingFilter`       | *Optional* Function to filter incoming messages. Function must return `true` if the notification is allowed to pass, `false` will not publish the notification to the MagicMirror. <br><br>**Type:** `function` <br>Default always return true
| `outgoingTransformer`  | *Optional* Function to transform outgoing messages. Function must return an object with two properties `notification` and `payload`.<br><br>**Type:** `function` <br>Default do not transform anything
| `incomingTransformer`  | *Optional* Function to transform incoming messages. Function must return an object with two properties `notification` and `payload`.<br><br>**Type:** `function` <br>Default do not transform anything
| `debug`                | *Optional* Should debug messages be printed.<br><br>**Type:** `boolean` <br>Default false

### The MIT License (MIT)

Copyright © 2017 Jan Loebel

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**