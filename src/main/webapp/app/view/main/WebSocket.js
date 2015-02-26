Ext.define('WebSocket.view.main.WebSocket', {
    extend: 'Ext.ux.data.WebSocket',
    alias: 'widget.alertSocket',
    controller: 'main',
    url: 'http://localhost:8080/websocket',
    userPrefix: '/user',
    brokerPrefix: '/topic',
    destinationPrefix: '/app',
    subscribes: [
        '/user/topic/alert'
    ],
    listeners: {
        connected: 'onConnected',
        subscribe: 'onSubscribe'
    }
});