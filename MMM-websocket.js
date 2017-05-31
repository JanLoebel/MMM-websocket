/* global Module */

/* Magic Mirror
 * Module: MMM-websocket
 *
 * By Jan Löbel
 * MIT Licensed.
 */
Module.register("MMM-websocket", {
	defaults: {
		host: "localhost",
		port: 8081,
		reconnectInterval: 3000,
		outgoingFilter: function(notification, payload){ return true; },
		incomingFilter: function(notification, payload){ return true; },
		outgoingTransformer : function (notification, payload) { return { notification: notification, payload: payload }; },
		incomingTransformer : function (notification, payload) { return { notification: notification, payload: payload }; },
		debug: false,
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	// Overrides start function.
	start: function () {
		var self = this;
		self.debug("Starting module: " + self.name);
		self.sendSocketNotification("WS_CONNECT", { "config": self.config });
	},

	// Override notification received
	notificationReceived: function(notification, payload, sender) {
		var self = this;

		// Check if outgoing notification is wanted
		if (self.executeFilter(self.config.outgoingFilter, notification, payload)) {
			self.debug("Wanted outgoing global notification: ", notification, payload);
			var transformed = self.executeTransform(self.config.outgoingTransformer, notification, payload);
			self.debug("Wanted outgoing global notification after transformation: ", transformed.notification, transformed.payload);
			self.sendSocketNotification(transformed.notification, transformed.payload);
		} else {
			self.debug("Unwanted outgoing global notification: ", notification, payload);
		}
	},

	// Override socket notification received
	socketNotificationReceived: function(notification, payload) {
		var self = this;

		// Check if notification is wanted
		if (self.executeFilter(self.config.incomingFilter, notification, payload)) {
			self.debug("Wanted incoming socket notification: ", notification, payload);
			var transformed = self.executeTransform(self.config.incomingTransformer, notification, payload);
			self.debug("Wanted incoming socket notification after transformation: ", transformed.notification, transformed.payload);
			self.sendNotification(transformed.notification, transformed.payload);
		} else {
			self.debug("Unwanted incoming socket notification: ", notification, payload);
		}
	},

	executeFilter: function(filter, notification, payload) {
		if (!filter) {
			return true;
		} else if (typeof filter === "function" || filter instanceof Function) {
			return filter(notification, payload);
		} else if (typeof filter === "string" || filter instanceof String) {
			return notification.startsWith(filter);
		}

		self.error("Given filter is unusable! Filter can only be a function or string!", filter);
		return false;
	},

	executeTransform: function(transformer, notification, payload) {
		if(!transformer) {
			return {notification: notification, payload: payload};
		} else if (typeof transformer === "function" || transformer instanceof Function) {
			return transformer(notification, payload);
		}

		self.error("Given transformer is unusable! Transfromer can only be a function!", filter);
		return {notification: notification, payload: payload};
	},

	debug: function() {
		var self = this;
		if(self.config.debug) {
			Log.log.apply(self, arguments);
		}
	},

	error: function() {
		var self = this;
		Log.error.apply(self, arguments);
	},

	// Override dom generator.
	getDom: function () {
		return undefined;
	}
});