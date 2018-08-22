import Promise from 'promise-polyfill';
import UAParser from 'ua-parser-js';
export default function AppGlobal(name){
    name = name || 'AppGlobal';
    var Global = window[name] = {};
    
    //Promise polyfill
    if (!window.Promise) {
        window.Promise = Promise;
    }
    //UA Parser
    var parser = new UAParser();
    var isMobile = parser.getDevice().type != undefined;
    Global.isMobile = isMobile;
    if(isMobile){
        $('html').addClass('mobile');
    }
    //wiewport and Layout change
    var _layoutListeners = Global._layoutListeners = [];
    var _sizeListeners = Global._sizeListeners = [];
    var _scrollListeners = Global._scrollListeners = [];
    var _preSize = viewport();

    function viewport() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return {width: e[a + 'Width'], height: e[a + 'Height']};
    };
    Global.viewport = viewport;
    Global.mql = window.matchMedia("(min-width: 767px)");
    Global.mql.addListener(function(mql){
        for (var i = 0; i < _layoutListeners.length; i++) {
            _layoutListeners[i](!XT.mql.matches);
        }
    })

    Global.addChangeLayoutListener = function (listener) {
        if (listener && typeof(listener) == 'function') {
            _layoutListeners.push(listener);
            return function () {
                this.removeChangeLayoutListener(listener);
            }
        }
        return null;
    }
    Global.removeChangeLayoutListener = function (listener) {
        if (listener) {
            var index = _layoutListeners.indexOf(listener);
            if (index != -1) {
                _layoutListeners.splice(index, 1);
            }
        }
    }
    Global.addResizeListener = function (listener) {
        if (listener && typeof(listener) == 'function') {
            _sizeListeners.push(listener);
            return function () {
                this.removeResizeListener(listener);
            }
        }
        return null;
    }
    Global.removeResizeListener = function (listener) {
        if (listener) {
            var index = _sizeListeners.indexOf(listener);
            if (index != -1) {
                _sizeListeners.splice(index, 1);
            }
        }
    }
    Global.addScrollListener = function (listener) {
        if (listener && typeof(listener) == 'function') {
            _scrollListeners.push(listener);
            return function () {
                this.removeScrollListener(listener);
            }
        }
        return null;
    }
    Global.removeScrollListener = function (listener) {
        if (listener) {
            var index = _scrollListeners.indexOf(listener);
            if (index != -1) {
                _scrollListeners.splice(index, 1);
            }
        }
    }
    window.addEventListener('resize', function (e) {
        var vp = viewport();
        var w = vp.width;
        var preWidth = _preSize.width;
        for (var i = 0; i < _sizeListeners.length; i++) {
            _sizeListeners[i](_preSize, vp);
        }
        _preSize = vp;
    });

    window.addEventListener('scroll', function (e) {
        for (var i = 0; i < _scrollListeners.length; i++) {
            _scrollListeners[i](e);
        }
    })
}