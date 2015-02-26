/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('WebSocket.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'WebSocket.view.main.MainController',
        'WebSocket.view.main.MainModel'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'panel',
        bind: {
            title: '{name}'
        },
        region: 'west',
        html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
        width: 250,
        split: true,
        tbar: [{
            text: 'Button',
            handler: 'onClickButton'
        }]
    },{
        region: 'center',
        xtype: 'panel',
        layout: 'anchor',
        items: [{
            xtype: 'component',
            html: '<h3>Websocket Push Notification</h3>'
        },{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            defaults: {
                margin: '0 10 0 0'
            },
            items: [{
                xtype: 'button',
                text: 'Connect',
                handler: 'onBtnConnectClick'
            },{
                xtype: 'button',
                text: 'Disconnect',
                handler: 'onBtnDisconnectClick'
            }]
        },{
            xtype: 'form',
            reference: 'frmSocket',
            layout: 'hbox',
            defaults: {
                margin: '0 10 0 0'
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Websocket Session ID',
                name: 'sessionId',
                labelWidth: 150
            },{
                xtype: 'textfield',
                fieldLabel: 'Message',
                name: 'message'
            },{
                xtype: 'button',
                text: 'Push',
                handler: 'onBtnPushClick'
            }]
        }]
    }]
});
