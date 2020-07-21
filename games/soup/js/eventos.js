/*!
 * iScroll v4.2.5 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function (window, doc) {
    var m             = Math, dummyStyle = doc.createElement('div').style, vendor = (function () {
        var vendors = 't,webkitT,MozT,msT,OT'.split(','), t, i = 0, l = vendors.length;
        for (; i < l; i++) {
            t = vendors[i] + 'ransform';
            if (t in dummyStyle) {return vendors[i].substr(0, vendors[i].length - 1);}
        }
        return false;
    })(), cssVendor   = vendor ? '-' + vendor.toLowerCase() + '-' : '', transform = prefixStyle('transform'), transitionProperty = prefixStyle('transitionProperty'), transitionDuration = prefixStyle('transitionDuration'), transformOrigin = prefixStyle('transformOrigin'), transitionTimingFunction = prefixStyle('transitionTimingFunction'), transitionDelay = prefixStyle('transitionDelay'), isAndroid = (/android/gi).test(navigator.appVersion), isIDevice = (/iphone|ipad/gi).test(navigator.appVersion), isTouchPad = (/hp-tablet/gi).test(navigator.appVersion), has3d = prefixStyle('perspective') in dummyStyle, hasTouch = 'ontouchstart' in window && !isTouchPad, hasTransform = vendor !== false, hasTransitionEnd = prefixStyle('transition') in dummyStyle, RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize', START_EV = hasTouch ? 'touchstart' : 'mousedown', MOVE_EV = hasTouch ? 'touchmove' : 'mousemove', END_EV = hasTouch ? 'touchend' : 'mouseup', CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup', TRNEND_EV = (function () {
        if (vendor === false)return false;
        var transitionEnd = {'': 'transitionend', 'webkit': 'webkitTransitionEnd', 'Moz': 'transitionend', 'O': 'otransitionend', 'ms': 'MSTransitionEnd'};
        return transitionEnd[vendor];
    })(), nextFrame   = (function () {return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {return setTimeout(callback, 1);};})(), cancelFrame = (function () {return window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;})(), translateZ = has3d ? ' translateZ(0)' : '', iScroll = function (el, options) {
        var that                    = this, i;
        that.wrapper                = typeof el == 'object' ? el : doc.getElementById(el);
        that.wrapper.style.overflow = 'hidden';
        that.scroller               = that.wrapper.children[0];
        that.options                = {hScroll: true, vScroll: true, x: 0, y: 0, bounce: true, bounceLock: false, momentum: true, lockDirection: true, useTransform: true, useTransition: false, topOffset: 0, checkDOMChanges: false, handleClick: true, hScrollbar: true, vScrollbar: true, fixedScrollbar: isAndroid, hideScrollbar: isIDevice, fadeScrollbar: isIDevice && has3d, scrollbarClass: '', zoom: false, zoomMin: 1, zoomMax: 4, doubleTapZoom: 2, wheelAction: 'scroll', snap: false, snapThreshold: 1, onRefresh: null, onBeforeScrollStart: function (e) {e.preventDefault();}, onScrollStart: null, onBeforeScrollMove: null, onScrollMove: null, onBeforeScrollEnd: null, onScrollEnd: null, onTouchEnd: null, onDestroy: null, onZoomStart: null, onZoom: null, onZoomEnd: null};
        for (i in options) {
            that.options[i] = options[i];
        }
        that.x                     = that.options.x;
        that.y                     = that.options.y;
        that.options.useTransform  = hasTransform && that.options.useTransform;
        that.options.hScrollbar    = that.options.hScroll && that.options.hScrollbar;
        that.options.vScrollbar    = that.options.vScroll && that.options.vScrollbar;
        that.options.zoom          = that.options.useTransform && that.options.zoom;
        that.options.useTransition = hasTransitionEnd && that.options.useTransition;
        if (that.options.zoom && isAndroid) {translateZ = '';}
        that.scroller.style[transitionProperty] = that.options.useTransform ? cssVendor + 'transform' : 'top left';
        that.scroller.style[transitionDuration] = '0';
        that.scroller.style[transformOrigin]    = '0 0';
        if (that.options.useTransition) that.scroller.style[transitionTimingFunction] = 'cubic-bezier(0.33,0.66,0.66,1)';
        if (that.options.useTransform) that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px)' + translateZ; else that.scroller.style.cssText += ';position:absolute;top:' + that.y + 'px;left:' + that.x + 'px';
        if (that.options.useTransition) that.options.fixedScrollbar = true;
        that.refresh();
        that._bind(RESIZE_EV, window);
        that._bind(START_EV);
        if (!hasTouch) {
            if (that.options.wheelAction != 'none') {
                that._bind('DOMMouseScroll');
                that._bind('mousewheel');
            }
        }
        if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function () {that._checkDOMChanges();}, 500);
    };
    iScroll.prototype = {
        enabled:             true, x: 0, y: 0, steps: [], scale: 1, currPageX: 0, currPageY: 0, pagesX: [], pagesY: [], aniTime: null, wheelZoomCount: 0, handleEvent: function (e) {
            var that = this;
            switch (e.type) {
                case START_EV:
                    if (!hasTouch && e.button !== 0)return;
                    that._start(e);
                    break;
                case MOVE_EV:
                    that._move(e);
                    break;
                case END_EV:
                case CANCEL_EV:
                    that._end(e);
                    break;
                case RESIZE_EV:
                    that._resize();
                    break;
                case'DOMMouseScroll':
                case'mousewheel':
                    that._wheel(e);
                    break;
                case TRNEND_EV:
                    that._transitionEnd(e);
                    break;
            }
        }, _checkDOMChanges: function () {
            if (this.moved || this.zoomed || this.animating || (this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale))return;
            this.refresh();
        }, _scrollbar:       function (dir) {
            var that = this, bar;
            if (!that[dir + 'Scrollbar']) {
                if (that[dir + 'ScrollbarWrapper']) {
                    if (hasTransform) that[dir + 'ScrollbarIndicator'].style[transform] = '';
                    that[dir + 'ScrollbarWrapper'].parentNode.removeChild(that[dir + 'ScrollbarWrapper']);
                    that[dir + 'ScrollbarWrapper']   = null;
                    that[dir + 'ScrollbarIndicator'] = null;
                }
                return;
            }
            if (!that[dir + 'ScrollbarWrapper']) {
                bar = doc.createElement('div');
                if (that.options.scrollbarClass) bar.className = that.options.scrollbarClass + dir.toUpperCase(); else bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:' + (that.vScrollbar ? '7' : '2') + 'px' : 'width:7px;bottom:' + (that.hScrollbar ? '7' : '2') + 'px;top:2px;right:1px');
                bar.style.cssText += ';pointer-events:none;' + cssVendor + 'transition-property:opacity;' + cssVendor + 'transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden;opacity:' + (that.options.hideScrollbar ? '0' : '1');
                that.wrapper.appendChild(bar);
                that[dir + 'ScrollbarWrapper'] = bar;
                bar                            = doc.createElement('div');
                if (!that.options.scrollbarClass) {bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.15);' + cssVendor + 'background-clip:padding-box;' + cssVendor + 'box-sizing:border-box;' + (dir == 'h' ? 'height:100%' : 'width:100%') + ';' + cssVendor + 'border-radius:3px;border-radius:3px';}
                bar.style.cssText += ';pointer-events:none;' + cssVendor + 'transition-property:' + cssVendor + 'transform;' + cssVendor + 'transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);' + cssVendor + 'transition-duration:0;' + cssVendor + 'transform: translate(0,0)' + translateZ;
                if (that.options.useTransition) bar.style.cssText += ';' + cssVendor + 'transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';
                that[dir + 'ScrollbarWrapper'].appendChild(bar);
                that[dir + 'ScrollbarIndicator'] = bar;
            }
            if (dir == 'h') {
                that.hScrollbarSize                  = that.hScrollbarWrapper.clientWidth;
                that.hScrollbarIndicatorSize         = m.max(m.round(that.hScrollbarSize * that.hScrollbarSize / that.scrollerW), 8);
                that.hScrollbarIndicator.style.width = that.hScrollbarIndicatorSize + 'px';
                that.hScrollbarMaxScroll             = that.hScrollbarSize - that.hScrollbarIndicatorSize;
                that.hScrollbarProp                  = that.hScrollbarMaxScroll / that.maxScrollX;
            } else {
                that.vScrollbarSize                   = that.vScrollbarWrapper.clientHeight;
                that.vScrollbarIndicatorSize          = m.max(m.round(that.vScrollbarSize * that.vScrollbarSize / that.scrollerH), 8);
                that.vScrollbarIndicator.style.height = that.vScrollbarIndicatorSize + 'px';
                that.vScrollbarMaxScroll              = that.vScrollbarSize - that.vScrollbarIndicatorSize;
                that.vScrollbarProp                   = that.vScrollbarMaxScroll / that.maxScrollY;
            }
            that._scrollbarPos(dir, true);
        }, _resize:          function () {
            var that = this;
            setTimeout(function () {that.refresh();}, isAndroid ? 200 : 0);
        }, _pos:             function (x, y) {
            if (this.zoomed)return;
            x = this.hScroll ? x : 0;
            y = this.vScroll ? y : 0;
            if (this.options.useTransform) {this.scroller.style[transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + this.scale + ')' + translateZ;} else {
                x                        = m.round(x);
                y                        = m.round(y);
                this.scroller.style.left = x + 'px';
                this.scroller.style.top  = y + 'px';
            }
            this.x = x;
            this.y = y;
            this._scrollbarPos('h');
            this._scrollbarPos('v');
        }, _scrollbarPos:    function (dir, hidden) {
            var that = this, pos = dir == 'h' ? that.x : that.y, size;
            if (!that[dir + 'Scrollbar'])return;
            pos = that[dir + 'ScrollbarProp'] * pos;
            if (pos < 0) {
                if (!that.options.fixedScrollbar) {
                    size = that[dir + 'ScrollbarIndicatorSize'] + m.round(pos * 3);
                    if (size < 8) size = 8;
                    that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
                }
                pos = 0;
            } else if (pos > that[dir + 'ScrollbarMaxScroll']) {
                if (!that.options.fixedScrollbar) {
                    size = that[dir + 'ScrollbarIndicatorSize'] - m.round((pos - that[dir + 'ScrollbarMaxScroll']) * 3);
                    if (size < 8) size = 8;
                    that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
                    pos                                                                     = that[dir + 'ScrollbarMaxScroll'] + (that[dir + 'ScrollbarIndicatorSize'] - size);
                } else {pos = that[dir + 'ScrollbarMaxScroll'];}
            }
            that[dir + 'ScrollbarWrapper'].style[transitionDelay] = '0';
            that[dir + 'ScrollbarWrapper'].style.opacity          = hidden && that.options.hideScrollbar ? '0' : '1';
            that[dir + 'ScrollbarIndicator'].style[transform]     = 'translate(' + (dir == 'h' ? pos + 'px,0)' : '0,' + pos + 'px)') + translateZ;
        }, _start:           function (e) {
            var that = this, point = hasTouch ? e.touches[0] : e, matrix, x, y, c1, c2;
            if (controlZoom == 1) {
                this.scale  = escala;
                controlZoom = 0;
            }
            if (!that.enabled)return;
            if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);
            if (that.options.useTransition || that.options.zoom) that._transitionTime(0);
            that.moved     = false;
            that.animating = false;
            that.zoomed    = false;
            that.distX     = 0;
            that.distY     = 0;
            that.absDistX  = 0;
            that.absDistY  = 0;
            that.dirX      = 0;
            that.dirY      = 0;
            if (that.options.zoom && hasTouch && e.touches.length > 1) {
                c1                    = m.abs(e.touches[0].pageX - e.touches[1].pageX);
                c2                    = m.abs(e.touches[0].pageY - e.touches[1].pageY);
                that.touchesDistStart = m.sqrt(c1 * c1 + c2 * c2);
                that.originX          = m.abs(e.touches[0].pageX + e.touches[1].pageX - that.wrapperOffsetLeft * 2) / 2 - that.x;
                that.originY          = m.abs(e.touches[0].pageY + e.touches[1].pageY - that.wrapperOffsetTop * 2) / 2 - that.y;
                if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
            }
            if (that.options.momentum) {
                if (that.options.useTransform) {
                    matrix = getComputedStyle(that.scroller, null)[transform].replace(/[^0-9\-.,]/g, '').split(',');
                    x      = +(matrix[12] || matrix[4]);
                    y      = +(matrix[13] || matrix[5]);
                } else {
                    x = +getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '');
                    y = +getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '');
                }
                if (x != that.x || y != that.y) {
                    if (that.options.useTransition) that._unbind(TRNEND_EV); else cancelFrame(that.aniTime);
                    that.steps = [];
                    that._pos(x, y);
                    if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);
                }
            }
            that.absStartX = that.x;
            that.absStartY = that.y;
            that.startX    = that.x;
            that.startY    = that.y;
            that.pointX    = point.pageX;
            that.pointY    = point.pageY;
            that.startTime = e.timeStamp || Date.now();
            if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);
            that._bind(MOVE_EV, window);
            that._bind(END_EV, window);
            that._bind(CANCEL_EV, window);
        }, _move:            function (e) {
            var that = this, point = hasTouch ? e.touches[0] : e, deltaX = point.pageX - that.pointX, deltaY = point.pageY - that.pointY, newX = that.x + deltaX, newY = that.y + deltaY, c1, c2, scale, timestamp = e.timeStamp || Date.now();
            if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);
            if (that.options.zoom && hasTouch && e.touches.length > 1) {
                c1               = m.abs(e.touches[0].pageX - e.touches[1].pageX);
                c2               = m.abs(e.touches[0].pageY - e.touches[1].pageY);
                that.touchesDist = m.sqrt(c1 * c1 + c2 * c2);
                that.zoomed      = true;
                scale            = 1 / that.touchesDistStart * that.touchesDist * this.scale;
                if (scale >= 1) escala = scale;
                $('#encajarEnPantalla').removeClass('disable');
                $('#zoomDown').removeClass('disable');
                $('#zoomUp').removeClass('disable');
                margenX0 = ($("#wrapper").width() - $("#scroller").width()) / 2;
                margenXI = ($("#wrapper").width() - $("#scroller").width() * escala) / 2;
                if (margenXI > 0) {
                    if (escala >= 1) {$('#scroller').css("left", margenXI);}
                    else {$('#scroller').css("left", margenX0);}
                }
                else {$('#scroller').css("left", 0);}
                if (scale < that.options.zoomMin) scale = 0.5 * that.options.zoomMin * Math.pow(2.0, scale / that.options.zoomMin); else if (scale > that.options.zoomMax) scale = 2.0 * that.options.zoomMax * Math.pow(0.5, that.options.zoomMax / scale);
                that.lastScale = scale / this.scale;
                newX = this.originX - this.originX * that.lastScale + this.x, newY = this.originY - this.originY * that.lastScale + this.y;
                this.scroller.style[transform] = 'translate(' + newX + 'px,' + newY + 'px) scale(' + scale + ')' + translateZ;
                if (that.options.onZoom) that.options.onZoom.call(that, e);
                return;
            }
            that.pointX = point.pageX;
            that.pointY = point.pageY;
            if (newX > 0 || newX < that.maxScrollX) {newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;}
            if (newY > that.minScrollY || newY < that.maxScrollY) {newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY;}
            that.distX += deltaX;
            that.distY += deltaY;
            that.absDistX = m.abs(that.distX);
            that.absDistY = m.abs(that.distY);
            if (that.absDistX < 6 && that.absDistY < 6) {return;}
            if (that.options.lockDirection) {
                if (that.absDistX > that.absDistY + 5) {
                    newY   = that.y;
                    deltaY = 0;
                } else if (that.absDistY > that.absDistX + 5) {
                    newX   = that.x;
                    deltaX = 0;
                }
            }
            that.moved = true;
            that._pos(newX, newY);
            that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
            that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
            if (timestamp - that.startTime > 300) {
                that.startTime = timestamp;
                that.startX    = that.x;
                that.startY    = that.y;
            }
            if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
        }, _end:             function (e) {
            if (hasTouch && e.touches.length !== 0)return;
            var that = this, point = hasTouch ? e.changedTouches[0] : e, target, ev, momentumX = {dist: 0, time: 0}, momentumY = {dist: 0, time: 0}, duration = (e.timeStamp || Date.now()) - that.startTime, newPosX = that.x, newPosY = that.y, distX, distY, newDuration, snap, scale;
            that._unbind(MOVE_EV, window);
            that._unbind(END_EV, window);
            that._unbind(CANCEL_EV, window);
            if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);
            if (that.zoomed) {
                scale                                   = that.scale * that.lastScale;
                scale                                   = Math.max(that.options.zoomMin, scale);
                scale                                   = Math.min(that.options.zoomMax, scale);
                that.lastScale                          = scale / that.scale;
                that.scale                              = scale;
                that.x                                  = that.originX - that.originX * that.lastScale + that.x;
                that.y                                  = that.originY - that.originY * that.lastScale + that.y;
                that.scroller.style[transitionDuration] = '200ms';
                that.scroller.style[transform]          = 'translate(' + that.x + 'px,' + that.y + 'px) scale(' + that.scale + ')' + translateZ;
                actualX                                 = that.x;
                actualY                                 = that.y;
                that.zoomed                             = false;
                that.refresh();
                if (that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
                return;
            }
            if (!that.moved) {
                if (hasTouch) {
                    if (that.doubleTapTimer && that.options.zoom) {
                        clearTimeout(that.doubleTapTimer);
                        that.doubleTapTimer = null;
                        if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
                        that.zoom(that.pointX, that.pointY, that.scale == 1 ? that.options.doubleTapZoom : 1);
                        if (that.options.onZoomEnd) {setTimeout(function () {that.options.onZoomEnd.call(that, e);}, 200);}
                    } else if (this.options.handleClick) {
                        that.doubleTapTimer = setTimeout(function () {
                            that.doubleTapTimer = null;
                            target              = point.target;
                            while (target.nodeType != 1) {
                                target = target.parentNode;
                            }
                            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
                                ev = doc.createEvent('MouseEvents');
                                ev.initMouseEvent('click', true, true, e.view, 1, point.screenX, point.screenY, point.clientX, point.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
                                ev._fake = true;
                                target.dispatchEvent(ev);
                            }
                        }, that.options.zoom ? 250 : 0);
                    }
                }
                that._resetPos(400);
                if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
                return;
            }
            if (duration < 300 && that.options.momentum) {
                momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
                momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y - that.minScrollY : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;
                newPosX   = that.x + momentumX.dist;
                newPosY   = that.y + momentumY.dist;
                if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = {dist: 0, time: 0};
                if ((that.y > that.minScrollY && newPosY > that.minScrollY) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = {dist: 0, time: 0};
            }
            if (momentumX.dist || momentumY.dist) {
                newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);
                if (that.options.snap) {
                    distX = newPosX - that.absStartX;
                    distY = newPosY - that.absStartY;
                    if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) {that.scrollTo(that.absStartX, that.absStartY, 200);}
                    else {
                        snap        = that._snap(newPosX, newPosY);
                        newPosX     = snap.x;
                        newPosY     = snap.y;
                        newDuration = m.max(snap.time, newDuration);
                    }
                }
                that.scrollTo(m.round(newPosX), m.round(newPosY), newDuration);
                if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
                return;
            }
            if (that.options.snap) {
                distX = newPosX - that.absStartX;
                distY = newPosY - that.absStartY;
                if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) that.scrollTo(that.absStartX, that.absStartY, 200); else {
                    snap = that._snap(that.x, that.y);
                    if (snap.x != that.x || snap.y != that.y) that.scrollTo(snap.x, snap.y, snap.time);
                }
                if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
                return;
            }
            that._resetPos(200);
            if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
        }, _resetPos:        function (time) {
            var that = this, resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x, resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;
            if (resetX == that.x && resetY == that.y) {
                if (that.moved) {
                    that.moved = false;
                    if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);
                }
                if (that.hScrollbar && that.options.hideScrollbar) {
                    if (vendor == 'webkit') that.hScrollbarWrapper.style[transitionDelay] = '300ms';
                    that.hScrollbarWrapper.style.opacity = '0';
                }
                if (that.vScrollbar && that.options.hideScrollbar) {
                    if (vendor == 'webkit') that.vScrollbarWrapper.style[transitionDelay] = '300ms';
                    that.vScrollbarWrapper.style.opacity = '0';
                }
                return;
            }
            that.scrollTo(resetX, resetY, time || 0);
        }, _wheel:           function (e) {
            var that = this, wheelDeltaX, wheelDeltaY, deltaX, deltaY, deltaScale;
            if ('wheelDeltaX' in e) {
                wheelDeltaX = e.wheelDeltaX / 12;
                wheelDeltaY = e.wheelDeltaY / 12;
            } else if ('wheelDelta' in e) {wheelDeltaX = wheelDeltaY = e.wheelDelta / 12;} else if ('detail' in e) {wheelDeltaX = wheelDeltaY = -e.detail * 3;} else {return;}
            if (that.options.wheelAction == 'zoom') {
                deltaScale = that.scale * Math.pow(2, 1 / 3 * (wheelDeltaY ? wheelDeltaY / Math.abs(wheelDeltaY) : 0));
                if (deltaScale < that.options.zoomMin) deltaScale = that.options.zoomMin;
                if (deltaScale > that.options.zoomMax) deltaScale = that.options.zoomMax;
                if (deltaScale != that.scale) {
                    if (!that.wheelZoomCount && that.options.onZoomStart) that.options.onZoomStart.call(that, e);
                    that.wheelZoomCount++;
                    that.zoom(e.pageX, e.pageY, deltaScale, 400);
                    setTimeout(function () {
                        that.wheelZoomCount--;
                        if (!that.wheelZoomCount && that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
                    }, 400);
                }
                return;
            }
            deltaX = that.x + wheelDeltaX;
            deltaY = that.y + wheelDeltaY;
            if (deltaX > 0) deltaX = 0; else if (deltaX < that.maxScrollX) deltaX = that.maxScrollX;
            if (deltaY > that.minScrollY) deltaY = that.minScrollY; else if (deltaY < that.maxScrollY) deltaY = that.maxScrollY;
            if (that.maxScrollY < 0) {that.scrollTo(deltaX, deltaY, 0);}
        }, _transitionEnd:   function (e) {
            var that = this;
            if (e.target != that.scroller)return;
            that._unbind(TRNEND_EV);
            that._startAni();
        }, _startAni:        function () {
            var that = this, startX = that.x, startY = that.y, startTime = Date.now(), step, easeOut, animate;
            if (that.animating)return;
            if (!that.steps.length) {
                that._resetPos(400);
                return;
            }
            step = that.steps.shift();
            if (step.x == startX && step.y == startY) step.time = 0;
            that.animating = true;
            that.moved     = true;
            if (that.options.useTransition) {
                that._transitionTime(step.time);
                that._pos(step.x, step.y);
                that.animating = false;
                if (step.time) that._bind(TRNEND_EV); else that._resetPos(0);
                return;
            }
            animate = function () {
                var now = Date.now(), newX, newY;
                if (now >= startTime + step.time) {
                    that._pos(step.x, step.y);
                    that.animating = false;
                    if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);
                    that._startAni();
                    return;
                }
                now     = (now - startTime) / step.time - 1;
                easeOut = m.sqrt(1 - now * now);
                newX    = (step.x - startX) * easeOut + startX;
                newY    = (step.y - startY) * easeOut + startY;
                that._pos(newX, newY);
                if (that.animating) that.aniTime = nextFrame(animate);
            };
            animate();
        }, _transitionTime:  function (time) {
            time += 'ms';
            this.scroller.style[transitionDuration] = time;
            if (this.hScrollbar) this.hScrollbarIndicator.style[transitionDuration] = time;
            if (this.vScrollbar) this.vScrollbarIndicator.style[transitionDuration] = time;
        }, _momentum:        function (dist, time, maxDistUpper, maxDistLower, size) {
            var deceleration = 0.0006, speed = m.abs(dist) / time, newDist = (speed * speed) / (2 * deceleration), newTime = 0, outsideDist = 0;
            if (dist > 0 && newDist > maxDistUpper) {
                outsideDist  = size / (6 / (newDist / speed * deceleration));
                maxDistUpper = maxDistUpper + outsideDist;
                speed        = speed * maxDistUpper / newDist;
                newDist      = maxDistUpper;
            } else if (dist < 0 && newDist > maxDistLower) {
                outsideDist  = size / (6 / (newDist / speed * deceleration));
                maxDistLower = maxDistLower + outsideDist;
                speed        = speed * maxDistLower / newDist;
                newDist      = maxDistLower;
            }
            newDist = newDist * (dist < 0 ? -1 : 1);
            newTime = speed / deceleration;
            return {dist: newDist, time: m.round(newTime)};
        }, _offset:          function (el) {
            var left = -el.offsetLeft, top = -el.offsetTop;
            while (el = el.offsetParent) {
                left -= el.offsetLeft;
                top -= el.offsetTop;
            }
            if (el != this.wrapper) {
                left *= this.scale;
                top *= this.scale;
            }
            return {left: left, top: top};
        }, _snap:            function (x, y) {
            var that = this, i, l, page, time, sizeX, sizeY;
            page     = that.pagesX.length - 1;
            for (i = 0, l = that.pagesX.length; i < l; i++) {
                if (x >= that.pagesX[i]) {
                    page = i;
                    break;
                }
            }
            if (page == that.currPageX && page > 0 && that.dirX < 0) page--;
            x              = that.pagesX[page];
            sizeX          = m.abs(x - that.pagesX[that.currPageX]);
            sizeX          = sizeX ? m.abs(that.x - x) / sizeX * 500 : 0;
            that.currPageX = page;
            page           = that.pagesY.length - 1;
            for (i = 0; i < page; i++) {
                if (y >= that.pagesY[i]) {
                    page = i;
                    break;
                }
            }
            if (page == that.currPageY && page > 0 && that.dirY < 0) page--;
            y              = that.pagesY[page];
            sizeY          = m.abs(y - that.pagesY[that.currPageY]);
            sizeY          = sizeY ? m.abs(that.y - y) / sizeY * 500 : 0;
            that.currPageY = page;
            time           = m.round(m.max(sizeX, sizeY)) || 200;
            return {x: x, y: y, time: time};
        }, _bind:            function (type, el, bubble) {(el || this.scroller).addEventListener(type, this, !!bubble);}, _unbind: function (type, el, bubble) {(el || this.scroller).removeEventListener(type, this, !!bubble);}, destroy: function () {
            var that                       = this;
            that.scroller.style[transform] = '';
            that.hScrollbar                = false;
            that.vScrollbar                = false;
            that._scrollbar('h');
            that._scrollbar('v');
            that._unbind(RESIZE_EV, window);
            that._unbind(START_EV);
            that._unbind(MOVE_EV, window);
            that._unbind(END_EV, window);
            that._unbind(CANCEL_EV, window);
            if (!that.options.hasTouch) {
                that._unbind('DOMMouseScroll');
                that._unbind('mousewheel');
            }
            if (that.options.useTransition) that._unbind(TRNEND_EV);
            if (that.options.checkDOMChanges) clearInterval(that.checkDOMTime);
            if (that.options.onDestroy) that.options.onDestroy.call(that);
        }, refresh:          function () {
            var that = this, offset, i, l, els, pos = 0, page = 0;
            if (that.scale < that.options.zoomMin) that.scale = that.options.zoomMin;
            that.wrapperW   = that.wrapper.clientWidth || 1;
            that.wrapperH   = that.wrapper.clientHeight || 1;
            that.minScrollY = -that.options.topOffset || 0;
            that.scrollerW  = m.round(that.scroller.offsetWidth * that.scale);
            that.scrollerH  = m.round((that.scroller.offsetHeight + that.minScrollY) * that.scale);
            that.maxScrollX = that.wrapperW - that.scrollerW;
            that.maxScrollY = that.wrapperH - that.scrollerH + that.minScrollY;
            that.dirX       = 0;
            that.dirY       = 0;
            if (that.options.onRefresh) that.options.onRefresh.call(that);
            that.hScroll           = that.options.hScroll && that.maxScrollX < 0;
            that.vScroll           = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);
            that.hScrollbar        = that.hScroll && that.options.hScrollbar;
            that.vScrollbar        = that.vScroll && that.options.vScrollbar && that.scrollerH > that.wrapperH;
            offset                 = that._offset(that.wrapper);
            that.wrapperOffsetLeft = -offset.left;
            that.wrapperOffsetTop  = -offset.top;
            if (typeof that.options.snap == 'string') {
                that.pagesX = [];
                that.pagesY = [];
                els         = that.scroller.querySelectorAll(that.options.snap);
                for (i = 0, l = els.length; i < l; i++) {
                    pos            = that._offset(els[i]);
                    pos.left += that.wrapperOffsetLeft;
                    pos.top += that.wrapperOffsetTop;
                    that.pagesX[i] = pos.left < that.maxScrollX ? that.maxScrollX : pos.left * that.scale;
                    that.pagesY[i] = pos.top < that.maxScrollY ? that.maxScrollY : pos.top * that.scale;
                }
            } else if (that.options.snap) {
                that.pagesX = [];
                while (pos >= that.maxScrollX) {
                    that.pagesX[page] = pos;
                    pos               = pos - that.wrapperW;
                    page++;
                }
                if (that.maxScrollX % that.wrapperW) that.pagesX[that.pagesX.length] = that.maxScrollX - that.pagesX[that.pagesX.length - 1] + that.pagesX[that.pagesX.length - 1];
                pos         = 0;
                page        = 0;
                that.pagesY = [];
                while (pos >= that.maxScrollY) {
                    that.pagesY[page] = pos;
                    pos               = pos - that.wrapperH;
                    page++;
                }
                if (that.maxScrollY % that.wrapperH) that.pagesY[that.pagesY.length] = that.maxScrollY - that.pagesY[that.pagesY.length - 1] + that.pagesY[that.pagesY.length - 1];
            }
            that._scrollbar('h');
            that._scrollbar('v');
            if (!that.zoomed) {
                that.scroller.style[transitionDuration] = '0';
                that._resetPos(400);
            }
        }, scrollTo:         function (x, y, time, relative) {
            var that = this, step = x, i, l;
            that.stop();
            if (!step.length) step = [{x: x, y: y, time: time, relative: relative}];
            for (i = 0, l = step.length; i < l; i++) {
                if (step[i].relative) {
                    step[i].x = that.x - step[i].x;
                    step[i].y = that.y - step[i].y;
                }
                that.steps.push({x: step[i].x, y: step[i].y, time: step[i].time || 0});
            }
            that._startAni();
        }, scrollToElement:  function (el, time) {
            var that = this, pos;
            el       = el.nodeType ? el : that.scroller.querySelector(el);
            if (!el)return;
            pos      = that._offset(el);
            pos.left += that.wrapperOffsetLeft;
            pos.top += that.wrapperOffsetTop;
            pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
            pos.top  = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
            time     = time === undefined ? m.max(m.abs(pos.left) * 2, m.abs(pos.top) * 2) : time;
            that.scrollTo(pos.left, pos.top, time);
        }, scrollToPage:     function (pageX, pageY, time) {
            var that = this, x, y;
            time     = time === undefined ? 400 : time;
            if (that.options.onScrollStart) that.options.onScrollStart.call(that);
            if (that.options.snap) {
                pageX          = pageX == 'next' ? that.currPageX + 1 : pageX == 'prev' ? that.currPageX - 1 : pageX;
                pageY          = pageY == 'next' ? that.currPageY + 1 : pageY == 'prev' ? that.currPageY - 1 : pageY;
                pageX          = pageX < 0 ? 0 : pageX > that.pagesX.length - 1 ? that.pagesX.length - 1 : pageX;
                pageY          = pageY < 0 ? 0 : pageY > that.pagesY.length - 1 ? that.pagesY.length - 1 : pageY;
                that.currPageX = pageX;
                that.currPageY = pageY;
                x              = that.pagesX[pageX];
                y              = that.pagesY[pageY];
            } else {
                x = -that.wrapperW * pageX;
                y = -that.wrapperH * pageY;
                if (x < that.maxScrollX) x = that.maxScrollX;
                if (y < that.maxScrollY) y = that.maxScrollY;
            }
            that.scrollTo(x, y, time);
        }, disable:          function () {
            this.stop();
            this._resetPos(0);
            this.enabled = false;
            this._unbind(MOVE_EV, window);
            this._unbind(END_EV, window);
            this._unbind(CANCEL_EV, window);
        }, enable:           function () {this.enabled = true;}, stop: function () {
            if (this.options.useTransition) this._unbind(TRNEND_EV); else cancelFrame(this.aniTime);
            this.steps     = [];
            this.moved     = false;
            this.animating = false;
        }, zoom:             function (x, y, scale, time) {
            var that = this, relScale = scale / that.scale;
            if (!that.options.useTransform)return;
            that.zoomed = true;
            time        = time === undefined ? 200 : time;
            x           = x - that.wrapperOffsetLeft - that.x;
            y           = y - that.wrapperOffsetTop - that.y;
            that.x      = x - x * relScale + that.x;
            that.y      = y - y * relScale + that.y;
            that.scale  = scale;
            that.refresh();
            that.x                                  = that.x > 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x;
            that.y                                  = that.y > that.minScrollY ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;
            that.scroller.style[transitionDuration] = time + 'ms';
            that.scroller.style[transform]          = 'translate(' + that.x + 'px,' + that.y + 'px) scale(' + scale + ')' + translateZ;
            that.zoomed                             = false;
        }, isReady:          function () {return !this.moved && !this.zoomed && !this.animating;}
    };
    function prefixStyle(style) {
        if (vendor === '')return style;
        style = style.charAt(0).toUpperCase() + style.substr(1);
        return vendor + style;
    }

    dummyStyle = null;
    if (typeof exports !== 'undefined') exports.iScroll = iScroll; else window.iScroll = iScroll;
})(window, document);

function crear() {
    var tamMaximoAncho = $('#wrapper').width();
    var tamMaximoAlto  = $('#wrapper').height();
    tamCasillaAncho    = parseInt(tamMaximoAncho / numFilas);
    tamCasillaAlto     = parseInt(tamMaximoAlto / numFilas);
    if (tamCasillaAncho >= tamCasillaAlto) {
        tamCasilla = tamCasillaAlto;
        tamMaximo  = tamMaximoAlto;
    }
    else {
        tamCasilla = tamCasillaAncho;
        tamMaximo  = tamMaximoAncho;
    }
    $('#scroller').width(tamCasilla * numFilas);
    $('#scroller').addClass('unselectable');
    miLienzo = $('#lienzo');
    var px   = 0;
    var py   = 0;
    for (i = 0; i < numFilas; i++) {
        if (i < 10)var ix = "0" + i; else var ix = i;
        for (j = 0; j < numFilas; j++) {
            pxt = px + "px";
            pyt = py + "px";
            if (j < 10)var jy = "0" + j; else var jy = j;
            var div = $("<div>", {id: "c" + ix + "_" + jy, "class": "casilla", "unselectable": "on", css: {"left": pxt, "top": pyt}});
            miLienzo.append(div);
            px           = px + (tamCasilla);
            var tamLetra = tamCasilla - 11;
            if (tamLetra < 7) tamLetra = 7;
            if (tamLetra > 21) tamLetra = 21;
            $("#c" + ix + "_" + jy).css({"width": tamCasilla + "px", "height": tamCasilla + "px", "font-size": tamLetra + "px", "line-height": tamCasilla + "px"});
        }
        px = 0;
        py = py + (tamCasilla);
    }
    var altoLienzo = tamCasilla * numFilas;
    $('#lienzo').height(altoLienzo);
    setTimeout(function () {
        var margenX = ($("#wrapper").width() - $("#scroller").width()) / 2;
        $('#scroller').css("left", margenX);
    }, 1000);
    if ($('#all').width() < 600) {
        $('#info').removeClass('visible');
        $('#info').addClass('oculto');
    }
    else {$("#btnPistas").hide();}
    if (!is_touch_device()) {
        $("#infoZoom").hide();
        $(".zoomScroller").hide();
    }
    cargar();
}
function cargar() {
    for (k = 0; k < pa.length; k++) {
        fila      = fi[k];
        columna   = co[k];
        direccion = di[k];
        palabra   = pa[k];
        if (k < 10)var kz = "0" + k; else var kz = k;
        if (columna < 10)var columnax = "0" + columna; else columnax = columna;
        if (fila < 10)var filay = "0" + fila; else filay = fila;
        if (direccion == "E") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna + i;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
        if (direccion == "SE") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila + i;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna + i;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
        if (direccion == "S") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila + i;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
        if (direccion == "SO") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila + i;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna - i;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
        if (direccion == "O") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna - i;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
        if (direccion == "NO") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila - i;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna - i;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
        if (direccion == "N") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila - i;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
        if (direccion == "NE") {
            for (i = 0; i <= (palabra.length - 1); i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                filax = fila - i;
                if (filax < 10)var filax = "0" + filax;
                columnay = columna + i;
                if (columnay < 10)var columnay = "0" + columnay;
                $("#c" + filax + "_" + columnay).html(palabra[i]);
            }
        }
    }
    rellenar();
}
function rellenar() {
    var letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (i = 0; i < numFilas; i++) {
        if (i < 10)var ix = "0" + i; else var ix = i;
        for (j = 0; j < numFilas; j++) {
            var aleatorio = parseInt(Math.random() * 100);
            while (aleatorio >= letras.length - 1) {aleatorio = parseInt(Math.random() * 100);}
            if (j < 10)var jy = "0" + j; else var jy = j;
            if ($("#c" + ix + "_" + jy).html() == "") $("#c" + ix + "_" + jy).html(letras[aleatorio]);
        }
    }
    cargarPistas();
    if (is_touch_device()) {$(".casilla").bind("click", controlaInicio);}
    else {
        $(".casilla").mousedown(controlaInicio);
        $(".casilla").mouseup(controlaFinal);
    }
}
function cargarPistas() {
    var ol = $("<ol>");
    for (k = 0; k < pa.length; k++) {
        if (k < 10)var kx = "0" + k; else var kx = k;
        palabra = pa[k];
        var li  = $("<li>");
        var div = $("<div>", {id: "divPista" + kx, "class": "cajaPista"});
        if (pistas == "palabra") $(div).html(palabra);
        if (pistas == "ninguna") $(div).html("????");
        if (pistas == "asteriscos") {
            var asteriscos = "";
            for (p = 0; p < palabra.length; p++) {asteriscos += "_";}
            $(div).html(asteriscos);
        }
        $(li).append(div);
        $(ol).append(li);
    }
    $("#contenidoPista").append(ol);
};function extraerDatos() {
    tipo_actividad              = "Sopa";
    numero_intentos             = "noDefinido";
    sensible_mayusculas         = "noDefinido";
    sensible_acentos            = "noDefinido";
    sensible_mayusculas_ocultar = "si";
    sensible_acentos_ocultar    = "si";
    try {origen_recursos = xmlDoc.getElementsByTagName("origen_recursos")[0].childNodes[0].nodeValue;} catch (e) {origen_recursos = "";}
    if (origen_recursos) {rutaRecursos = origen_recursos;}
    try {botonReinicio = xmlDoc.getElementsByTagName("boton_reiniciar")[0].childNodes[0].nodeValue;} catch (e) {botonReinicio = 'visible';}
    try {
        colorFuente    = xmlDoc.getElementsByTagName("color_fuente")[0].childNodes[0].nodeValue;
        colorFuenteB   = xmlDoc.getElementsByTagName("color_fuente_b")[0].childNodes[0].nodeValue;
        colorFuenteInt = colorFuente.substring(2, colorFuente.length);
        colorFuente    = "#" + colorFuente.substring(2, colorFuente.length);
        colorFuenteB   = "#" + colorFuenteB.substring(2, colorFuenteB.length);
    } catch (e) {
        colorFuente  = "#FFFFFF";
        colorFuenteB = "#111111";
    }
    colorFondo    = xmlDoc.getElementsByTagName("color_fondo_h")[0].childNodes[0].nodeValue;
    colorFondoInt = colorFondo.substring(2, colorFondo.length);
    colorFondo    = "#" + colorFondo.substring(2, colorFondo.length);
    colorBotones  = xmlDoc.getElementsByTagName("color_botones_h")[0].childNodes[0].nodeValue;
    colorBotones  = colorBotones.substring(2, colorBotones.length);
    try {logoPersonalizado = xmlDoc.getElementsByTagName("logoPersonalizado")[0].childNodes[0].nodeValue;} catch (e) {logoPersonalizado = "";}
    try {franjaPersonalizada = xmlDoc.getElementsByTagName("franjaPersonalizada")[0].childNodes[0].nodeValue;} catch (e) {franjaPersonalizada = "";}
    tiempo = xmlDoc.getElementsByTagName("tiempo")[0].childNodes[0].nodeValue;
    if (tiempo == "si") tiempo = xmlDoc.getElementsByTagName("tiempo")[0].attributes.getNamedItem("maximo").value; else if (tiempo == "no") tiempo = 0;
    globalFeedback = xmlDoc.getElementsByTagName("globalFeedback")[0].childNodes[0].nodeValue;
    if (xmlDoc.getElementsByTagName("autor")[0].childNodes.length == 0) {autor = '';} else {autor = xmlDoc.getElementsByTagName("autor")[0].childNodes[0].nodeValue;}
    descripcionUsuario         = xmlDoc.getElementsByTagName("descripcionUsuario")[0].childNodes[0].nodeValue;
    registro                   = xmlDoc.getElementsByTagName("registro")[0];
    descripcion                = xmlDoc.getElementsByTagName("descripcion")[0].childNodes[0].nodeValue;
    descripcionT               = xmlDoc.getElementsByTagName("descripcionT")[0].childNodes[0].nodeValue;
    enunciado                  = xmlDoc.getElementsByTagName("enunciado")[0].childNodes[0].nodeValue;
    numFilas                   = xmlDoc.getElementsByTagName("numero_filas")[0].childNodes[0].nodeValue;
    pistas                     = xmlDoc.getElementsByTagName("pistas")[0].childNodes[0].nodeValue;
    var idioma                 = xmlDoc.getElementsByTagName("idioma")[0];
    instrucciones              = idioma.getElementsByTagName("instrucciones")[0].childNodes[0].nodeValue;
    txtPuntos                  = idioma.getElementsByTagName("txtPuntos")[0].childNodes[0].nodeValue;
    txtTiempo                  = idioma.getElementsByTagName("txtTiempo")[0].childNodes[0].nodeValue;
    txtTiempoRestante          = idioma.getElementsByTagName("txtTiempoRestante")[0].childNodes[0].nodeValue;
    comprobar                  = idioma.getElementsByTagName("comprobar")[0].childNodes[0].nodeValue;
    txtRespuestaIncorrecta     = "";
    txtActNoSuperada           = "";
    txtTiempoSuperado          = idioma.getElementsByTagName("txtTiempoSuperado")[0].childNodes[0].nodeValue;
    txtCerrar                  = idioma.getElementsByTagName("txtCerrar")[0].childNodes[0].nodeValue;
    txtTituloRespuestaCorrecta = idioma.getElementsByTagName("txtTituloRespuestaCorrecta")[0].childNodes[0].nodeValue;
    txtRespuestaCorrecta       = idioma.getElementsByTagName("txtRespuestaCorrecta")[0].childNodes[0].nodeValue;
    txtBoxRespuestaCorrecta    = idioma.getElementsByTagName("txtBoxRespuestaCorrecta")[0].childNodes[0].nodeValue;
    txtActividadNoSuperada     = idioma.getElementsByTagName("txtActividadNoSuperada")[0].childNodes[0].nodeValue;
    txtMostrarPalabra          = idioma.getElementsByTagName("txtMostrarPalabra")[0].childNodes[0].nodeValue;
    txtAceptar                 = idioma.getElementsByTagName("txtAceptar")[0].childNodes[0].nodeValue;
    txtTiempoMaximo            = idioma.getElementsByTagName("txtTiempoMaximo")[0].childNodes[0].nodeValue;
    txtSensible                = idioma.getElementsByTagName("txtSensible")[0].childNodes[0].nodeValue;
    txtMayusculasMinusculas    = idioma.getElementsByTagName("txtMayusculasMinusculas")[0].childNodes[0].nodeValue;
    txtAcentos                 = idioma.getElementsByTagName("txtAcentos")[0].childNodes[0].nodeValue;
    txtComenzar                = idioma.getElementsByTagName("txtComenzar")[0].childNodes[0].nodeValue;
    txtAutor                   = idioma.getElementsByTagName("txtAutor")[0].childNodes[0].nodeValue;
    txtAyuda                   = idioma.getElementsByTagName("txtAyuda")[0].childNodes[0].nodeValue;
    txtMostrarMas              = idioma.getElementsByTagName("txtMostrarMas")[0].childNodes[0].nodeValue;
    txtMostrarMenos            = idioma.getElementsByTagName("txtMostrarMenos")[0].childNodes[0].nodeValue;
    txtReiniciar               = idioma.getElementsByTagName("txtReiniciar")[0].childNodes[0].nodeValue;
    txtVolverJugar             = idioma.getElementsByTagName("txtVolverJugar")[0].childNodes[0].nodeValue;
    txtRegistrarse             = idioma.getElementsByTagName("txtRegistrarse")[0].childNodes[0].nodeValue;
    txtAcceder                 = idioma.getElementsByTagName("txtAcceder")[0].childNodes[0].nodeValue;
    txtCompartirResultado      = idioma.getElementsByTagName("txtCompartirResultado")[0].childNodes[0].nodeValue;
    txtAumentar                = idioma.getElementsByTagName("txtAumentar")[0].childNodes[0].nodeValue;
    txtReducir                 = idioma.getElementsByTagName("txtReducir")[0].childNodes[0].nodeValue;
    txtImprimir                = idioma.getElementsByTagName("txtImprimir")[0].childNodes[0].nodeValue;
    txtPantallaCompleta        = idioma.getElementsByTagName("txtPantallaCompleta")[0].childNodes[0].nodeValue;
    txtPistas                  = idioma.getElementsByTagName("txtPistas")[0].childNodes[0].nodeValue;
    txtInfoAdicional           = idioma.getElementsByTagName("txtInfoAdicional")[0].childNodes[0].nodeValue;
    txtSocial                  = idioma.getElementsByTagName("txtSocial")[0].childNodes[0].nodeValue;
    botonesOcultos             = xmlDoc.getElementsByTagName("botonesOcultos")[0].childNodes[0].nodeValue;
    pa                         = [];
    fi                         = [];
    co                         = [];
    di                         = [];
    fe                         = [];
    var palab                  = xmlDoc.getElementsByTagName("palabra");
    for (var i = 0; i < palab.length; i++) {
        pa[i] = palab[i].getElementsByTagName("valor")[0].childNodes[0].nodeValue;
        fi[i] = parseInt(palab[i].getElementsByTagName("fila")[0].childNodes[0].nodeValue);
        co[i] = parseInt(palab[i].getElementsByTagName("columna")[0].childNodes[0].nodeValue);
        di[i] = palab[i].getElementsByTagName("direccion")[0].childNodes[0].nodeValue;
        if (globalFeedback == 1) {
            if (palab[i].getElementsByTagName("feedback")[0].childNodes[0] != undefined) {fe[i] = palab[i].getElementsByTagName("feedback")[0].childNodes[0].nodeValue;}
        }
    }
}
function inicializarElementos() {
    inicializarColores();
    inicializarEventosPrincipales();
    inicializarPantallaInicial();
    inicializarPista();
    inicializarParametros();
    inicializarPuntosSopa();
    inicializarTituloAct();
    inicializarBtnMostrar();
    inicializarBtnsAyuda();
    inicializarAlertaCorrecta();
    inicializarAlertaIncorrecta();
    inicializarRecargar();
    inicializarAyuda();
    inicializarAyudaTactil();
    inicializarZoom();
    inicializarRegistro();
}



function inicializarEventosPrincipales() {
    $(window).resize(function () {
        redimensionar("redi");
    });
}
function inicializarPista() {
    $('#btnCerrar').click(function (e) {
        e.preventDefault();
        desactivarPista();
    });
    idTimeout = "pista";
    $("#btnPistas").text(txtPistas);
    $("#btnPistas").click(function (e) {
        e.preventDefault();
        activarPista();
    });
}
function desactivarPista() {
    $('#info').removeClass('visible');
    $('#info').addClass('oculto');
    $('#shadow').removeClass('visible');
    $('#shadow').addClass('oculto');
}
function activarPista() {
    $('#info').removeClass('oculto');
    $('#info').addClass('visible');
    $('#shadow').removeClass('oculto');
    $('#shadow').addClass('visible');
}
function inicializarPuntosSopa() {$("#numPuntos").html("0");}
function inicializarBtnMostrar() {
    $('#btnMostrar').text(txtMostrarPalabra);
    $('#btnMostrar').click(function (e) {
        e.preventDefault();
        mostrar();
    });
}
function inicializarAyudaTactil() {
    if (is_touch_device()) {$('#pantallaAyuda').text(descripcionT);}
}
function inicializarBtnsAyuda() {if (botonesOcultos == 1) $("#btnMostrar").css("visibility", "hidden");};function comenzar() {
    inicializarVariablesXapi();
    $('#contentPreActividad').hide();
    $('#contentAct').css('top', 0);
    idInterval = setInterval(contador, 1000);
    if (is_touch_device()) {
        var myScroll;
        myScroll = setTimeout(function () {new iScroll('wrapper', {zoom: true})}, 2000);
    }
}
var escala         = 1;
var escalaAnterior = 1;
var controlZoom    = 0;
function redimensionar(tipo) {
    if (tipo == "redi") {
        var tamMaximoAncho = $('#wrapper').width();
        var tamMaximoAlto  = $('#wrapper').height();
        tamCasillaAncho    = parseInt(tamMaximoAncho / numFilas);
        tamCasillaAlto     = parseInt(tamMaximoAlto / numFilas);
        if (tamCasillaAncho >= tamCasillaAlto) {
            tamCasilla = tamCasillaAlto;
            tamMaximo  = tamMaximoAlto;
        }
        else {
            tamCasilla = tamCasillaAncho;
            tamMaximo  = tamMaximoAncho;
        }
        $('#scroller').width(tamCasilla * numFilas);
        $('#scroller').addClass('unselectable');
        var px = 0;
        var py = 0;
        for (i = 0; i < numFilas; i++) {
            if (i < 10)var ix = "0" + i; else var ix = i;
            for (j = 0; j < numFilas; j++) {
                pxt = px + "px";
                pyt = py + "px";
                if (j < 10)var jy = "0" + j; else var jy = j;
                $("#c" + ix + "_" + jy).css({"top": pyt, "left": pxt});
                px           = px + (tamCasilla);
                var tamLetra = tamCasilla - 11;
                if (tamLetra < 7) tamLetra = 7;
                if (tamLetra > 21) tamLetra = 21;
                $("#c" + ix + "_" + jy).css({"width": tamCasilla + "px", "height": tamCasilla + "px", "font-size": tamLetra + "px", "line-height": tamCasilla + "px"});
            }
            px = 0;
            py = py + (tamCasilla);
        }
        var altoLienzo = tamCasilla * numFilas;
        $('#lienzo').height(altoLienzo);
        setTimeout(function () {
            var margenX = ($("#wrapper").width() - $("#scroller").width()) / 2;
            $('#scroller').css("left", margenX);
        }, 500);
        if ($('#all').width() < 600) {
            $('#info').removeClass('visible');
            $('#info').addClass('oculto');
            $("#btnPistas").show();
            $("#infoZoom").show();
            $(".zoomScroller").show();
        }
        else {$("#btnPistas").hide();}
        if (!is_touch_device()) {
            $("#infoZoom").hide();
            $(".zoomScroller").hide();
        }
        setTimeout(function () {
            for (l = 0; l < pa.length; l++) {
                if (l < 10)var lx = "0" + l; else var lx = l;
                if ($("#linea" + lx).length != 0) {
                    fila      = fi[l];
                    columna   = co[l];
                    direccion = di[l];
                    palabra   = pa[l];
                    if (fila < 10)var filax0 = "0" + fila; else var filax0 = fila;
                    if (columna < 10)var columnax0 = "0" + columna; else var columnax0 = columna;
                    var inicio = "c" + filax0 + "_" + columnax0;
                    if ((direccion == "S") || (direccion == "E") || (direccion == "NE") || (direccion == "SE")) {
                        filax    = filax0;
                        columnax = columnax0;
                    }
                    if (direccion == "SO") {
                        var filax = fila + palabra.length - 1;
                        if (filax < 10)var filax = "0" + filax;
                        var columnax = columna - palabra.length + 1;
                        if (columnax < 10)var columnax = "0" + columnax;
                    }
                    if (direccion == "O") {
                        var columnax = columna - palabra.length + 1;
                        if (columnax < 10)var columnax = "0" + columnax;
                        filax = filax0;
                    }
                    if (direccion == "NO") {
                        var filax = fila - palabra.length + 1;
                        if (filax < 10)var filax = "0" + filax;
                        var columnax = columna - palabra.length + 1;
                        if (columnax < 10)var columnax = "0" + columnax;
                    }
                    if (direccion == "N") {
                        var filax = fila - palabra.length + 1;
                        if (filax < 10)var filax = "0" + filax;
                        columnax = columnax0;
                    }
                    var final = "c" + filax + "_" + columnax;
                    if ((direccion == "S") || (direccion == "E") || (direccion == "NE") || (direccion == "SE")) comienzo = inicio; else comienzo = final;
                    var anchura = tamCasilla * palabra.length;
                    if ((direccion == "NO") || (direccion == "NE") || (direccion == "SO") || (direccion == "SE")) anchura = tamCasilla * Math.SQRT2 * palabra.length;
                    $("#linea" + lx).css({"left": $("#" + comienzo).css("left"), "top": $("#" + comienzo).css("top"), "width": anchura, "height": tamCasilla - 6});
                }
            }
        }, 300);
        $(".vertical").css("margin-top", -(tamCasilla + 4));
        $(".diagonal").css("margin-top", -((tamCasilla / 2) + 4));
        $(".diagonal").css("margin-left", -(((tamCasilla / 2) + 4) / 2));
        $(".diagonalInvertida").css("margin-top", (tamCasilla / 2) - 2);
        $(".diagonalInvertida").css("margin-left", ((tamCasilla / 2) + 4) / 2);
        cargarDescripcionInicio();
    }
    if (tipo == "encaja") {
        controlZoom = 1;
        $('#encajarEnPantalla').addClass('disable');
        $('#zoomDown').addClass('disable');
        $('#zoomUp').removeClass('disable');
        escalaAnterior = escala;
        escala         = 1;
        var margenX    = ($("#wrapper").width() - $("#scroller").width()) / 2;
        $('#scroller').css("left", margenX);
        if (escala != escalaAnterior) {
            var zoom = parseInt(100 * escala);
            $('#infoZoom').html(zoom + "%");
            $('#infoZoom').fadeIn(500);
            setTimeout(function () {$('#infoZoom').fadeOut(500)}, 2000);
        }
        actualX = 0;
        actualY = 0;
        $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "px," + actualX + "px)");
        $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualX + ")");
        $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualX + ")");
        $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualX + ")");
    }
    if (tipo == "up") {
        controlZoom = 1;
        $('#encajarEnPantalla').removeClass('disable');
        $('#zoomDown').removeClass('disable');
        if (escala >= 4.9) $('#zoomUp').addClass('disable');
        if (escala != 5) {
            escalaAnterior = escala;
            escala         = escala + 0.1;
            if (escala >= 5) escala = 5;
            if (escala != escalaAnterior) {
                var zoom = parseInt(100 * escala);
                $('#infoZoom').html(zoom + "%");
                $('#infoZoom').fadeIn(500);
                setTimeout(function () {$('#infoZoom').fadeOut(500)}, 2000);
            }
            $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "px," + actualY + "px)");
            $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualY + ")");
            $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualY + ")");
            $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualY + ")");
        }
    }
    if (tipo == "down") {
        controlZoom = 1;
        if (escala == 1.1) {
            $('#encajarEnPantalla').addClass('disable');
            $('#zoomDown').addClass('disable');
        }
        $('#zoomUp').removeClass('disable');
        if (escala != 1) {
            escalaAnterior = escala;
            escala         = escala - 0.1;
            if (escala <= 1) escala = 1;
            if (escala != escalaAnterior) {
                var zoom = parseInt(100 * escala);
                $('#infoZoom').html(zoom + "%");
                $('#infoZoom').fadeIn(500);
                setTimeout(function () {$('#infoZoom').fadeOut(500)}, 2000);
            }
            $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "px," + actualY + "px)");
            $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualY + ")");
            $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualY + ")");
            $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualY + ")");
            var limX = (($('#scroller').width() * escala - $('#scroller').width()) / 2) - (($('#wrapper').width() - $('#scroller').width()) / 2);
            if ($('#wrapper').width() > $('#scroller').width() * escala) limX = 0;
            var limY  = ($('#scroller').height() * escala - $('#scroller').height()) / 2;
            var limYB = (($('#scroller').height() * escala - $('#scroller').height()) / 2) + ($('#scroller').height() - $('#wrapper').height());
            if (actualX >= limX) {
                $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "px," + actualY + "px)");
                $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "," + actualY + ")");
                $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "," + actualY + ")");
                $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "," + actualY + ")");
                actualX = limX;
            }
            else if (actualX < -limX) {
                $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "px," + actualY + "px)");
                $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "," + actualY + ")");
                $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "," + actualY + ")");
                $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "," + actualY + ")");
                actualX = -limX;
            }
            if (actualY >= limY) {
                $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "px," + limY + "px)");
                $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + limY + ")");
                $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + limY + ")");
                $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + limY + ")");
                actualY = limY;
            }
            else if (actualY < -limYB) {
                $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "px," + (-limYB) + "px)");
                $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + (-limYB) + ")");
                $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + (-limYB) + ")");
                $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + (-limYB) + ")");
                actualY = -limYB;
            }
            if (escala < 1) {
                $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + ",0px,0px)");
                $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + ",0,0)");
                $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + ",0,0)");
                $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + ",0,0)");
                actualX = 0;
                actualY = 0;
            }
        }
    }
}
var activadoMover = 0;
var actualX       = 0;
var actualY       = 0;
var moviX         = 0;
var moviY         = 0;
function capturarCoordenadasInicio(ev) {
    $('body').addClass('cursorGrabbing');
    var matrizInicioMoz = "matrix(" + escala + ",0,0," + escala + "," + actualX + "px," + actualY + "px)";
    var matrizInicio    = "matrix(" + escala + ",0,0," + escala + "," + actualX + "," + actualY + ")";
    $('#scroller').css("-moz-transform", matrizInicioMoz);
    $('#scroller').css("-ms-transform", matrizInicio);
    $('#scroller').css("-o-transform", matrizInicio);
    $('#scroller').css("-webkit-transform", matrizInicio);
    if (activadoMover == 1) activadoMover = 0; else activadoMover = 1;
    inicioX = ev.clientX;
    inicioY = ev.clientY;
}
function pararDesplazamiento(ev) {
    $('body').removeClass('cursorGrabbing');
    activadoMover = 0;
    var matriz    = $('#scroller').css("-moz-transform");
    if (matriz == undefined) matriz = $('#scroller').css("-ms-transform");
    if (matriz == undefined) matriz = $('#scroller').css("-o-transform");
    if (matriz == undefined) matriz = $('#scroller').css("-webkit-transform");
    var arrayMatriz = matriz.split(',');
    trasX           = parseInt(arrayMatriz[4]);
    trasY           = parseInt(arrayMatriz[5]);
    actualX         = trasX;
    actualY         = trasY;
    var limX        = (($('#scroller').width() * escala - $('#scroller').width()) / 2) - (($('#wrapper').width() - $('#scroller').width()) / 2);
    if ($('#wrapper').width() > $('#scroller').width() * escala) limX = 0;
    var limY  = ($('#scroller').height() * escala - $('#scroller').height()) / 2;
    var limYB = (($('#scroller').height() * escala - $('#scroller').height()) / 2) + ($('#scroller').height() - $('#wrapper').height());
    if (trasX >= limX) {
        $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "px," + moviY + "px)");
        $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "," + moviY + ")");
        $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "," + moviY + ")");
        $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + limX + "," + moviY + ")");
        moviX   = limX;
        actualX = limX;
    }
    else if (trasX < -limX) {
        $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "px," + moviY + "px)");
        $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "," + moviY + ")");
        $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "," + moviY + ")");
        $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + (-limX) + "," + moviY + ")");
        moviX   = -limX;
        actualX = -limX;
    }
    if (trasY >= limY) {
        $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "px," + limY + "px)");
        $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + limY + ")");
        $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + limY + ")");
        $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + limY + ")");
        moviY   = limY;
        actualY = limY;
    }
    else if (trasY < -limYB) {
        $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "px," + (-limYB) + "px)");
        $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + (-limYB) + ")");
        $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + (-limYB) + ")");
        $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + (-limYB) + ")");
        moviY   = -limYB;
        actualY = -limYB;
    }
    if (escala < 1) {
        $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + ",0px,0px)");
        $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + ",0,0)");
        $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + ",0,0)");
        $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + ",0,0)");
        actualX = 0;
        actualY = 0;
    }
}
function desplazarLienzo(ev) {
    var movX = ev.clientX;
    var movY = ev.clientY;
    if (activadoMover == 1) {
        moviX = movX - inicioX + actualX;
        moviY = movY - inicioY + actualY;
        $('#scroller').css("-moz-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "px," + moviY + "px)");
        $('#scroller').css("-ms-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + moviY + ")");
        $('#scroller').css("-o-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + moviY + ")");
        $('#scroller').css("-webkit-transform", "matrix(" + escala + ",0,0," + escala + "," + moviX + "," + moviY + ")");
    }
}
function controlaInicio(e) {
    idIni   = e.target.getAttribute("id");
    fInicio = parseInt(idIni.substring(1, 3), 10);
    cInicio = parseInt(idIni.substring(4, 6), 10);
    $("#c" + idIni.substring(1, 3) + "_" + idIni.substring(4, 6)).addClass("activo");
    if (is_touch_device()) {
        $(".casilla").unbind("click");
        $(".casilla").bind("click", controlaMov);
    }
    else {$(".casilla").bind("mouseover", controlaMov);}
    $(".casilla").removeClass("incorrecto");
    palabraActiva = $("#c" + idIni.substring(1, 3) + "_" + idIni.substring(4, 6)).html();
}
var dire = "";
function controlaMov(e) {
    idFin  = e.target.getAttribute("id");
    fFinal = parseInt(idFin.substring(1, 3), 10);
    cFinal = parseInt(idFin.substring(4, 6), 10);
    if (fInicio == fFinal) {
        $(".casilla").removeClass("activo");
        if (fInicio < 10)var fIniciox = "0" + fInicio; else var fIniciox = fInicio;
        if (cInicio <= cFinal) {
            dire          = "E";
            palabraActiva = "";
            for (i = cInicio; i <= cFinal; i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                $("#c" + fIniciox + "_" + ix).addClass("activo");
                palabraActiva += $("#c" + fIniciox + "_" + ix).html();
            }
        }
        else if (cInicio > cFinal) {
            dire          = "O";
            palabraActiva = "";
            for (i = cInicio; i >= cFinal; i--) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                $("#c" + fIniciox + "_" + ix).addClass("activo");
                palabraActiva += $("#c" + fIniciox + "_" + ix).html();
            }
        }
        idFinO = "c" + fIniciox + "_" + ix;
    }
    if (cInicio == cFinal) {
        dire = "vertical";
        $(".casilla").removeClass("activo");
        if (cInicio < 10)var cIniciox = "0" + cInicio; else var cIniciox = cInicio;
        if (fInicio <= fFinal) {
            dire          = "S";
            palabraActiva = "";
            for (i = fInicio; i <= fFinal; i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                $("#c" + ix + "_" + cIniciox).addClass("activo");
                palabraActiva += $("#c" + ix + "_" + cIniciox).html();
            }
        }
        else if (fInicio > fFinal) {
            dire          = "N";
            palabraActiva = "";
            for (i = fInicio; i >= fFinal; i--) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                $("#c" + ix + "_" + cIniciox).addClass("activo");
                palabraActiva += $("#c" + ix + "_" + cIniciox).html();
            }
        }
        idFinO = "c" + ix + "_" + cIniciox;
    }
    if (Math.abs(cInicio - cFinal) == Math.abs(fInicio - fFinal)) {
        dire = "diagonal";
        $(".casilla").removeClass("activo");
        if ((fInicio <= fFinal) && (cInicio <= cFinal)) {
            dire          = "SE";
            palabraActiva = "";
            for (i = cInicio; i <= cFinal; i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                j = fInicio + (i - cInicio);
                if (j < 10)var jx = "0" + j; else var jx = j;
                $("#c" + jx + "_" + ix).addClass("activo");
                palabraActiva += $("#c" + jx + "_" + ix).html();
            }
        }
        else if ((fInicio <= fFinal) && (cInicio > cFinal)) {
            dire          = "SO";
            palabraActiva = "";
            for (i = cInicio; i >= cFinal; i--) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                j = fInicio - (i - cInicio);
                if (j < 10)var jx = "0" + j; else var jx = j;
                $("#c" + jx + "_" + ix).addClass("activo");
                palabraActiva += $("#c" + jx + "_" + ix).html();
            }
        }
        else if ((fInicio > fFinal) && (cInicio <= cFinal)) {
            dire          = "NE";
            palabraActiva = "";
            for (i = cInicio; i <= cFinal; i++) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                j = fInicio - (i - cInicio);
                if (j < 10)var jx = "0" + j; else var jx = j;
                $("#c" + jx + "_" + ix).addClass("activo");
                palabraActiva += $("#c" + jx + "_" + ix).html();
            }
        }
        else if ((fInicio > fFinal) && (cInicio > cFinal)) {
            dire          = "NO";
            palabraActiva = "";
            for (i = cInicio; i >= cFinal; i--) {
                if (i < 10)var ix = "0" + i; else var ix = i;
                j = fInicio + (i - cInicio);
                if (j < 10)var jx = "0" + j; else var jx = j;
                $("#c" + jx + "_" + ix).addClass("activo");
                palabraActiva += $("#c" + jx + "_" + ix).html();
            }
        }
        idFinO = "c" + jx + "_" + ix;
    }
    if (is_touch_device()) {
        controlaFinal();
        $(".casilla").unbind("click");
        $(".casilla").bind("click", controlaInicio);
    }
}
var controlAciertos = [];
var final           = 0;
function controlaFinal() {
    $(".casilla").unbind("mouseover");
    for (k = 0; k < pa.length; k++) {
        if (k < 10)var kx = "0" + k; else var kx = k;
        var pai = "";
        for (m = 0; m < pa[k].length; m++) {pai += pa[k].substring(pa[k].length - m - 1, pa[k].length - m);}
        if ((pa[k] == palabraActiva) || (pai == palabraActiva)) {
            $(".activo").removeClass("incorrecto");
            $(".activo").addClass("correcto");
            if (controlAciertos[k] == undefined) {
                $("#divPista" + kx).addClass("correcto");
                $("#divPista" + kx).html(pa[k]);
                actualizaPuntos(k);
                dibujaLinea(idIni, idFinO, pai.length, "acierto", dire, kx);
            }
            controlAciertos[k] = 1;
            final              = "";
            for (l = 0; l < pa.length; l++) {
                if (controlAciertos[l] == undefined) {
                    final = 0;
                    break;
                }
                else final = 1;
            }
            console.log(arrayMitad)
            if (final == 1) {
                for (i = 0; i < pa.length; i++) {
                    pistaUtilizada = 0;
                    if (controlAciertos[i] == 1) {
                        for (j = 0; j < arrayMitad.length; j++) {if (arrayMitad[j] = i) {pistaUtilizada = 1}}
                        responderEscritaXapi(pistaUtilizada, pa[i], pa[i], 1)
                    }
                    else {responderEscritaXapi(pistaUtilizada, pa[i], "", 0)}
                }
                if (puntosReg >= 50) {
                    completarXapi('OK', puntosReg, tiempoReg)
                    cargarPantallaFinal('OK');
                }
                else {
                    completarXapi('KO', puntosReg, tiempoReg)
                    cargarPantallaFinal('noSuperada');
                }
            }
            break;
        }
        else {
            $(".activo").addClass("incorrecto");
            setTimeout(function () {$(".incorrecto").removeClass("incorrecto");}, 1000);
        }
    }
    $(".casilla").removeClass("activo");
}
function dibujaLinea(ini, fin, longitud, malBien, direccion, palabra) {
    var comienzo = "";
    if (direccion == "N") {
        direccion = "vertical";
        comienzo  = fin;
    }
    else if (direccion == "S") {
        direccion = "vertical";
        comienzo  = ini;
    }
    else if (direccion == "E") {
        direccion = "horizontal";
        comienzo  = ini;
    }
    else if (direccion == "O") {
        direccion = "horizontal";
        comienzo  = fin;
    }
    else if (direccion == "NO") {
        direccion = "diagonal";
        comienzo  = fin;
    }
    else if (direccion == "SO") {
        direccion = "diagonalInvertida";
        comienzo  = fin;
    }
    else if (direccion == "NE") {
        direccion = "diagonalInvertida";
        comienzo  = ini;
    }
    else if (direccion == "SE") {
        direccion = "diagonal";
        comienzo  = ini;
    }
    var anchura = tamCasilla * longitud;
    if (direccion.substring(0, 8) == "diagonal") anchura = tamCasilla * Math.SQRT2 * longitud;
    var div = $("<div>", {id: "linea" + palabra, "class": "line " + malBien + " " + direccion, css: {"left": $("#" + comienzo).css("left"), "top": $("#" + comienzo).css("top"), "width": anchura, "height": tamCasilla - 6}});
    $("#lienzo").append(div);
    $(".vertical").css("margin-top", -(tamCasilla + 4));
    $(".diagonal").css("margin-top", -((tamCasilla / 2) + 4));
    $(".diagonal").css("margin-left", -(((tamCasilla / 2) + 4) / 2));
    $(".diagonalInvertida").css("margin-top", (tamCasilla / 2) - 2);
    $(".diagonalInvertida").css("margin-left", ((tamCasilla / 2) + 4) / 2);
}
var puntosReg  = 0;
var arrayMitad = new Array()
function actualizaPuntos(num) {
    var puntosSumar = Math.floor(100 / pa.length);
    if ((puntosMitad == 1) && (palabraMitad == num)) {
        arrayMitad.push(num);
        puntosSumar = Math.round(puntosSumar / 2);
        puntosMitad = 0;
    }
    var puntosActuales = parseInt(puntosReg);
    var puntosTotales  = parseInt(puntosSumar + puntosActuales);
    if (puntosTotales > 100) puntosTotales = 100;
    if ((100 - puntosTotales) < puntosSumar) puntosTotales = 100;
    puntosReg = puntosTotales;
    $("#numPuntos").html(puntosTotales);
}
var puntosMitad  = 0;
var palabraMitad = -1;
function mostrar() {
    $(".casilla").removeClass("incorrecto");
    if ($('#all').width() <= 600) {
        activarPista();
        setTimeout(desactivarPista, 2000);
    }
    for (k = 0; k < pa.length; k++) {
        fila      = fi[k];
        columna   = co[k];
        direccion = di[k];
        palabra   = pa[k];
        if (k < 10)var kx = "0" + k; else var kx = k;
        if (($("#divPista" + kx).html() != pa[k]) && (controlAciertos[k] == undefined)) {
            $("#divPista" + kx).html(pa[k]);
            puntosMitad  = 1;
            palabraMitad = k;
            break;
        }
        else if (controlAciertos[k] == undefined) {
            $("#divPista" + kx).addClass("incorrectoF");
            controlAciertos[k] = 0;
            if (columna < 10)var columnax = "0" + columna; else columnax = columna;
            if (fila < 10)var filay = "0" + fila; else filay = fila;
            var ini = "c" + filay + "_" + columnax;
            if (direccion == "E") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna + i;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            if (direccion == "SE") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila + i;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna + i;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            if (direccion == "S") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila + i;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            if (direccion == "SO") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila + i;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna - i;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            if (direccion == "O") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna - i;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            if (direccion == "NO") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila - i;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna - i;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            if (direccion == "N") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila - i;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            if (direccion == "NE") {
                for (i = 0; i <= (palabra.length - 1); i++) {
                    if (i < 10)var ix = "0" + i; else var ix = i;
                    filax = fila - i;
                    if (filax < 10)var filax = "0" + filax;
                    columnay = columna + i;
                    if (columnay < 10)var columnay = "0" + columnay;
                    $("#c" + filax + "_" + columnay).addClass("incorrectoF");
                }
            }
            var fin = "c" + filax + "_" + columnay;
            dibujaLinea(ini, fin, palabra.length, "fallo", direccion, kx);
            final = "";
            for (l = 0; l < pa.length; l++) {
                if (controlAciertos[l] == undefined) {
                    final = 0;
                    break;
                }
                else final = 1;
            }
            if (final == 1) {
                for (i = 0; i < pa.length; i++) {
                    for (i = 0; i < pa.length; i++) {
                        pistaUtilizada = 0;
                        if (controlAciertos[i] == 1) {
                            for (j = 0; j < arrayMitad.length; j++) {if (arrayMitad[j] = i) {pistaUtilizada = 1}}
                            responderEscritaXapi(pistaUtilizada, pa[i], pa[i], 1)
                        }
                        else {responderEscritaXapi(pistaUtilizada, pa[i], "", 0)}
                    }
                }
                if (puntosReg >= 50) {
                    completarXapi('OK', puntosReg, tiempoReg);
                    cargarPantallaFinal('OK');
                }
                else {
                    completarXapi('KO', puntosReg, tiempoReg)
                    cargarPantallaFinal('noSuperada');
                }
            }
            break;
        }
    }
}
function completarPantallaFinal() {
    for (k = 0; k < pa.length; k++) {
        crearElementosFinal(k);
        $('#numRespuesta_' + k).html(k + 1);
        if (k < 10) kx = "0" + k; else kx = k;
        $('#pCorrecta_' + k).html(pa[k]);
        if (controlAciertos[k] != 1) $("#contentRespuesta_" + k).addClass('respuestaIncorrecta');
    }
    $('.accordionButton').click(function () {
        $('.accordionButton').removeClass('on');
        $('.accordionContent').slideUp('slow');
        if ($(this).next().is(':hidden') == true) {
            $(this).addClass('on');
            $(this).next().slideDown('slow');
            cargarFinal(this);
        }
    });
    $('.accordionContent').hide();
}
function crearElementosFinal(k) {
    var cadenaHTML = "";
    cadenaHTML += "<li>";
    if (globalFeedback == 1) {
        if (fe[k] != undefined) {cadenaHTML += "<div class='accordionButton' id='accordion_" + k + "'>";}
    }
    cadenaHTML += "<div class='contentRespuesta' id='contentRespuesta_" + k + "'>";
    cadenaHTML += "<span class='numRespuesta' id='numRespuesta_" + k + "'></span>";
    cadenaHTML += "<span class='txtRespuesta'><span id='pCorrecta_" + k + "'></span></span>";
    if (globalFeedback == 1) {
        if (fe[k] != undefined) {cadenaHTML += "<span title='" + txtInfoAdicional + "' class='iExtraInfo'></span>";}
    }
    cadenaHTML += "</div>";
    if (globalFeedback == 1) {
        if (fe[k] != undefined) {cadenaHTML += "</div>";}
    }
    if (globalFeedback == 1) {
        if (fe[k] != undefined) {
            cadenaHTML += "<div class='accordionContent'>";
            cadenaHTML += "<div class='contentInfoRespuesta'>";
            cadenaHTML += "<div class='txtExtraInfo' id='txtExtraInfo_" + k + "'></div>";
            cadenaHTML += "</div>";
            cadenaHTML += "</div>";
        }
    }
    cadenaHTML += "</li>";
    $("#listaFinal").html($("#listaFinal").html() + cadenaHTML);
}
function cargarFinal(enlace) {
    var idAccordion = $(enlace).attr('id');
    var k           = parseInt(idAccordion.substring(10, 13), 10);
    if (globalFeedback == 1) {
        if (fe[k] != undefined) {$("#txtExtraInfo_" + k).html(fe[k]);}
    }
}