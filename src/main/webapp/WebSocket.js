Ext.define('Ext.ux.data.WebSocket', {
    alias: 'websocket.websocket',

    mixins: [
        'Ext.mixin.Inheritable',
        'Ext.mixin.Bindable',
        'Ext.mixin.Observable'
    ],

    config: {
        /**
         * @cfg {SockJS} SockJS websocket client
         */
        socket: null,

        /**
         * @cfg {Stomp} Stomp text-orientated messaging protocol
         */
        protocol: null,
        /**
         * @cfg {String} Websocket endpoint URL
         */
        url: null,

        /**
         * @cfg {String} simple-broker prefix
         */
        brokerPrefix: null,

        /**
         * @cfg {String} application-destination-prefix
         */
        destinationPrefix: null,

        /**
         * @cfg {String} User destination prefix
         */
        userPrefix: '/user',

        /**
         * @cfg {Boolean} Message boradcast
         */
        broadCast: true,

        /**
         * @cfg {Boolean} Receive messages in the browser
         */
        subscribes: null
    },

    constructor: function (config) {
        var me = this;

        me.isInitializing = true;
        me.mixins.observable.constructor.call(me, config);
        me.isInitializing = false;
    },

    connect: function() {
        var me = this;

        if (Ext.isEmpty(me.getSocket())) {
            me.setSocket(new SockJS(me.getUrl()));
            me.setProtocol(Stomp.over(me.getSocket()));

            me.getProtocol().connect({}, function(frame) {
                if (me.getSubscribes() != null) {
                    var i, subscribes = me.getSubscribes();
                    for (i=0; i<subscribes.length; i++) {
                        me.getProtocol().subscribe(subscribes[i], function(message) {
                            me.fireEvent('subscribe', me, message);
                        });
                    }
                }
            });
        }

        me.fireEvent('connected', me);

        return me;
    },

    disconnect: function() {
        var me = this;

        me.getProtocol().disconnect();

        me.fireEvent('disconnected', me);
    },

    send: function(url, message) {
        var me = this;

        me.getProtocol().send(url, {}, message);
    }
});