const WebSocket = require("ws");

const port = 8081;
const wss = new WebSocket.Server({ port: port });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
};

// On incomming messages, broadcast them to all other clients
wss.on("connection", function connection(ws) {
	ws.on("message", function incoming(data) {
		console.log("-> Got message: " + data);

		// Broadcast to everyone else.
		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(data);
			}
		});
	});
});

console.log("Websocket-Server started with port: " + port + "...")

// Listen for keypress to send example data
console.log("Write Text and press <enter> to send an example alert to all clients.\n\n");

var stdin = process.stdin;
stdin.setEncoding("utf8");
stdin.on("data", function (msg) {
	console.log("<- Send test-alert with message: " + msg);
	var obj = {
		type: "SHOW_ALERT",
		payload: {
			type : "alert",
			title : "Sended by the WebSocket",
			message : msg,
			timer : 4000
		}
	};
	wss.broadcast(JSON.stringify(obj));
});