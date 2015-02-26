/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('WebSocket.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.main',

    onBtnConnectClick: function() {
        var me = this
        me.webSocket = Ext.create('WebSocket.view.main.WebSocket').connect();
    },

    onBtnDisconnectClick: function() {
        var me = this;

        me.webSocket.disconnect();
    },

    onBtnPushClick: function() {
        var me = this;
        var refs = me.getReferences();
        var message = refs.frmSocket.getForm().getValues();

        me.webSocket.send('/app/read', Ext.encode(message));
    },

    onConnected: function() {
        console.log('WebSocket 접속!');
    },

    onSubscribe: function(socket, message) {

        console.log(message);

        Ext.toast({
            title: 'Push Notification',
            html: message.body,
            align: 't',
            iconCls: 'fa fa-info-circle fa-lg',
            slideInDuration: 500,
            minWidth: 150
        });
    }
});
