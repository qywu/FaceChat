! function(e) {
	function t(r) {
		if (n[r]) return n[r].exports;
		var i = n[r] = {
			exports: {},
			id: r,
			loaded: !1
		};
		return e[r].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
	}
	var n = {};
	return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
	"use strict";

	function r(e) {
		return e && e.__esModule ? e : {
			default: e
		}
	}

	function i(e) {
		var t = document.querySelector(".apng-result"),
			n = document.querySelector(".apng-error"),
			r = n.querySelector(".alert"),
			i = document.querySelector(".apng-info"),
			s = document.querySelector(".apng-frames"),
			u = document.querySelector(".apng-ani");
		t.classList.add("hidden"), n.classList.add("hidden"), a(i), a(s), a(u), a(r), l && l.stop();
		var p = new FileReader;
		p.onload = function() {
			console.log(document.getElementById("force-talkr-cbx").checked), c = document.getElementById("force-talkr-cbx").checked;
			var e = (0, o.default)(p.result, c);
			return e instanceof Error ? (r.appendChild(document.createTextNode(e.message)), void n.classList.remove("hidden")) : (e.createImages().then(function() {
				i.appendChild(document.createTextNode(JSON.stringify(e, null, "  "))), e.frames.forEach(function(t) {
					var n = s.appendChild(document.createElement("div"));
					n.appendChild(t.imageElement), n.style.width = e.width + "px", n.style.height = e.height + "px", t.imageElement.style.left = t.left + "px", t.imageElement.style.top = t.top + "px"
				});
				var t = document.createElement("canvas");
				t.width = e.width, t.height = e.height, u.appendChild(t), e.getPlayer(t.getContext("2d")).then(function(e) {
					l = e, l.playbackRate = f//, l.play_for_duration(h)
				})
			}), void t.classList.remove("hidden"))
		}, p.readAsArrayBuffer(e)
	}

	function a(e) {
		for (var t = void 0; null !== (t = e.firstChild);) e.removeChild(t)
	}
	var s = n(1),
		o = r(s);
	n(6);

    function getImgBuffer(url) {
        return new Promise(async resolve => {
          const blob = await fetch(url).then(res => res.blob());
          i(blob);
        });
      }
    async function createApngPlayer(url) {
        const imgBuffer = await getImgBuffer(url);
      }
	const img1Src = 'https://i.imgur.com/G1t4OXM.png'
    createApngPlayer(img1Src);
	var l = null;

    document.getElementById("play-pause-btn").addEventListener("click", function(e) {
		console.log("animate 2 e ", e);
		let now = document.getElementById("play-pause-btn").value;
		let time_est = parseInt(now);
		time_est = (time_est*1000).toExponential();
		console.log("TTS Duration: ", time_est);
		l && (l.paused ? l.play_for_duration(time_est) : l.play_for_duration(time_est)); 
	});
    
    var f = 1,
		c = !1
}, function(e, t, n) {
	"use strict";

	function r(e) {
		return e && e.__esModule ? e : {
			default: e
		}
	}

	function i(e) {
		return e === d
	}

	function a(e) {
		return e === m
	}

	function s(e) {
		var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
			n = new Uint8Array(e);
		if (Array.prototype.some.call(_, function(e, t) {
				return e !== n[t]
			})) return d;
		var r = !1;
		if (o(n, function(e) {
				return !(r = "acTL" === e)
			}), !r) return m;
		var i = [],
			a = [],
			s = null,
			l = null,
			f = 0,
			c = new p.APNG;
		if (o(n, function(e, t, n, r) {
				var o = new DataView(t.buffer);
				switch (e) {
					case "IHDR":
						s = t.subarray(n + 8, n + 8 + r), c.width = o.getUint32(n + 8), c.height = o.getUint32(n + 12);
						break;
					case "acTL":
						c.numPlays = o.getUint32(n + 8 + 4);
						break;
					case "fcTL":
						l && (c.frames.push(l), f++), l = new p.Frame, l.width = o.getUint32(n + 8 + 4), l.height = o.getUint32(n + 8 + 8), l.left = o.getUint32(n + 8 + 12), l.top = o.getUint32(n + 8 + 16);
						var d = o.getUint16(n + 8 + 20),
							m = o.getUint16(n + 8 + 22);
						0 === m && (m = 100), l.delay = 1e3 * d / m, l.delay <= 10 && (l.delay = 100), c.playTime += l.delay, l.disposeOp = o.getUint8(n + 8 + 24), l.blendOp = o.getUint8(n + 8 + 25), l.dataParts = [], 0 === f && 2 === l.disposeOp && (l.disposeOp = 1);
						break;
					case "fdAT":
						l && l.dataParts.push(t.subarray(n + 8 + 4, n + 8 + r));
						break;
					case "IDAT":
						l && l.dataParts.push(t.subarray(n + 8, n + 8 + r));
						break;
					case "IEND":
						a.push(h(t, n, 12 + r));
						break;
					case "iTXt":
						var v = u(t, n + 8, r),
							_ = v.match(new RegExp("<dc:creator>(.*)</dc:creator>", "gms"));
						_ && _[0].includes("talkrapp.com") && (c.isTalkrFile = !0);
						break;
					default:
						i.push(h(t, n, 12 + r))
				}
			}), l && c.frames.push(l), 0 == c.frames.length) return m;
		var b = new Blob(i),
			x = new Blob(a);
		if (c.frames.forEach(function(e) {
				var t = [];
				t.push(_), s.set(y(e.width), 0), s.set(y(e.height), 4), t.push(g("IHDR", s)), t.push(b), e.dataParts.forEach(function(e) {
					return t.push(g("IDAT", e))
				}), t.push(x), e.imageData = new Blob(t, {
					type: "image/png"
				}), delete e.dataParts, t = null
			}), t) {
			if (30 != c.frames.length) return v;
			c.isTalkrFile = !0
		}
		return c
	}

	function o(e, t) {
		var n = new DataView(e.buffer),
			r = 8,
			i = void 0,
			a = void 0,
			s = void 0;
		do a = n.getUint32(r), i = u(e, r + 4, 4), s = t(i, e, r, a), r += 12 + a; while (s !== !1 && "IEND" != i && r < e.length)
	}

	function u(e, t, n) {
		var r = Array.prototype.slice.call(e.subarray(t, t + n));
		return String.fromCharCode.apply(String, r)
	}

	function l(e) {
		for (var t = new Uint8Array(e.length), n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
		return t
	}

	function h(e, t, n) {
		var r = new Uint8Array(n);
		return r.set(e.subarray(t, t + n)), r
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.isNotPNG = i, t.isNotAPNG = a, t.default = s;
	var f = n(2),
		c = r(f),
		p = n(3),
		d = new Error("Not a PNG"),
		m = new Error("Not an animated PNG"),
		v = new Error("Not a talkr PNG with 30 frames"),
		_ = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]),
		g = function(e, t) {
			var n = e.length + t.length,
				r = new Uint8Array(n + 8),
				i = new DataView(r.buffer);
			i.setUint32(0, t.length), r.set(l(e), 4), r.set(t, 8);
			var a = (0, c.default)(r, 4, n);
			return i.setUint32(n + 4, a), r
		},
		y = function(e) {
			return new Uint8Array([e >>> 24 & 255, e >>> 16 & 255, e >>> 8 & 255, 255 & e])
		}
}, function(e, t) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.default = function(e) {
		for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.length - t, i = -1, a = t, s = t + r; a < s; a++) i = i >>> 8 ^ n[255 & (i ^ e[a])];
		return i ^ -1
	};
	for (var n = new Uint32Array(256), r = 0; r < 256; r++) {
		for (var i = r, a = 0; a < 8; a++) i = 0 !== (1 & i) ? 3988292384 ^ i >>> 1 : i >>> 1;
		n[r] = i
	}
}, function(e, t, n) {
	"use strict";

	function r(e) {
		return e && e.__esModule ? e : {
			default: e
		}
	}

	function i(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.FrameAnim = t.Frame = t.APNG = void 0;
	var a = function() {
			function e(e, t) {
				for (var n = 0; n < t.length; n++) {
					var r = t[n];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
				}
			}
			return function(t, n, r) {
				return n && e(t.prototype, n), r && e(t, r), t
			}
		}(),
		s = n(4),
		o = r(s);
	t.APNG = function() {
		function e() {
			i(this, e), this.width = 0, this.height = 0, this.numPlays = 0, this.playTime = 0, this.frames = []
		}
		return a(e, [{
			key: "createImages",
			value: function() {
				return Promise.all(this.frames.map(function(e) {
					return e.createImage()
				}))
			}
		}, {
			key: "getPlayer",
			value: function(e) {
				var t = this,
					n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
				return this.createImages().then(function() {
					return new o.default(t, e, n)
				})
			}
		}]), e
	}(), t.Frame = function() {
		function e() {
			i(this, e), this.left = 0, this.top = 0, this.width = 0, this.height = 0, this.delay = 0, this.disposeOp = 0, this.blendOp = 0, this.imageData = null, this.imageElement = null
		}
		return a(e, [{
			key: "createImage",
			value: function() {
				var e = this;
				return this.imageElement ? Promise.resolve() : new Promise(function(t, n) {
					var r = URL.createObjectURL(e.imageData);
					e.imageElement = document.createElement("img"), e.imageElement.onload = function() {
						URL.revokeObjectURL(r), t()
					}, e.imageElement.onerror = function() {
						URL.revokeObjectURL(r), e.imageElement = null, n(new Error("Image creation error"))
					}, e.imageElement.src = r
				})
			}
		}]), e
	}(), t.FrameAnim = function() {
		function e() {
			i(this, e), this.frames = [], this.nextRenderTime = 0, this.currentFrameIndex = 0
		}
		return a(e, [{
			key: "fromArray",
			value: function(e, t) {
				this.frames = [], e.forEach(function(e) {
					frames.push(e, t)
				})
			}
		}, {
			key: "fromFrames",
			value: function(e) {
				this.frames = [];
				var t = e.map(function(e) {
					return e.slice()
				});
				e.forEach(function(e) {
					if (!Array.isArray(e)) throw new Error("Error.  Animation must be array of arrays. [[i,dur]..]")
				}), this.frames = t
			}
		}, {
			key: "tick",
			value: function(e, t) {
				for (; e >= this.nextRenderTime && this.frames.length > 0;) {
					var n = this.frames.shift();
					this.currentFrameIndex = n[0], this.nextRenderTime = this.nextRenderTime + n[1] / t
				}
				return e >= this.nextRenderTime && 0 == this.frames.length
			}
		}]), e
	}()
}, function(e, t, n) {
	"use strict";

	function r(e) {
		return e && e.__esModule ? e : {
			default: e
		}
	}

	function i(e) {
		if (Array.isArray(e)) {
			for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
			return n
		}
		return Array.from(e)
	}

	function a(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}

	function s(e, t) {
		if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !t || "object" != typeof t && "function" != typeof t ? e : t
	}

	function o(e, t) {
		if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, {
			constructor: {
				value: e,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
	}
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var u = function() {
			function e(e, t) {
				for (var n = 0; n < t.length; n++) {
					var r = t[n];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
				}
			}
			return function(t, n, r) {
				return n && e(t.prototype, n), r && e(t, r), t
			}
		}(),
		l = n(5),
		h = r(l),
		f = n(3),
		c = function(e) {
			function t(e, n, r) {
				a(this, t);
				var i = s(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return i.playbackRate = 1, i._currentFrameNumber = 0, i._ended = !1, i._paused = !0, i._numPlays = 0, i._defaultFrameLength = 40, i._is_talkr_file = !1, i._last_lipsync_frame_index = 0, i._startIndex = 0, i._anims = [], i._apng = e, i.context = n, !i._apng.isTalkrFile || i._apng.frames.length < 30 ? (i.createFullFrames(), i._last_lipsync_frame_index = i._apng.frames.length - 1) : (i._last_lipsync_frame_index = 22, i._startIndex = 1), i.stop(), r && i.play(), i
			}
			return o(t, e), u(t, [{
				key: "renderNextFrame",
				value: function() {
					this._currentFrameNumber = (this._currentFrameNumber + 1) % this._apng.frames.length, this._currentFrameNumber === this._apng.frames.length - 1 && (this._numPlays++, 0 !== this._apng.numPlays && this._numPlays >= this._apng.numPlays && (this.emit("end"), this._ended = !0, this._paused = !0)), this._prevFrame && 1 == this._prevFrame.disposeOp ? this.context.clearRect(this._prevFrame.left, this._prevFrame.top, this._prevFrame.width, this._prevFrame.height) : this._prevFrame && 2 == this._prevFrame.disposeOp && this.context.putImageData(this._prevFrameData, this._prevFrame.left, this._prevFrame.top);
					var e = this.currentFrame;
					this._prevFrame = e, this._prevFrameData = null, 2 == e.disposeOp && (this._prevFrameData = this.context.getImageData(e.left, e.top, e.width, e.height)), 0 == e.blendOp && this.context.clearRect(e.left, e.top, e.width, e.height), this.context.drawImage(e.imageElement, e.left, e.top)
				}
			}, {
				key: "play",
				value: function() {
					var e = this;
					this.emit("play"), this._ended && this.stop(), this._paused = !1;
					var t = performance.now() + this.currentFrame.delay / this.playbackRate,
						n = function n(r) {
							if (!e._ended && !e._paused) {
								if (r >= t) {
									for (; r - t >= e._apng.playTime / e.playbackRate;) t += e._apng.playTime / e.playbackRate, e._numPlays++;
									do e.renderNextFrame(), t += e.currentFrame.delay / e.playbackRate; while (!e._ended && r > t)
								}
								requestAnimationFrame(n)
							}
						};
					requestAnimationFrame(n)
				}
			}, {
				key: "pause",
				value: function() {
					this._paused || (this.emit("pause"), this._paused = !0)
				}
			}, {
				key: "createFullFrames",
				value: function() {
					this._fullFrameData = [], this._currentFrameNumber = -1, this.context.clearRect(0, 0, this._apng.width, this._apng.height);
					for (var e = 0; e < this._apng.frames.length; ++e) this.renderNextFrame(), this._apng.frames[e], this._fullFrameData.push(this.context.getImageData(0, 0, this._apng.width, this._apng.height))
				}
			}, {
				key: "renderFullFrame",
				value: function(e) {
					e %= this._apng.frames.length, e >= 0 && this.context.putImageData(this._fullFrameData[e], 0, 0)
				}
			}, {
				key: "addAnimToPlay",
				value: function(e) {
					if (e && 0 != e.length) {
						var t = new f.FrameAnim;
						t.fromFrames(e), this._anims.push(t)
					}
				}
			}, {
				key: "play_anims",
				value: function() {
					var e = this;
					!this._ended, this._ended = !1, this._paused = !1, this._anims.forEach(function(t) {
						if (t.frames.length > 0) {
							var n = t.frames[0];
							t.nextRenderTime = performance.now() + n[1] / e.playbackRate, t.currentFrameIndex = n[0]
						}
					});
					var t = function() {
							e.context.drawImage(e._apng.frames[0].imageElement, e._apng.frames[0].left, e._apng.frames[0].top), e._apng.isTalkrFile && e.context.drawImage(e._apng.frames[1].imageElement, e._apng.frames[1].left, e._apng.frames[1].top)
						},
						n = function n(r) {
							if (e._ended || e._paused || 0 == e._anims.length) return void t();
							var a = !1;
							e._anims.forEach(function(e) {
								r >= e.nextRenderTime && (a = !0)
							});
							var s = [];
							if (a) {
								for (var o = e._anims.length - 1; o >= 0; --o) {
									var u = e._anims[o].tick(r, e.playbackRate);
									u ? e._anims.splice(o, 1) : s.push(e._anims[o].currentFrameIndex)
								}
								s = [].concat(i(new Set(s))).sort(function(e, t) {
									return e - t
								}), e._apng.isTalkrFile ? (e.context.clearRect(0, 0, e._apng.width, e._apng.height), t(), s.forEach(function(t) {
									t > e._startIndex && e.context.drawImage(e._apng.frames[t].imageElement, e._apng.frames[t].left, e._apng.frames[t].top)
								})) : e.renderFullFrame(s[s.length - 1])
							}
							return 0 == e._anims.length ? (e.emit("end"), e._ended = !0, void(e._paused = !0)) : void requestAnimationFrame(n)
						};
					requestAnimationFrame(n)
				}
			}, {
				key: "create_blink_anim",
				value: function(e) {
					var t = Math.random();
					return t < .3 ? [] : t < .6 ? [
						[23, 50],
						[24, 50],
						[25, 50],
						[24, 50],
						[23, 50]
					] : [
						[1, t * e],
						[23, 50],
						[24, 50],
						[25, 50],
						[24, 50],
						[23, 50]
					]
				}
			}, {
				key: "create_brow_anim",
				value: function(e) {
					var t = Math.random();
					return t < .3 ? [] : t < .6 ? [
						[26, 50],
						[27, 50],
						[28, 50],
						[29, 100],
						[28, 80],
						[27, 80],
						[26, 80]
					] : e < 1e3 ? [
						[26, 50],
						[27, 50],
						[28, 50],
						[29, .9 * e],
						[28, 80],
						[27, 80],
						[26, 80]
					] : void 0
				}
			}, {
				key: "play_for_duration",
				value: function(e) {
					for (var t = this._defaultFrameLength / this.playbackRate, n = [], r = this._startIndex, i = !1, a = t, s = e - t; a <= s;) {
						r !== this._last_lipsync_frame_index && r !== this._startIndex || (i = r === this._last_lipsync_frame_index), !i && r > this._startIndex && a + r * t > s && (i = !0);
						var o = i ? -1 : 1;
						r += o, n.push([r, t]), a += t
					}
					r != this._startIndex && n.push([this._startIndex, t]), this._anims = [], this.addAnimToPlay(n), this._apng.isTalkrFile && (this.addAnimToPlay(this.create_blink_anim()), this.addAnimToPlay(this.create_brow_anim())), this.play_anims()
				}
			}, {
				key: "stop",
				value: function() {
					this.emit("stop"), this._numPlays = 0, this._ended = !1, this._paused = !0, this._currentFrameNumber = -1, this.context.clearRect(0, 0, this._apng.width, this._apng.height), this.renderNextFrame()
				}
			}, {
				key: "currentFrameNumber",
				get: function() {
					return this._currentFrameNumber
				}
			}, {
				key: "currentFrame",
				get: function() {
					return this._apng.frames[this._currentFrameNumber]
				}
			}, {
				key: "paused",
				get: function() {
					return this._paused
				}
			}, {
				key: "ended",
				get: function() {
					return this._ended
				}
			}]), t
		}(h.default);
	t.default = c
}, function(e, t) {
	function n() {
		this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
	}

	function r(e) {
		return "function" == typeof e
	}

	function i(e) {
		return "number" == typeof e
	}

	function a(e) {
		return "object" == typeof e && null !== e
	}

	function s(e) {
		return void 0 === e
	}
	e.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function(e) {
		if (!i(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
		return this._maxListeners = e, this
	}, n.prototype.emit = function(e) {
		var t, n, i, o, u, l;
		if (this._events || (this._events = {}), "error" === e && (!this._events.error || a(this._events.error) && !this._events.error.length)) {
			if (t = arguments[1], t instanceof Error) throw t;
			var h = new Error('Uncaught, unspecified "error" event. (' + t + ")");
			throw h.context = t, h
		}
		if (n = this._events[e], s(n)) return !1;
		if (r(n)) switch (arguments.length) {
			case 1:
				n.call(this);
				break;
			case 2:
				n.call(this, arguments[1]);
				break;
			case 3:
				n.call(this, arguments[1], arguments[2]);
				break;
			default:
				o = Array.prototype.slice.call(arguments, 1), n.apply(this, o)
		} else if (a(n))
			for (o = Array.prototype.slice.call(arguments, 1), l = n.slice(), i = l.length, u = 0; u < i; u++) l[u].apply(this, o);
		return !0
	}, n.prototype.addListener = function(e, t) {
		var i;
		if (!r(t)) throw TypeError("listener must be a function");
		return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, r(t.listener) ? t.listener : t), this._events[e] ? a(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, a(this._events[e]) && !this._events[e].warned && (i = s(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners, i && i > 0 && this._events[e].length > i && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())), this
	}, n.prototype.on = n.prototype.addListener, n.prototype.once = function(e, t) {
		function n() {
			this.removeListener(e, n), i || (i = !0, t.apply(this, arguments))
		}
		if (!r(t)) throw TypeError("listener must be a function");
		var i = !1;
		return n.listener = t, this.on(e, n), this
	}, n.prototype.removeListener = function(e, t) {
		var n, i, s, o;
		if (!r(t)) throw TypeError("listener must be a function");
		if (!this._events || !this._events[e]) return this;
		if (n = this._events[e], s = n.length, i = -1, n === t || r(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
		else if (a(n)) {
			for (o = s; o-- > 0;)
				if (n[o] === t || n[o].listener && n[o].listener === t) {
					i = o;
					break
				} if (i < 0) return this;
			1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(i, 1), this._events.removeListener && this.emit("removeListener", e, t)
		}
		return this
	}, n.prototype.removeAllListeners = function(e) {
		var t, n;
		if (!this._events) return this;
		if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
		if (0 === arguments.length) {
			for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
			return this.removeAllListeners("removeListener"), this._events = {}, this
		}
		if (n = this._events[e], r(n)) this.removeListener(e, n);
		else if (n)
			for (; n.length;) this.removeListener(e, n[n.length - 1]);
		return delete this._events[e], this
	}, n.prototype.listeners = function(e) {
		var t;
		return t = this._events && this._events[e] ? r(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
	}, n.prototype.listenerCount = function(e) {
		if (this._events) {
			var t = this._events[e];
			if (r(t)) return 1;
			if (t) return t.length
		}
		return 0
	}, n.listenerCount = function(e, t) {
		return e.listenerCount(t)
	}
}, function(e, t, n) {
	var r = n(7);
	"string" == typeof r && (r = [
		[e.id, r, ""]
	]), n(9)(r, {}), r.locals && (e.exports = r.locals)
}, function(e, t, n) {
	t = e.exports = n(8)(), t.push([e.id, ".apng-frames,.apng-info{max-height:600px;overflow:auto}.apng-frames>div{float:left;margin:1px 1px 8px 8px;box-shadow:0 0 0 1px;position:relative;background:linear-gradient(45deg,#fff 25%,transparent 26%,transparent 75%,#fff 76%),linear-gradient(-45deg,#fff 25%,transparent 26%,transparent 75%,#fff 76%);background-color:#eee;background-size:20px 20px}.apng-frames>div>img{position:absolute;box-shadow:0 0 0 1px rgba(255,0,0,.75)}#playback-rate{width:12em;display:inline-block}", ""])
}, function(e, t) {
	e.exports = function() {
		var e = [];
		return e.toString = function() {
			for (var e = [], t = 0; t < this.length; t++) {
				var n = this[t];
				n[2] ? e.push("@media " + n[2] + "{" + n[1] + "}") : e.push(n[1])
			}
			return e.join("")
		}, e.i = function(t, n) {
			"string" == typeof t && (t = [
				[null, t, ""]
			]);
			for (var r = {}, i = 0; i < this.length; i++) {
				var a = this[i][0];
				"number" == typeof a && (r[a] = !0)
			}
			for (i = 0; i < t.length; i++) {
				var s = t[i];
				"number" == typeof s[0] && r[s[0]] || (n && !s[2] ? s[2] = n : n && (s[2] = "(" + s[2] + ") and (" + n + ")"), e.push(s))
			}
		}, e
	}
}, function(e, t, n) {
	function r(e, t) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n],
				i = p[r.id];
			if (i) {
				i.refs++;
				for (var a = 0; a < i.parts.length; a++) i.parts[a](r.parts[a]);
				for (; a < r.parts.length; a++) i.parts.push(l(r.parts[a], t))
			} else {
				for (var s = [], a = 0; a < r.parts.length; a++) s.push(l(r.parts[a], t));
				p[r.id] = {
					id: r.id,
					refs: 1,
					parts: s
				}
			}
		}
	}

	function i(e) {
		for (var t = [], n = {}, r = 0; r < e.length; r++) {
			var i = e[r],
				a = i[0],
				s = i[1],
				o = i[2],
				u = i[3],
				l = {
					css: s,
					media: o,
					sourceMap: u
				};
			n[a] ? n[a].parts.push(l) : t.push(n[a] = {
				id: a,
				parts: [l]
			})
		}
		return t
	}

	function a(e, t) {
		var n = v(),
			r = y[y.length - 1];
		if ("top" === e.insertAt) r ? r.nextSibling ? n.insertBefore(t, r.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), y.push(t);
		else {
			if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
			n.appendChild(t)
		}
	}

	function s(e) {
		e.parentNode.removeChild(e);
		var t = y.indexOf(e);
		t >= 0 && y.splice(t, 1)
	}

	function o(e) {
		var t = document.createElement("style");
		return t.type = "text/css", a(e, t), t
	}

	function u(e) {
		var t = document.createElement("link");
		return t.rel = "stylesheet", a(e, t), t
	}

	function l(e, t) {
		var n, r, i;
		if (t.singleton) {
			var a = g++;
			n = _ || (_ = o(t)), r = h.bind(null, n, a, !1), i = h.bind(null, n, a, !0)
		} else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = u(t), r = c.bind(null, n), i = function() {
			s(n), n.href && URL.revokeObjectURL(n.href)
		}) : (n = o(t), r = f.bind(null, n), i = function() {
			s(n)
		});
		return r(e),
			function(t) {
				if (t) {
					if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
					r(e = t)
				} else i()
			}
	}

	function h(e, t, n, r) {
		var i = n ? "" : r.css;
		if (e.styleSheet) e.styleSheet.cssText = b(t, i);
		else {
			var a = document.createTextNode(i),
				s = e.childNodes;
			s[t] && e.removeChild(s[t]), s.length ? e.insertBefore(a, s[t]) : e.appendChild(a)
		}
	}

	function f(e, t) {
		var n = t.css,
			r = t.media;
		if (r && e.setAttribute("media", r), e.styleSheet) e.styleSheet.cssText = n;
		else {
			for (; e.firstChild;) e.removeChild(e.firstChild);
			e.appendChild(document.createTextNode(n))
		}
	}

	function c(e, t) {
		var n = t.css,
			r = t.sourceMap;
		r && (n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
		var i = new Blob([n], {
				type: "text/css"
			}),
			a = e.href;
		e.href = URL.createObjectURL(i), a && URL.revokeObjectURL(a)
	}
	var p = {},
		d = function(e) {
			var t;
			return function() {
				return "undefined" == typeof t && (t = e.apply(this, arguments)), t
			}
		},
		m = d(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())
		}),
		v = d(function() {
			return document.head || document.getElementsByTagName("head")[0]
		}),
		_ = null,
		g = 0,
		y = [];
	e.exports = function(e, t) {
		t = t || {}, "undefined" == typeof t.singleton && (t.singleton = m()), "undefined" == typeof t.insertAt && (t.insertAt = "bottom");
		var n = i(e);
		return r(n, t),
			function(e) {
				for (var a = [], s = 0; s < n.length; s++) {
					var o = n[s],
						u = p[o.id];
					u.refs--, a.push(u)
				}
				if (e) {
					var l = i(e);
					r(l, t)
				}
				for (var s = 0; s < a.length; s++) {
					var u = a[s];
					if (0 === u.refs) {
						for (var h = 0; h < u.parts.length; h++) u.parts[h]();
						delete p[u.id]
					}
				}
			}
	};
	var b = function() {
		var e = [];
		return function(t, n) {
			return e[t] = n, e.filter(Boolean).join("\n")
		}
	}()
}]);
