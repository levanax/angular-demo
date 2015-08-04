var cometdURL = "http://127.0.0.1:8888/cometd";
var tokenText = "";
var priceClient = null;

function PriceClient(state) {
    var _self = this;
    var _connected = false;
    var _disconnecting;
    var _subscriptionIN;
    this._scope = null;
    this._token = null;
    this._currentSubscription = null;

    this.connect = function() {
        _disconnecting = false;

        $.cometd.configure({
            url: cometdURL,
            logLevel: 'warn'
        });
        $.cometd.websocketEnabled = false;
        $.cometd.handshake({
            secret_token: this._token
        });
    };

    this.leave = function() {
        this.unsubscribe();
        $.cometd.disconnect();
        _disconnecting = true;
        _connected = false;
    };

    function _unsubscribeMJ() {
        if (this._currentSubscription) {
            $.cometd.unsubscribe(this._currentSubscription);
        }
    }

    function _unsubscribeIN() {
        if (_subscriptionIN) {
            $.cometd.unsubscribe(_subscriptionIN);
        }
        _subscriptionIN = null;
    }
    this.subscribe = function(stockCode, callBack) {
        _subscribeMj(stockCode, callBack);
    };
    this.unsubscribe = function() {
        //_unsubscribeIN();
        _unsubscribeMJ();
    };
    this.isConnected = function() {
        return _connected;
    };

    function _connectionEstablished(message) {
        // connection establish (maybe not for first time)
        _updateConnectionStatus(message);
    }

    function _updateConnectionStatus(message) {
        var psc = message.price_server_connected;
        //var ps=message.price_server;
        if (psc === true) {
            _self.updateConnectState("success");
        } else {
            _self.updateConnectState("fail");
        }
    }

    function _connectionBroken(message) {
        // alert('connection broken');
        _subscriptionIN = null;
        _self.updateConnectState("fail");
    }

    function _connectionClosed() {
        //alert('connection closed');
        _self.updateConnectState("fail");
    }

    function _metaConnect(message) {
        if (_disconnecting) {
            _connected = false;
            _connectionClosed();
        } else {
            var wasConnected = _connected;
            _connected = message.successful === true;
            if (!wasConnected && _connected) {
                _connectionEstablished(message);
            } else if (wasConnected && !_connected) {
                _connectionBroken(message);
            } else {
                _updateConnectionStatus(message);
            }
        }
    }

    function _subscribeMj(stockCode, callBack) {
        if (this._currentSubscription != null) {
            _unsubscribeMJ();
        }
        this._currentSubscription = $.cometd.subscribe('/price/security/' + Math.floor(stockCode), callBack);
    }


    function _metaHandshake(message) {
        _self.updateConnectState("connect");
        if (message.successful) {
            _self.updateConnectState("success");
        } else if (message.error_code) {
            _self.updateConnectState(message.error_code);
        }
    }

    this.startIndexChannel = function() {
        if (!_subscriptionIN) {
            _subscriptionIN = $.cometd.subscribe('/price/index', _self.receive);
            //console.log("start index channel .");
        }
    }

    this.stopIndexChannel = function() {
        if (_subscriptionIN) {
            $.cometd.unsubscribe(_subscriptionIN);
            _subscriptionIN = null;
            //console.log("stop index channel .");
        }
    };

    try {
        $.cometd.addListener('/meta/handshake', _metaHandshake);
        $.cometd.addListener('/meta/connect', _metaConnect);
        $.cometd.addListener('/meta/subscribe', _metaSubscribe);
    } catch (e) {
        console.warn("Browser does not support : cometd ");
    }

    function _metaSubscribe(message) {
        if (!message.successful) {
            if (message.error) {
                var errorcode = message.error.split(":")[0];
                switch (errorcode) {
                    case '404':
                        stockIsNull();
                        break;
                    default:
                        console.warn('errorcode: ' + errorcode + ' is not exist.');
                        break;
                }
            }
        }
    }

    this.releaseData020 = function(data, scope) {}
    this.releaseData021 = function(data, scope) {}
    this.releaseData022 = function(data, scope) {
        scope.$apply(function() {
            scope.nom = data.NOM;
            scope.change = data.CHG;
            scope.changeRate = data.CP;
        })
    }
    this.releaseData023 = function(data, scope) {
        scope.$apply(function() {
            scope.name = data.TCN.trim() + "(" + data.EN.trim() + ")";
            scope.close = data.PP;
            scope.wl52 = data.WL52;
            scope.wh52 = data.WH52;
            scope.close = data.PP;
            scope.lotSize = data.LOT
        })
    }
    this.releaseData024 = function(data, scope) {
        scope.$apply(function() {
            scope.open = data.OP;
            scope.turnover = data.TO;

            scope.hp = data.HP;
            scope.lp = data.LP;
            scope.volume = data.V;
        })
    }
    this.updateConnectState = function(args) {
        var state = args.toUpperCase();
        switch (state) {
            case "CONNECT":
            case "SUCCESS":
            case "FAIL":
            case "STE01":
            case "STE02":
            case "STE03":
            case "SCE01":
                break;
            default:
                console.warn('"'+state+'" is not exist.');
                break;
        }

        _self._scope.$apply(function() {
            _self._scope.clientState = _self._scope.getText("QUOTE.STATUS."+state);
        })
    }
}