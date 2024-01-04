/** @format */

var Bf = Object.defineProperty,
  Hf = Object.defineProperties;
var zf = Object.getOwnPropertyDescriptors;
var Qn = Object.getOwnPropertySymbols;
var Ua = Object.prototype.hasOwnProperty,
  Ba = Object.prototype.propertyIsEnumerable;
var $a = (e, t, n) => (t in e ? Bf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n)),
  g = (e, t) => {
    for (var n in (t ||= {})) Ua.call(t, n) && $a(e, n, t[n]);
    if (Qn) for (var n of Qn(t)) Ba.call(t, n) && $a(e, n, t[n]);
    return e;
  },
  V = (e, t) => Hf(e, zf(t));
var Ha = (e, t) => {
  var n = {};
  for (var r in e) Ua.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && Qn) for (var r of Qn(e)) t.indexOf(r) < 0 && Ba.call(e, r) && (n[r] = e[r]);
  return n;
};
var za = null;
var Uo = 1;
function te(e) {
  let t = za;
  return (za = e), t;
}
var Wa = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function Wf(e) {
  if (!(zo(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === Uo)) {
    if (!e.producerMustRecompute(e) && !Bo(e)) {
      (e.dirty = !1), (e.lastCleanEpoch = Uo);
      return;
    }
    e.producerRecomputeValue(e), (e.dirty = !1), (e.lastCleanEpoch = Uo);
  }
}
function Ga(e) {
  return e && (e.nextProducerIndex = 0), te(e);
}
function qa(e, t) {
  if (
    (te(t),
    !(!e || e.producerNode === void 0 || e.producerIndexOfThis === void 0 || e.producerLastReadVersion === void 0))
  ) {
    if (zo(e))
      for (let n = e.nextProducerIndex; n < e.producerNode.length; n++) Ho(e.producerNode[n], e.producerIndexOfThis[n]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop();
  }
}
function Bo(e) {
  Kn(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    let n = e.producerNode[t],
      r = e.producerLastReadVersion[t];
    if (r !== n.version || (Wf(n), r !== n.version)) return !0;
  }
  return !1;
}
function Za(e) {
  if ((Kn(e), zo(e))) for (let t = 0; t < e.producerNode.length; t++) Ho(e.producerNode[t], e.producerIndexOfThis[t]);
  (e.producerNode.length = e.producerLastReadVersion.length = e.producerIndexOfThis.length = 0),
    e.liveConsumerNode && (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
}
function Ho(e, t) {
  if ((Gf(e), Kn(e), e.liveConsumerNode.length === 1))
    for (let r = 0; r < e.producerNode.length; r++) Ho(e.producerNode[r], e.producerIndexOfThis[r]);
  let n = e.liveConsumerNode.length - 1;
  if (
    ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
    (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
    e.liveConsumerNode.length--,
    e.liveConsumerIndexOfThis.length--,
    t < e.liveConsumerNode.length)
  ) {
    let r = e.liveConsumerIndexOfThis[t],
      o = e.liveConsumerNode[t];
    Kn(o), (o.producerIndexOfThis[r] = t);
  }
}
function zo(e) {
  return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
}
function Kn(e) {
  (e.producerNode ??= []), (e.producerIndexOfThis ??= []), (e.producerLastReadVersion ??= []);
}
function Gf(e) {
  (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
}
function qf() {
  throw new Error();
}
var Zf = qf;
function Ya(e) {
  Zf = e;
}
function w(e) {
  return typeof e == 'function';
}
function yt(e) {
  let n = e(r => {
    Error.call(r), (r.stack = new Error().stack);
  });
  return (n.prototype = Object.create(Error.prototype)), (n.prototype.constructor = n), n;
}
var Jn = yt(
  e =>
    function (n) {
      e(this),
        (this.message = n
          ? `${n.length} errors occurred during unsubscription:
${n.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}`
          : ''),
        (this.name = 'UnsubscriptionError'),
        (this.errors = n);
    }
);
function Xt(e, t) {
  if (e) {
    let n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var z = class e {
  constructor(t) {
    (this.initialTeardown = t), (this.closed = !1), (this._parentage = null), (this._finalizers = null);
  }
  unsubscribe() {
    let t;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: n } = this;
      if (n)
        if (((this._parentage = null), Array.isArray(n))) for (let i of n) i.remove(this);
        else n.remove(this);
      let { initialTeardown: r } = this;
      if (w(r))
        try {
          r();
        } catch (i) {
          t = i instanceof Jn ? i.errors : [i];
        }
      let { _finalizers: o } = this;
      if (o) {
        this._finalizers = null;
        for (let i of o)
          try {
            Qa(i);
          } catch (s) {
            (t = t ?? []), s instanceof Jn ? (t = [...t, ...s.errors]) : t.push(s);
          }
      }
      if (t) throw new Jn(t);
    }
  }
  add(t) {
    var n;
    if (t && t !== this)
      if (this.closed) Qa(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this)) return;
          t._addParent(this);
        }
        (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }
  _hasParent(t) {
    let { _parentage: n } = this;
    return n === t || (Array.isArray(n) && n.includes(t));
  }
  _addParent(t) {
    let { _parentage: n } = this;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }
  _removeParent(t) {
    let { _parentage: n } = this;
    n === t ? (this._parentage = null) : Array.isArray(n) && Xt(n, t);
  }
  remove(t) {
    let { _finalizers: n } = this;
    n && Xt(n, t), t instanceof e && t._removeParent(this);
  }
};
z.EMPTY = (() => {
  let e = new z();
  return (e.closed = !0), e;
})();
var Wo = z.EMPTY;
function Xn(e) {
  return e instanceof z || (e && 'closed' in e && w(e.remove) && w(e.add) && w(e.unsubscribe));
}
function Qa(e) {
  w(e) ? e() : e.unsubscribe();
}
var me = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var Dt = {
  setTimeout(e, t, ...n) {
    let { delegate: r } = Dt;
    return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
  },
  clearTimeout(e) {
    let { delegate: t } = Dt;
    return (t?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0,
};
function er(e) {
  Dt.setTimeout(() => {
    let { onUnhandledError: t } = me;
    if (t) t(e);
    else throw e;
  });
}
function en() {}
var Ka = (() => Go('C', void 0, void 0))();
function Ja(e) {
  return Go('E', void 0, e);
}
function Xa(e) {
  return Go('N', e, void 0);
}
function Go(e, t, n) {
  return { kind: e, value: t, error: n };
}
var et = null;
function wt(e) {
  if (me.useDeprecatedSynchronousErrorHandling) {
    let t = !et;
    if ((t && (et = { errorThrown: !1, error: null }), e(), t)) {
      let { errorThrown: n, error: r } = et;
      if (((et = null), n)) throw r;
    }
  } else e();
}
function eu(e) {
  me.useDeprecatedSynchronousErrorHandling && et && ((et.errorThrown = !0), (et.error = e));
}
var tt = class extends z {
    constructor(t) {
      super(), (this.isStopped = !1), t ? ((this.destination = t), Xn(t) && t.add(this)) : (this.destination = Kf);
    }
    static create(t, n, r) {
      return new Ae(t, n, r);
    }
    next(t) {
      this.isStopped ? Zo(Xa(t), this) : this._next(t);
    }
    error(t) {
      this.isStopped ? Zo(Ja(t), this) : ((this.isStopped = !0), this._error(t));
    }
    complete() {
      this.isStopped ? Zo(Ka, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(t) {
      this.destination.next(t);
    }
    _error(t) {
      try {
        this.destination.error(t);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  Yf = Function.prototype.bind;
function qo(e, t) {
  return Yf.call(e, t);
}
var Yo = class {
    constructor(t) {
      this.partialObserver = t;
    }
    next(t) {
      let { partialObserver: n } = this;
      if (n.next)
        try {
          n.next(t);
        } catch (r) {
          tr(r);
        }
    }
    error(t) {
      let { partialObserver: n } = this;
      if (n.error)
        try {
          n.error(t);
        } catch (r) {
          tr(r);
        }
      else tr(t);
    }
    complete() {
      let { partialObserver: t } = this;
      if (t.complete)
        try {
          t.complete();
        } catch (n) {
          tr(n);
        }
    }
  },
  Ae = class extends tt {
    constructor(t, n, r) {
      super();
      let o;
      if (w(t) || !t) o = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 };
      else {
        let i;
        this && me.useDeprecatedNextContext
          ? ((i = Object.create(t)),
            (i.unsubscribe = () => this.unsubscribe()),
            (o = {
              next: t.next && qo(t.next, i),
              error: t.error && qo(t.error, i),
              complete: t.complete && qo(t.complete, i),
            }))
          : (o = t);
      }
      this.destination = new Yo(o);
    }
  };
function tr(e) {
  me.useDeprecatedSynchronousErrorHandling ? eu(e) : er(e);
}
function Qf(e) {
  throw e;
}
function Zo(e, t) {
  let { onStoppedNotification: n } = me;
  n && Dt.setTimeout(() => n(e, t));
}
var Kf = { closed: !0, next: en, error: Qf, complete: en };
var Ct = (() => (typeof Symbol == 'function' && Symbol.observable) || '@@observable')();
function G(e) {
  return e;
}
function Qo(...e) {
  return Ko(e);
}
function Ko(e) {
  return e.length === 0
    ? G
    : e.length === 1
      ? e[0]
      : function (n) {
          return e.reduce((r, o) => o(r), n);
        };
}
var N = (() => {
  class e {
    constructor(n) {
      n && (this._subscribe = n);
    }
    lift(n) {
      let r = new e();
      return (r.source = this), (r.operator = n), r;
    }
    subscribe(n, r, o) {
      let i = Xf(n) ? n : new Ae(n, r, o);
      return (
        wt(() => {
          let { operator: s, source: a } = this;
          i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i));
        }),
        i
      );
    }
    _trySubscribe(n) {
      try {
        return this._subscribe(n);
      } catch (r) {
        n.error(r);
      }
    }
    forEach(n, r) {
      return (
        (r = tu(r)),
        new r((o, i) => {
          let s = new Ae({
            next: a => {
              try {
                n(a);
              } catch (u) {
                i(u), s.unsubscribe();
              }
            },
            error: i,
            complete: o,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(n) {
      var r;
      return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n);
    }
    [Ct]() {
      return this;
    }
    pipe(...n) {
      return Ko(n)(this);
    }
    toPromise(n) {
      return (
        (n = tu(n)),
        new n((r, o) => {
          let i;
          this.subscribe(
            s => (i = s),
            s => o(s),
            () => r(i)
          );
        })
      );
    }
  }
  return (e.create = t => new e(t)), e;
})();
function tu(e) {
  var t;
  return (t = e ?? me.Promise) !== null && t !== void 0 ? t : Promise;
}
function Jf(e) {
  return e && w(e.next) && w(e.error) && w(e.complete);
}
function Xf(e) {
  return (e && e instanceof tt) || (Jf(e) && Xn(e));
}
function Jo(e) {
  return w(e?.lift);
}
function b(e) {
  return t => {
    if (Jo(t))
      return t.lift(function (n) {
        try {
          return e(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError('Unable to lift unknown Observable type');
  };
}
function T(e, t, n, r, o) {
  return new Xo(e, t, n, r, o);
}
var Xo = class extends tt {
  constructor(t, n, r, o, i, s) {
    super(t),
      (this.onFinalize = i),
      (this.shouldUnsubscribe = s),
      (this._next = n
        ? function (a) {
            try {
              n(a);
            } catch (u) {
              t.error(u);
            }
          }
        : super._next),
      (this._error = o
        ? function (a) {
            try {
              o(a);
            } catch (u) {
              t.error(u);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = r
        ? function () {
            try {
              r();
            } catch (a) {
              t.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: n } = this;
      super.unsubscribe(), !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    }
  }
};
function Et() {
  return b((e, t) => {
    let n = null;
    e._refCount++;
    let r = T(t, void 0, void 0, void 0, () => {
      if (!e || e._refCount <= 0 || 0 < --e._refCount) {
        n = null;
        return;
      }
      let o = e._connection,
        i = n;
      (n = null), o && (!i || o === i) && o.unsubscribe(), t.unsubscribe();
    });
    e.subscribe(r), r.closed || (n = e.connect());
  });
}
var It = class extends N {
  constructor(t, n) {
    super(),
      (this.source = t),
      (this.subjectFactory = n),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      Jo(t) && (this.lift = t.lift);
  }
  _subscribe(t) {
    return this.getSubject().subscribe(t);
  }
  getSubject() {
    let t = this._subject;
    return (!t || t.isStopped) && (this._subject = this.subjectFactory()), this._subject;
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: t } = this;
    (this._subject = this._connection = null), t?.unsubscribe();
  }
  connect() {
    let t = this._connection;
    if (!t) {
      t = this._connection = new z();
      let n = this.getSubject();
      t.add(
        this.source.subscribe(
          T(
            n,
            void 0,
            () => {
              this._teardown(), n.complete();
            },
            r => {
              this._teardown(), n.error(r);
            },
            () => this._teardown()
          )
        )
      ),
        t.closed && ((this._connection = null), (t = z.EMPTY));
    }
    return t;
  }
  refCount() {
    return Et()(this);
  }
};
var nu = yt(
  e =>
    function () {
      e(this), (this.name = 'ObjectUnsubscribedError'), (this.message = 'object unsubscribed');
    }
);
var q = (() => {
    class e extends N {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(n) {
        let r = new nr(this, this);
        return (r.operator = n), r;
      }
      _throwIfClosed() {
        if (this.closed) throw new nu();
      }
      next(n) {
        wt(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers || (this.currentObservers = Array.from(this.observers));
            for (let r of this.currentObservers) r.next(n);
          }
        });
      }
      error(n) {
        wt(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = n);
            let { observers: r } = this;
            for (; r.length; ) r.shift().error(n);
          }
        });
      }
      complete() {
        wt(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: n } = this;
            for (; n.length; ) n.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null);
      }
      get observed() {
        var n;
        return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0;
      }
      _trySubscribe(n) {
        return this._throwIfClosed(), super._trySubscribe(n);
      }
      _subscribe(n) {
        return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
      }
      _innerSubscribe(n) {
        let { hasError: r, isStopped: o, observers: i } = this;
        return r || o
          ? Wo
          : ((this.currentObservers = null),
            i.push(n),
            new z(() => {
              (this.currentObservers = null), Xt(i, n);
            }));
      }
      _checkFinalizedStatuses(n) {
        let { hasError: r, thrownError: o, isStopped: i } = this;
        r ? n.error(o) : i && n.complete();
      }
      asObservable() {
        let n = new N();
        return (n.source = this), n;
      }
    }
    return (e.create = (t, n) => new nr(t, n)), e;
  })(),
  nr = class extends q {
    constructor(t, n) {
      super(), (this.destination = t), (this.source = n);
    }
    next(t) {
      var n, r;
      (r = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || r === void 0 || r.call(n, t);
    }
    error(t) {
      var n, r;
      (r = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || r === void 0 || r.call(n, t);
    }
    complete() {
      var t, n;
      (n = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null || n === void 0 || n.call(t);
    }
    _subscribe(t) {
      var n, r;
      return (r = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t)) !== null && r !== void 0
        ? r
        : Wo;
    }
  };
var W = class extends q {
  constructor(t) {
    super(), (this._value = t);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(t) {
    let n = super._subscribe(t);
    return !n.closed && t.next(this._value), n;
  }
  getValue() {
    let { hasError: t, thrownError: n, _value: r } = this;
    if (t) throw n;
    return this._throwIfClosed(), r;
  }
  next(t) {
    super.next((this._value = t));
  }
};
var Q = new N(e => e.complete());
function ru(e) {
  return e && w(e.schedule);
}
function ei(e) {
  return e[e.length - 1];
}
function ou(e) {
  return w(ei(e)) ? e.pop() : void 0;
}
function Ie(e) {
  return ru(ei(e)) ? e.pop() : void 0;
}
function iu(e, t) {
  return typeof ei(e) == 'number' ? e.pop() : t;
}
function au(e, t, n, r) {
  function o(i) {
    return i instanceof n
      ? i
      : new n(function (s) {
          s(i);
        });
  }
  return new (n || (n = Promise))(function (i, s) {
    function a(l) {
      try {
        c(r.next(l));
      } catch (d) {
        s(d);
      }
    }
    function u(l) {
      try {
        c(r.throw(l));
      } catch (d) {
        s(d);
      }
    }
    function c(l) {
      l.done ? i(l.value) : o(l.value).then(a, u);
    }
    c((r = r.apply(e, t || [])).next());
  });
}
function su(e) {
  var t = typeof Symbol == 'function' && Symbol.iterator,
    n = t && e[t],
    r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == 'number')
    return {
      next: function () {
        return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
      },
    };
  throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
}
function nt(e) {
  return this instanceof nt ? ((this.v = e), this) : new nt(e);
}
function uu(e, t, n) {
  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
  var r = n.apply(e, t || []),
    o,
    i = [];
  return (
    (o = {}),
    s('next'),
    s('throw'),
    s('return'),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function s(f) {
    r[f] &&
      (o[f] = function (h) {
        return new Promise(function (v, S) {
          i.push([f, h, v, S]) > 1 || a(f, h);
        });
      });
  }
  function a(f, h) {
    try {
      u(r[f](h));
    } catch (v) {
      d(i[0][3], v);
    }
  }
  function u(f) {
    f.value instanceof nt ? Promise.resolve(f.value.v).then(c, l) : d(i[0][2], f);
  }
  function c(f) {
    a('next', f);
  }
  function l(f) {
    a('throw', f);
  }
  function d(f, h) {
    f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
  }
}
function cu(e) {
  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof su == 'function' ? su(e) : e[Symbol.iterator]()),
      (n = {}),
      r('next'),
      r('throw'),
      r('return'),
      (n[Symbol.asyncIterator] = function () {
        return this;
      }),
      n);
  function r(i) {
    n[i] =
      e[i] &&
      function (s) {
        return new Promise(function (a, u) {
          (s = e[i](s)), o(a, u, s.done, s.value);
        });
      };
  }
  function o(i, s, a, u) {
    Promise.resolve(u).then(function (c) {
      i({ value: c, done: a });
    }, s);
  }
}
var rr = e => e && typeof e.length == 'number' && typeof e != 'function';
function or(e) {
  return w(e?.then);
}
function ir(e) {
  return w(e[Ct]);
}
function sr(e) {
  return Symbol.asyncIterator && w(e?.[Symbol.asyncIterator]);
}
function ar(e) {
  return new TypeError(
    `You provided ${
      e !== null && typeof e == 'object' ? 'an invalid object' : `'${e}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function eh() {
  return typeof Symbol != 'function' || !Symbol.iterator ? '@@iterator' : Symbol.iterator;
}
var ur = eh();
function cr(e) {
  return w(e?.[ur]);
}
function lr(e) {
  return uu(this, arguments, function* () {
    let n = e.getReader();
    try {
      for (;;) {
        let { value: r, done: o } = yield nt(n.read());
        if (o) return yield nt(void 0);
        yield yield nt(r);
      }
    } finally {
      n.releaseLock();
    }
  });
}
function dr(e) {
  return w(e?.getReader);
}
function k(e) {
  if (e instanceof N) return e;
  if (e != null) {
    if (ir(e)) return th(e);
    if (rr(e)) return nh(e);
    if (or(e)) return rh(e);
    if (sr(e)) return lu(e);
    if (cr(e)) return oh(e);
    if (dr(e)) return ih(e);
  }
  throw ar(e);
}
function th(e) {
  return new N(t => {
    let n = e[Ct]();
    if (w(n.subscribe)) return n.subscribe(t);
    throw new TypeError('Provided object does not correctly implement Symbol.observable');
  });
}
function nh(e) {
  return new N(t => {
    for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function rh(e) {
  return new N(t => {
    e.then(
      n => {
        t.closed || (t.next(n), t.complete());
      },
      n => t.error(n)
    ).then(null, er);
  });
}
function oh(e) {
  return new N(t => {
    for (let n of e) if ((t.next(n), t.closed)) return;
    t.complete();
  });
}
function lu(e) {
  return new N(t => {
    sh(e, t).catch(n => t.error(n));
  });
}
function ih(e) {
  return lu(lr(e));
}
function sh(e, t) {
  var n, r, o, i;
  return au(this, void 0, void 0, function* () {
    try {
      for (n = cu(e); (r = yield n.next()), !r.done; ) {
        let s = r.value;
        if ((t.next(s), t.closed)) return;
      }
    } catch (s) {
      o = { error: s };
    } finally {
      try {
        r && !r.done && (i = n.return) && (yield i.call(n));
      } finally {
        if (o) throw o.error;
      }
    }
    t.complete();
  });
}
function K(e, t, n, r = 0, o = !1) {
  let i = t.schedule(function () {
    n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((e.add(i), !o)) return i;
}
function fr(e, t = 0) {
  return b((n, r) => {
    n.subscribe(
      T(
        r,
        o => K(r, e, () => r.next(o), t),
        () => K(r, e, () => r.complete(), t),
        o => K(r, e, () => r.error(o), t)
      )
    );
  });
}
function hr(e, t = 0) {
  return b((n, r) => {
    r.add(e.schedule(() => n.subscribe(r), t));
  });
}
function du(e, t) {
  return k(e).pipe(hr(t), fr(t));
}
function fu(e, t) {
  return k(e).pipe(hr(t), fr(t));
}
function hu(e, t) {
  return new N(n => {
    let r = 0;
    return t.schedule(function () {
      r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function pu(e, t) {
  return new N(n => {
    let r;
    return (
      K(n, t, () => {
        (r = e[ur]()),
          K(
            n,
            t,
            () => {
              let o, i;
              try {
                ({ value: o, done: i } = r.next());
              } catch (s) {
                n.error(s);
                return;
              }
              i ? n.complete() : n.next(o);
            },
            0,
            !0
          );
      }),
      () => w(r?.return) && r.return()
    );
  });
}
function pr(e, t) {
  if (!e) throw new Error('Iterable cannot be null');
  return new N(n => {
    K(n, t, () => {
      let r = e[Symbol.asyncIterator]();
      K(
        n,
        t,
        () => {
          r.next().then(o => {
            o.done ? n.complete() : n.next(o.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function gu(e, t) {
  return pr(lr(e), t);
}
function mu(e, t) {
  if (e != null) {
    if (ir(e)) return du(e, t);
    if (rr(e)) return hu(e, t);
    if (or(e)) return fu(e, t);
    if (sr(e)) return pr(e, t);
    if (cr(e)) return pu(e, t);
    if (dr(e)) return gu(e, t);
  }
  throw ar(e);
}
function L(e, t) {
  return t ? mu(e, t) : k(e);
}
function m(...e) {
  let t = Ie(e);
  return L(e, t);
}
function bt(e, t) {
  let n = w(e) ? e : () => e,
    r = o => o.error(n());
  return new N(t ? o => t.schedule(r, 0, o) : r);
}
function ti(e) {
  return !!e && (e instanceof N || (w(e.lift) && w(e.subscribe)));
}
var Ne = yt(
  e =>
    function () {
      e(this), (this.name = 'EmptyError'), (this.message = 'no elements in sequence');
    }
);
function R(e, t) {
  return b((n, r) => {
    let o = 0;
    n.subscribe(
      T(r, i => {
        r.next(e.call(t, i, o++));
      })
    );
  });
}
var { isArray: ah } = Array;
function uh(e, t) {
  return ah(t) ? e(...t) : e(t);
}
function vu(e) {
  return R(t => uh(e, t));
}
var { isArray: ch } = Array,
  { getPrototypeOf: lh, prototype: dh, keys: fh } = Object;
function yu(e) {
  if (e.length === 1) {
    let t = e[0];
    if (ch(t)) return { args: t, keys: null };
    if (hh(t)) {
      let n = fh(t);
      return { args: n.map(r => t[r]), keys: n };
    }
  }
  return { args: e, keys: null };
}
function hh(e) {
  return e && typeof e == 'object' && lh(e) === dh;
}
function Du(e, t) {
  return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
}
function gr(...e) {
  let t = Ie(e),
    n = ou(e),
    { args: r, keys: o } = yu(e);
  if (r.length === 0) return L([], t);
  let i = new N(ph(r, t, o ? s => Du(o, s) : G));
  return n ? i.pipe(vu(n)) : i;
}
function ph(e, t, n = G) {
  return r => {
    wu(
      t,
      () => {
        let { length: o } = e,
          i = new Array(o),
          s = o,
          a = o;
        for (let u = 0; u < o; u++)
          wu(
            t,
            () => {
              let c = L(e[u], t),
                l = !1;
              c.subscribe(
                T(
                  r,
                  d => {
                    (i[u] = d), l || ((l = !0), a--), a || r.next(n(i.slice()));
                  },
                  () => {
                    --s || r.complete();
                  }
                )
              );
            },
            r
          );
      },
      r
    );
  };
}
function wu(e, t, n) {
  e ? K(n, e, t) : t();
}
function Cu(e, t, n, r, o, i, s, a) {
  let u = [],
    c = 0,
    l = 0,
    d = !1,
    f = () => {
      d && !u.length && !c && t.complete();
    },
    h = S => (c < r ? v(S) : u.push(S)),
    v = S => {
      i && t.next(S), c++;
      let Y = !1;
      k(n(S, l++)).subscribe(
        T(
          t,
          P => {
            o?.(P), i ? h(P) : t.next(P);
          },
          () => {
            Y = !0;
          },
          void 0,
          () => {
            if (Y)
              try {
                for (c--; u.length && c < r; ) {
                  let P = u.shift();
                  s ? K(t, s, () => v(P)) : v(P);
                }
                f();
              } catch (P) {
                t.error(P);
              }
          }
        )
      );
    };
  return (
    e.subscribe(
      T(t, h, () => {
        (d = !0), f();
      })
    ),
    () => {
      a?.();
    }
  );
}
function B(e, t, n = 1 / 0) {
  return w(t)
    ? B((r, o) => R((i, s) => t(r, i, o, s))(k(e(r, o))), n)
    : (typeof t == 'number' && (n = t), b((r, o) => Cu(r, o, e, n)));
}
function tn(e = 1 / 0) {
  return B(G, e);
}
function Eu() {
  return tn(1);
}
function Mt(...e) {
  return Eu()(L(e, Ie(e)));
}
function mr(e) {
  return new N(t => {
    k(e()).subscribe(t);
  });
}
function ni(...e) {
  let t = Ie(e),
    n = iu(e, 1 / 0),
    r = e;
  return r.length ? (r.length === 1 ? k(r[0]) : tn(n)(L(r, t))) : Q;
}
function le(e, t) {
  return b((n, r) => {
    let o = 0;
    n.subscribe(T(r, i => e.call(t, i, o++) && r.next(i)));
  });
}
function Ve(e) {
  return b((t, n) => {
    let r = null,
      o = !1,
      i;
    (r = t.subscribe(
      T(n, void 0, void 0, s => {
        (i = k(e(s, Ve(e)(t)))), r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
      })
    )),
      o && (r.unsubscribe(), (r = null), i.subscribe(n));
  });
}
function Iu(e, t, n, r, o) {
  return (i, s) => {
    let a = n,
      u = t,
      c = 0;
    i.subscribe(
      T(
        s,
        l => {
          let d = c++;
          (u = a ? e(u, l, d) : ((a = !0), l)), r && s.next(u);
        },
        o &&
          (() => {
            a && s.next(u), s.complete();
          })
      )
    );
  };
}
function rt(e, t) {
  return w(t) ? B(e, t, 1) : B(e, 1);
}
function $e(e) {
  return b((t, n) => {
    let r = !1;
    t.subscribe(
      T(
        n,
        o => {
          (r = !0), n.next(o);
        },
        () => {
          r || n.next(e), n.complete();
        }
      )
    );
  });
}
function Re(e) {
  return e <= 0
    ? () => Q
    : b((t, n) => {
        let r = 0;
        t.subscribe(
          T(n, o => {
            ++r <= e && (n.next(o), e <= r && n.complete());
          })
        );
      });
}
function ri(e) {
  return R(() => e);
}
function oi(e, t = G) {
  return (
    (e = e ?? gh),
    b((n, r) => {
      let o,
        i = !0;
      n.subscribe(
        T(r, s => {
          let a = t(s);
          (i || !e(o, a)) && ((i = !1), (o = a), r.next(s));
        })
      );
    })
  );
}
function gh(e, t) {
  return e === t;
}
function vr(e = mh) {
  return b((t, n) => {
    let r = !1;
    t.subscribe(
      T(
        n,
        o => {
          (r = !0), n.next(o);
        },
        () => (r ? n.complete() : n.error(e()))
      )
    );
  });
}
function mh() {
  return new Ne();
}
function St(e) {
  return b((t, n) => {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function ve(e, t) {
  let n = arguments.length >= 2;
  return r => r.pipe(e ? le((o, i) => e(o, i, r)) : G, Re(1), n ? $e(t) : vr(() => new Ne()));
}
function Tt(e) {
  return e <= 0
    ? () => Q
    : b((t, n) => {
        let r = [];
        t.subscribe(
          T(
            n,
            o => {
              r.push(o), e < r.length && r.shift();
            },
            () => {
              for (let o of r) n.next(o);
              n.complete();
            },
            void 0,
            () => {
              r = null;
            }
          )
        );
      });
}
function ii(e, t) {
  let n = arguments.length >= 2;
  return r => r.pipe(e ? le((o, i) => e(o, i, r)) : G, Tt(1), n ? $e(t) : vr(() => new Ne()));
}
function si(e, t) {
  return b(Iu(e, t, arguments.length >= 2, !0));
}
function ui(e = {}) {
  let { connector: t = () => new q(), resetOnError: n = !0, resetOnComplete: r = !0, resetOnRefCountZero: o = !0 } = e;
  return i => {
    let s,
      a,
      u,
      c = 0,
      l = !1,
      d = !1,
      f = () => {
        a?.unsubscribe(), (a = void 0);
      },
      h = () => {
        f(), (s = u = void 0), (l = d = !1);
      },
      v = () => {
        let S = s;
        h(), S?.unsubscribe();
      };
    return b((S, Y) => {
      c++, !d && !l && f();
      let P = (u = u ?? t());
      Y.add(() => {
        c--, c === 0 && !d && !l && (a = ai(v, o));
      }),
        P.subscribe(Y),
        !s &&
          c > 0 &&
          ((s = new Ae({
            next: ce => P.next(ce),
            error: ce => {
              (d = !0), f(), (a = ai(h, n, ce)), P.error(ce);
            },
            complete: () => {
              (l = !0), f(), (a = ai(h, r)), P.complete();
            },
          })),
          k(S).subscribe(s));
    })(i);
  };
}
function ai(e, t, ...n) {
  if (t === !0) {
    e();
    return;
  }
  if (t === !1) return;
  let r = new Ae({
    next: () => {
      r.unsubscribe(), e();
    },
  });
  return k(t(...n)).subscribe(r);
}
function ci(...e) {
  let t = Ie(e);
  return b((n, r) => {
    (t ? Mt(e, n, t) : Mt(e, n)).subscribe(r);
  });
}
function J(e, t) {
  return b((n, r) => {
    let o = null,
      i = 0,
      s = !1,
      a = () => s && !o && r.complete();
    n.subscribe(
      T(
        r,
        u => {
          o?.unsubscribe();
          let c = 0,
            l = i++;
          k(e(u, l)).subscribe(
            (o = T(
              r,
              d => r.next(t ? t(u, d, l, c++) : d),
              () => {
                (o = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function li(e) {
  return b((t, n) => {
    k(e).subscribe(T(n, () => n.complete(), en)), !n.closed && t.subscribe(n);
  });
}
function $(e, t, n) {
  let r = w(e) || t || n ? { next: e, error: t, complete: n } : e;
  return r
    ? b((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(
          T(
            i,
            u => {
              var c;
              (c = r.next) === null || c === void 0 || c.call(r, u), i.next(u);
            },
            () => {
              var u;
              (a = !1), (u = r.complete) === null || u === void 0 || u.call(r), i.complete();
            },
            u => {
              var c;
              (a = !1), (c = r.error) === null || c === void 0 || c.call(r, u), i.error(u);
            },
            () => {
              var u, c;
              a && ((u = r.unsubscribe) === null || u === void 0 || u.call(r)),
                (c = r.finalize) === null || c === void 0 || c.call(r);
            }
          )
        );
      })
    : G;
}
function F(e) {
  for (let t in e) if (e[t] === F) return t;
  throw Error('Could not find renamed property on target object.');
}
function ee(e) {
  if (typeof e == 'string') return e;
  if (Array.isArray(e)) return '[' + e.map(ee).join(', ') + ']';
  if (e == null) return '' + e;
  if (e.overriddenName) return `${e.overriddenName}`;
  if (e.name) return `${e.name}`;
  let t = e.toString();
  if (t == null) return '' + t;
  let n = t.indexOf(`
`);
  return n === -1 ? t : t.substring(0, n);
}
function Si(e, t) {
  return e == null || e === '' ? (t === null ? '' : t) : t == null || t === '' ? e : e + ' ' + t;
}
var vh = F({ __forward_ref__: F });
function oc(e) {
  return (
    (e.__forward_ref__ = oc),
    (e.toString = function () {
      return ee(this());
    }),
    e
  );
}
function fe(e) {
  return ic(e) ? e() : e;
}
function ic(e) {
  return typeof e == 'function' && e.hasOwnProperty(vh) && e.__forward_ref__ === oc;
}
function sc(e) {
  return e && !!e.ɵproviders;
}
var yh = 'https://g.co/ng/security#xss',
  y = class extends Error {
    constructor(t, n) {
      super(Wr(t, n)), (this.code = t);
    }
  };
function Wr(e, t) {
  return `${`NG0${Math.abs(e)}`}${t ? ': ' + t : ''}`;
}
var Dh = F({ ɵcmp: F }),
  wh = F({ ɵdir: F }),
  Ch = F({ ɵpipe: F }),
  Eh = F({ ɵmod: F }),
  Tr = F({ ɵfac: F }),
  nn = F({ __NG_ELEMENT_ID__: F }),
  bu = F({ __NG_ENV_ID__: F });
function Ih(e) {
  return typeof e == 'string' ? e : e == null ? '' : String(e);
}
function bh(e) {
  return typeof e == 'function'
    ? e.name || e.toString()
    : typeof e == 'object' && e != null && typeof e.type == 'function'
      ? e.type.name || e.type.toString()
      : Ih(e);
}
function Mh(e, t) {
  let n = t ? `. Dependency path: ${t.join(' > ')} > ${e}` : '';
  throw new y(-200, `Circular dependency in DI detected for ${e}${n}`);
}
function ss(e, t) {
  let n = t ? ` in ${t}` : '';
  throw new y(-201, !1);
}
function Sh(e, t) {
  e == null && Th(t, e, null, '!=');
}
function Th(e, t, n, r) {
  throw new Error(`ASSERTION ERROR: ${e}` + (r == null ? '' : ` [Expected=> ${n} ${r} ${t} <=Actual]`));
}
function C(e) {
  return { token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0 };
}
function Gr(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function qr(e) {
  return Mu(e, uc) || Mu(e, cc);
}
function ac(e) {
  return qr(e) !== null;
}
function Mu(e, t) {
  return e.hasOwnProperty(t) ? e[t] : null;
}
function xh(e) {
  let t = e && (e[uc] || e[cc]);
  return t || null;
}
function Su(e) {
  return e && (e.hasOwnProperty(Tu) || e.hasOwnProperty(_h)) ? e[Tu] : null;
}
var uc = F({ ɵprov: F }),
  Tu = F({ ɵinj: F }),
  cc = F({ ngInjectableDef: F }),
  _h = F({ ngInjectorDef: F }),
  M = (function (e) {
    return (
      (e[(e.Default = 0)] = 'Default'),
      (e[(e.Host = 1)] = 'Host'),
      (e[(e.Self = 2)] = 'Self'),
      (e[(e.SkipSelf = 4)] = 'SkipSelf'),
      (e[(e.Optional = 8)] = 'Optional'),
      e
    );
  })(M || {}),
  Ti;
function Ah() {
  return Ti;
}
function de(e) {
  let t = Ti;
  return (Ti = e), t;
}
function lc(e, t, n) {
  let r = qr(e);
  if (r && r.providedIn == 'root') return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (n & M.Optional) return null;
  if (t !== void 0) return t;
  ss(ee(e), 'Injector');
}
var rn = globalThis;
var I = class {
  constructor(t, n) {
    (this._desc = t),
      (this.ngMetadataName = 'InjectionToken'),
      (this.ɵprov = void 0),
      typeof n == 'number'
        ? (this.__NG_ELEMENT_ID__ = n)
        : n !== void 0 && (this.ɵprov = C({ token: this, providedIn: n.providedIn || 'root', factory: n.factory }));
  }
  get multi() {
    return this;
  }
  toString() {
    return `InjectionToken ${this._desc}`;
  }
};
var Nh = {},
  an = Nh,
  Rh = '__NG_DI_FLAG__',
  xr = 'ngTempTokenPath',
  Oh = 'ngTokenPath',
  Ph = /\n/gm,
  Fh = '\u0275',
  xu = '__source',
  on;
function Ue(e) {
  let t = on;
  return (on = e), t;
}
function kh(e, t = M.Default) {
  if (on === void 0) throw new y(-203, !1);
  return on === null ? lc(e, void 0, t) : on.get(e, t & M.Optional ? null : void 0, t);
}
function _(e, t = M.Default) {
  return (Ah() || kh)(fe(e), t);
}
function p(e, t = M.Default) {
  return _(e, Zr(t));
}
function Zr(e) {
  return typeof e > 'u' || typeof e == 'number'
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function xi(e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let r = fe(e[n]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new y(900, !1);
      let o,
        i = M.Default;
      for (let s = 0; s < r.length; s++) {
        let a = r[s],
          u = Lh(a);
        typeof u == 'number' ? (u === -1 ? (o = a.token) : (i |= u)) : (o = a);
      }
      t.push(_(o, i));
    } else t.push(_(r));
  }
  return t;
}
function Lh(e) {
  return e[Rh];
}
function jh(e, t, n, r) {
  let o = e[xr];
  throw (
    (t[xu] && o.unshift(t[xu]),
    (e.message = Vh(
      `
` + e.message,
      o,
      n,
      r
    )),
    (e[Oh] = o),
    (e[xr] = null),
    e)
  );
}
function Vh(e, t, n, r = null) {
  e =
    e &&
    e.charAt(0) ===
      `
` &&
    e.charAt(1) == Fh
      ? e.slice(2)
      : e;
  let o = ee(t);
  if (Array.isArray(t)) o = t.map(ee).join(' -> ');
  else if (typeof t == 'object') {
    let i = [];
    for (let s in t)
      if (t.hasOwnProperty(s)) {
        let a = t[s];
        i.push(s + ':' + (typeof a == 'string' ? JSON.stringify(a) : ee(a)));
      }
    o = `{${i.join(', ')}}`;
  }
  return `${n}${r ? '(' + r + ')' : ''}[${o}]: ${e.replace(
    Ph,
    `
  `
  )}`;
}
function Yr(e) {
  return { toString: e }.toString();
}
var dc = (function (e) {
    return (e[(e.OnPush = 0)] = 'OnPush'), (e[(e.Default = 1)] = 'Default'), e;
  })(dc || {}),
  Me = (function (e) {
    return (e[(e.Emulated = 0)] = 'Emulated'), (e[(e.None = 2)] = 'None'), (e[(e.ShadowDom = 3)] = 'ShadowDom'), e;
  })(Me || {}),
  un = {},
  X = [];
function fc(e, t, n) {
  let r = e.length;
  for (;;) {
    let o = e.indexOf(t, n);
    if (o === -1) return o;
    if (o === 0 || e.charCodeAt(o - 1) <= 32) {
      let i = t.length;
      if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
    }
    n = o + 1;
  }
}
function _i(e, t, n) {
  let r = 0;
  for (; r < n.length; ) {
    let o = n[r];
    if (typeof o == 'number') {
      if (o !== 0) break;
      r++;
      let i = n[r++],
        s = n[r++],
        a = n[r++];
      e.setAttribute(t, s, a, i);
    } else {
      let i = o,
        s = n[++r];
      Uh(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
    }
  }
  return r;
}
function $h(e) {
  return e === 3 || e === 4 || e === 6;
}
function Uh(e) {
  return e.charCodeAt(0) === 64;
}
function as(e, t) {
  if (!(t === null || t.length === 0))
    if (e === null || e.length === 0) e = t.slice();
    else {
      let n = -1;
      for (let r = 0; r < t.length; r++) {
        let o = t[r];
        typeof o == 'number'
          ? (n = o)
          : n === 0 || (n === -1 || n === 2 ? _u(e, n, o, null, t[++r]) : _u(e, n, o, null, null));
      }
    }
  return e;
}
function _u(e, t, n, r, o) {
  let i = 0,
    s = e.length;
  if (t === -1) s = -1;
  else
    for (; i < e.length; ) {
      let a = e[i++];
      if (typeof a == 'number') {
        if (a === t) {
          s = -1;
          break;
        } else if (a > t) {
          s = i - 1;
          break;
        }
      }
    }
  for (; i < e.length; ) {
    let a = e[i];
    if (typeof a == 'number') break;
    if (a === n) {
      if (r === null) {
        o !== null && (e[i + 1] = o);
        return;
      } else if (r === e[i + 1]) {
        e[i + 2] = o;
        return;
      }
    }
    i++, r !== null && i++, o !== null && i++;
  }
  s !== -1 && (e.splice(s, 0, t), (i = s + 1)),
    e.splice(i++, 0, n),
    r !== null && e.splice(i++, 0, r),
    o !== null && e.splice(i++, 0, o);
}
var hc = 'ng-template';
function Bh(e, t, n) {
  let r = 0,
    o = !0;
  for (; r < e.length; ) {
    let i = e[r++];
    if (typeof i == 'string' && o) {
      let s = e[r++];
      if (n && i === 'class' && fc(s.toLowerCase(), t, 0) !== -1) return !0;
    } else if (i === 1) {
      for (; r < e.length && typeof (i = e[r++]) == 'string'; ) if (i.toLowerCase() === t) return !0;
      return !1;
    } else typeof i == 'number' && (o = !1);
  }
  return !1;
}
function pc(e) {
  return e.type === 4 && e.value !== hc;
}
function Hh(e, t, n) {
  let r = e.type === 4 && !n ? hc : e.value;
  return t === r;
}
function zh(e, t, n) {
  let r = 4,
    o = e.attrs || [],
    i = qh(o),
    s = !1;
  for (let a = 0; a < t.length; a++) {
    let u = t[a];
    if (typeof u == 'number') {
      if (!s && !ye(r) && !ye(u)) return !1;
      if (s && ye(u)) continue;
      (s = !1), (r = u | (r & 1));
      continue;
    }
    if (!s)
      if (r & 4) {
        if (((r = 2 | (r & 1)), (u !== '' && !Hh(e, u, n)) || (u === '' && t.length === 1))) {
          if (ye(r)) return !1;
          s = !0;
        }
      } else {
        let c = r & 8 ? u : t[++a];
        if (r & 8 && e.attrs !== null) {
          if (!Bh(e.attrs, c, n)) {
            if (ye(r)) return !1;
            s = !0;
          }
          continue;
        }
        let l = r & 8 ? 'class' : u,
          d = Wh(l, o, pc(e), n);
        if (d === -1) {
          if (ye(r)) return !1;
          s = !0;
          continue;
        }
        if (c !== '') {
          let f;
          d > i ? (f = '') : (f = o[d + 1].toLowerCase());
          let h = r & 8 ? f : null;
          if ((h && fc(h, c, 0) !== -1) || (r & 2 && c !== f)) {
            if (ye(r)) return !1;
            s = !0;
          }
        }
      }
  }
  return ye(r) || s;
}
function ye(e) {
  return (e & 1) === 0;
}
function Wh(e, t, n, r) {
  if (t === null) return -1;
  let o = 0;
  if (r || !n) {
    let i = !1;
    for (; o < t.length; ) {
      let s = t[o];
      if (s === e) return o;
      if (s === 3 || s === 6) i = !0;
      else if (s === 1 || s === 2) {
        let a = t[++o];
        for (; typeof a == 'string'; ) a = t[++o];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          o += 4;
          continue;
        }
      }
      o += i ? 1 : 2;
    }
    return -1;
  } else return Zh(t, e);
}
function gc(e, t, n = !1) {
  for (let r = 0; r < t.length; r++) if (zh(e, t[r], n)) return !0;
  return !1;
}
function Gh(e) {
  let t = e.attrs;
  if (t != null) {
    let n = t.indexOf(5);
    if (!(n & 1)) return t[n + 1];
  }
  return null;
}
function qh(e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if ($h(n)) return t;
  }
  return e.length;
}
function Zh(e, t) {
  let n = e.indexOf(4);
  if (n > -1)
    for (n++; n < e.length; ) {
      let r = e[n];
      if (typeof r == 'number') return -1;
      if (r === t) return n;
      n++;
    }
  return -1;
}
function Yh(e, t) {
  e: for (let n = 0; n < t.length; n++) {
    let r = t[n];
    if (e.length === r.length) {
      for (let o = 0; o < e.length; o++) if (e[o] !== r[o]) continue e;
      return !0;
    }
  }
  return !1;
}
function Au(e, t) {
  return e ? ':not(' + t.trim() + ')' : t;
}
function Qh(e) {
  let t = e[0],
    n = 1,
    r = 2,
    o = '',
    i = !1;
  for (; n < e.length; ) {
    let s = e[n];
    if (typeof s == 'string')
      if (r & 2) {
        let a = e[++n];
        o += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']';
      } else r & 8 ? (o += '.' + s) : r & 4 && (o += ' ' + s);
    else o !== '' && !ye(s) && ((t += Au(i, o)), (o = '')), (r = s), (i = i || !ye(r));
    n++;
  }
  return o !== '' && (t += Au(i, o)), t;
}
function Kh(e) {
  return e.map(Qh).join(',');
}
function Jh(e) {
  let t = [],
    n = [],
    r = 1,
    o = 2;
  for (; r < e.length; ) {
    let i = e[r];
    if (typeof i == 'string') o === 2 ? i !== '' && t.push(i, e[++r]) : o === 8 && n.push(i);
    else {
      if (!ye(o)) break;
      o = i;
    }
    r++;
  }
  return { attrs: t, classes: n };
}
function mc(e) {
  return Yr(() => {
    let t = Cc(e),
      n = V(g({}, t), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection === dc.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (t.standalone && e.dependencies) || null,
        getStandaloneInjector: null,
        signals: e.signals ?? !1,
        data: e.data || {},
        encapsulation: e.encapsulation || Me.Emulated,
        styles: e.styles || X,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: '',
      });
    Ec(n);
    let r = e.dependencies;
    return (n.directiveDefs = Ru(r, !1)), (n.pipeDefs = Ru(r, !0)), (n.id = tp(n)), n;
  });
}
function Xh(e) {
  return it(e) || vc(e);
}
function ep(e) {
  return e !== null;
}
function Qr(e) {
  return Yr(() => ({
    type: e.type,
    bootstrap: e.bootstrap || X,
    declarations: e.declarations || X,
    imports: e.imports || X,
    exports: e.exports || X,
    transitiveCompileScopes: null,
    schemas: e.schemas || null,
    id: e.id || null,
  }));
}
function Nu(e, t) {
  if (e == null) return un;
  let n = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let o = e[r],
        i = o;
      Array.isArray(o) && ((i = o[1]), (o = o[0])), (n[o] = r), t && (t[o] = i);
    }
  return n;
}
function us(e) {
  return Yr(() => {
    let t = Cc(e);
    return Ec(t), t;
  });
}
function it(e) {
  return e[Dh] || null;
}
function vc(e) {
  return e[wh] || null;
}
function yc(e) {
  return e[Ch] || null;
}
function Dc(e) {
  let t = it(e) || vc(e) || yc(e);
  return t !== null ? t.standalone : !1;
}
function wc(e, t) {
  let n = e[Eh] || null;
  if (!n && t === !0) throw new Error(`Type ${ee(e)} does not have '\u0275mod' property.`);
  return n;
}
function Cc(e) {
  let t = {};
  return {
    type: e.type,
    providersResolver: null,
    factory: null,
    hostBindings: e.hostBindings || null,
    hostVars: e.hostVars || 0,
    hostAttrs: e.hostAttrs || null,
    contentQueries: e.contentQueries || null,
    declaredInputs: t,
    inputTransforms: null,
    inputConfig: e.inputs || un,
    exportAs: e.exportAs || null,
    standalone: e.standalone === !0,
    signals: e.signals === !0,
    selectors: e.selectors || X,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: Nu(e.inputs, t),
    outputs: Nu(e.outputs),
    debugInfo: null,
  };
}
function Ec(e) {
  e.features?.forEach(t => t(e));
}
function Ru(e, t) {
  if (!e) return null;
  let n = t ? yc : Xh;
  return () => (typeof e == 'function' ? e() : e).map(r => n(r)).filter(ep);
}
function tp(e) {
  let t = 0,
    n = [
      e.selectors,
      e.ngContentSelectors,
      e.hostVars,
      e.hostAttrs,
      e.consts,
      e.vars,
      e.decls,
      e.encapsulation,
      e.standalone,
      e.signals,
      e.exportAs,
      JSON.stringify(e.inputs),
      JSON.stringify(e.outputs),
      Object.getOwnPropertyNames(e.type.prototype),
      !!e.contentQueries,
      !!e.viewQuery,
    ].join('|');
  for (let o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
  return (t += 2147483647 + 1), 'c' + t;
}
var re = 0,
  x = 1,
  D = 2,
  U = 3,
  Ce = 4,
  se = 5,
  Se = 6,
  Ou = 7,
  He = 8,
  Rt = 9,
  cn = 10,
  H = 11,
  ln = 12,
  Pu = 13,
  Dn = 14,
  oe = 15,
  cs = 16,
  xt = 17,
  ls = 18,
  Kr = 19,
  Ic = 20,
  sn = 21,
  di = 22,
  st = 23,
  ie = 25,
  bc = 1,
  dn = 6,
  Pe = 7,
  _r = 8,
  Ar = 9,
  ne = 10,
  Ot = (function (e) {
    return (
      (e[(e.None = 0)] = 'None'),
      (e[(e.HasTransplantedViews = 2)] = 'HasTransplantedViews'),
      (e[(e.HasChildViewsToRefresh = 4)] = 'HasChildViewsToRefresh'),
      e
    );
  })(Ot || {});
function Oe(e) {
  return Array.isArray(e) && typeof e[bc] == 'object';
}
function he(e) {
  return Array.isArray(e) && e[bc] === !0;
}
function Mc(e) {
  return (e.flags & 4) !== 0;
}
function wn(e) {
  return e.componentOffset > -1;
}
function np(e) {
  return (e.flags & 1) === 1;
}
function Cn(e) {
  return !!e.template;
}
function Sc(e) {
  return (e[D] & 512) !== 0;
}
function Pt(e, t) {
  let n = e.hasOwnProperty(Tr);
  return n ? e[Tr] : null;
}
var Ai = class {
  constructor(t, n, r) {
    (this.previousValue = t), (this.currentValue = n), (this.firstChange = r);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function Jr() {
  return Tc;
}
function Tc(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = op), rp;
}
Jr.ngInherit = !0;
function rp() {
  let e = _c(this),
    t = e?.current;
  if (t) {
    let n = e.previous;
    if (n === un) e.previous = t;
    else for (let r in t) n[r] = t[r];
    (e.current = null), this.ngOnChanges(t);
  }
}
function op(e, t, n, r) {
  let o = this.declaredInputs[n],
    i = _c(e) || ip(e, { previous: un, current: null }),
    s = i.current || (i.current = {}),
    a = i.previous,
    u = a[o];
  (s[o] = new Ai(u && u.currentValue, t, a === un)), (e[r] = t);
}
var xc = '__ngSimpleChanges__';
function _c(e) {
  return e[xc] || null;
}
function ip(e, t) {
  return (e[xc] = t);
}
var Fu = null;
var Be = function (e, t, n) {
    Fu?.(e, t, n);
  },
  Ac = 'svg',
  sp = 'math';
function Te(e) {
  for (; Array.isArray(e); ) e = e[re];
  return e;
}
function ap(e, t) {
  return Te(t[e]);
}
function Ee(e, t) {
  return Te(t[e.index]);
}
function Nc(e, t) {
  return e.data[t];
}
function Vt(e, t) {
  let n = t[e];
  return Oe(n) ? n : n[re];
}
function ds(e) {
  return (e[D] & 128) === 128;
}
function up(e) {
  return he(e[U]);
}
function ku(e, t) {
  return t == null ? null : e[t];
}
function Rc(e) {
  e[xt] = 0;
}
function cp(e) {
  e[D] & 1024 || ((e[D] |= 1024), ds(e) && Xr(e));
}
function Oc(e) {
  return e[D] & 9216 || e[st]?.dirty;
}
function Pc(e) {
  Oc(e) && Xr(e);
}
function Xr(e) {
  let t = e[U];
  for (; t !== null && !((he(t) && t[D] & Ot.HasChildViewsToRefresh) || (Oe(t) && t[D] & 8192)); ) {
    if (he(t)) t[D] |= Ot.HasChildViewsToRefresh;
    else if (((t[D] |= 8192), !ds(t))) break;
    t = t[U];
  }
}
function lp(e, t) {
  if ((e[D] & 256) === 256) throw new y(911, !1);
  e[sn] === null && (e[sn] = []), e[sn].push(t);
}
var A = { lFrame: Bc(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
function dp() {
  return A.lFrame.elementDepthCount;
}
function fp() {
  A.lFrame.elementDepthCount++;
}
function hp() {
  A.lFrame.elementDepthCount--;
}
function Fc() {
  return A.bindingsEnabled;
}
function $t() {
  return A.skipHydrationRootTNode !== null;
}
function pp(e) {
  return A.skipHydrationRootTNode === e;
}
function gp(e) {
  A.skipHydrationRootTNode = e;
}
function mp() {
  A.skipHydrationRootTNode = null;
}
function Z() {
  return A.lFrame.lView;
}
function ct() {
  return A.lFrame.tView;
}
function We() {
  let e = kc();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function kc() {
  return A.lFrame.currentTNode;
}
function vp() {
  let e = A.lFrame,
    t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
function eo(e, t) {
  let n = A.lFrame;
  (n.currentTNode = e), (n.isParent = t);
}
function Lc() {
  return A.lFrame.isParent;
}
function jc() {
  A.lFrame.isParent = !1;
}
function yp(e) {
  return (A.lFrame.bindingIndex = e);
}
function Dp() {
  return A.lFrame.bindingIndex++;
}
function wp(e) {
  let t = A.lFrame,
    n = t.bindingIndex;
  return (t.bindingIndex = t.bindingIndex + e), n;
}
function Cp() {
  return A.lFrame.inI18n;
}
function Ep(e, t) {
  let n = A.lFrame;
  (n.bindingIndex = n.bindingRootIndex = e), Ni(t);
}
function Ip() {
  return A.lFrame.currentDirectiveIndex;
}
function Ni(e) {
  A.lFrame.currentDirectiveIndex = e;
}
function bp(e) {
  let t = A.lFrame.currentDirectiveIndex;
  return t === -1 ? null : e[t];
}
function Vc(e) {
  A.lFrame.currentQueryIndex = e;
}
function Mp(e) {
  let t = e[x];
  return t.type === 2 ? t.declTNode : t.type === 1 ? e[se] : null;
}
function $c(e, t, n) {
  if (n & M.SkipSelf) {
    let o = t,
      i = e;
    for (; (o = o.parent), o === null && !(n & M.Host); )
      if (((o = Mp(i)), o === null || ((i = i[Dn]), o.type & 10))) break;
    if (o === null) return !1;
    (t = o), (e = i);
  }
  let r = (A.lFrame = Uc());
  return (r.currentTNode = t), (r.lView = e), !0;
}
function fs(e) {
  let t = Uc(),
    n = e[x];
  (A.lFrame = t),
    (t.currentTNode = n.firstChild),
    (t.lView = e),
    (t.tView = n),
    (t.contextLView = e),
    (t.bindingIndex = n.bindingStartIndex),
    (t.inI18n = !1);
}
function Uc() {
  let e = A.lFrame,
    t = e === null ? null : e.child;
  return t === null ? Bc(e) : t;
}
function Bc(e) {
  let t = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: e,
    child: null,
    inI18n: !1,
  };
  return e !== null && (e.child = t), t;
}
function Hc() {
  let e = A.lFrame;
  return (A.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var zc = Hc;
function hs() {
  let e = Hc();
  (e.isParent = !0),
    (e.tView = null),
    (e.selectedIndex = -1),
    (e.contextLView = null),
    (e.elementDepthCount = 0),
    (e.currentDirectiveIndex = -1),
    (e.currentNamespace = null),
    (e.bindingRootIndex = -1),
    (e.bindingIndex = -1),
    (e.currentQueryIndex = 0);
}
function En() {
  return A.lFrame.selectedIndex;
}
function at(e) {
  A.lFrame.selectedIndex = e;
}
function Sp() {
  let e = A.lFrame;
  return Nc(e.tView, e.selectedIndex);
}
function rS() {
  A.lFrame.currentNamespace = Ac;
}
function oS() {
  Tp();
}
function Tp() {
  A.lFrame.currentNamespace = null;
}
function Wc() {
  return A.lFrame.currentNamespace;
}
var Gc = !0;
function qc() {
  return Gc;
}
function Ge(e) {
  Gc = e;
}
function xp(e, t, n) {
  let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype;
  if (r) {
    let s = Tc(t);
    (n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s);
  }
  o && (n.preOrderHooks ??= []).push(0 - e, o),
    i && ((n.preOrderHooks ??= []).push(e, i), (n.preOrderCheckHooks ??= []).push(e, i));
}
function Zc(e, t) {
  for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
    let i = e.data[n].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: u,
        ngAfterViewChecked: c,
        ngOnDestroy: l,
      } = i;
    s && (e.contentHooks ??= []).push(-n, s),
      a && ((e.contentHooks ??= []).push(n, a), (e.contentCheckHooks ??= []).push(n, a)),
      u && (e.viewHooks ??= []).push(-n, u),
      c && ((e.viewHooks ??= []).push(n, c), (e.viewCheckHooks ??= []).push(n, c)),
      l != null && (e.destroyHooks ??= []).push(n, l);
  }
}
function Er(e, t, n) {
  Yc(e, t, 3, n);
}
function Ir(e, t, n, r) {
  (e[D] & 3) === n && Yc(e, t, n, r);
}
function fi(e, t) {
  let n = e[D];
  (n & 3) === t && ((n &= 16383), (n += 1), (e[D] = n));
}
function Yc(e, t, n, r) {
  let o = r !== void 0 ? e[xt] & 65535 : 0,
    i = r ?? -1,
    s = t.length - 1,
    a = 0;
  for (let u = o; u < s; u++)
    if (typeof t[u + 1] == 'number') {
      if (((a = t[u]), r != null && a >= r)) break;
    } else
      t[u] < 0 && (e[xt] += 65536), (a < i || i == -1) && (_p(e, n, t, u), (e[xt] = (e[xt] & 4294901760) + u + 2)), u++;
}
function Lu(e, t) {
  Be(4, e, t);
  let n = te(null);
  try {
    t.call(e);
  } finally {
    te(n), Be(5, e, t);
  }
}
function _p(e, t, n, r) {
  let o = n[r] < 0,
    i = n[r + 1],
    s = o ? -n[r] : n[r],
    a = e[s];
  o ? e[D] >> 14 < e[xt] >> 16 && (e[D] & 3) === t && ((e[D] += 16384), Lu(a, i)) : Lu(a, i);
}
var Nt = -1,
  fn = class {
    constructor(t, n, r) {
      (this.factory = t), (this.resolving = !1), (this.canSeeViewProviders = n), (this.injectImpl = r);
    }
  };
function Ap(e) {
  return e instanceof fn;
}
function Np(e) {
  return (e.flags & 8) !== 0;
}
function Rp(e) {
  return (e.flags & 16) !== 0;
}
function Qc(e) {
  return e !== Nt;
}
function Nr(e) {
  let t = e & 32767;
  return e & 32767;
}
function Op(e) {
  return e >> 16;
}
function Rr(e, t) {
  let n = Op(e),
    r = t;
  for (; n > 0; ) (r = r[Dn]), n--;
  return r;
}
var Ri = !0;
function ju(e) {
  let t = Ri;
  return (Ri = e), t;
}
var Pp = 256,
  Kc = Pp - 1,
  Jc = 5,
  Fp = 0,
  be = {};
function kp(e, t, n) {
  let r;
  typeof n == 'string' ? (r = n.charCodeAt(0) || 0) : n.hasOwnProperty(nn) && (r = n[nn]),
    r == null && (r = n[nn] = Fp++);
  let o = r & Kc,
    i = 1 << o;
  t.data[e + (o >> Jc)] |= i;
}
function Xc(e, t) {
  let n = el(e, t);
  if (n !== -1) return n;
  let r = t[x];
  r.firstCreatePass && ((e.injectorIndex = t.length), hi(r.data, e), hi(t, null), hi(r.blueprint, null));
  let o = ps(e, t),
    i = e.injectorIndex;
  if (Qc(o)) {
    let s = Nr(o),
      a = Rr(o, t),
      u = a[x].data;
    for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c];
  }
  return (t[i + 8] = o), i;
}
function hi(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function el(e, t) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    t[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function ps(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let n = 0,
    r = null,
    o = t;
  for (; o !== null; ) {
    if (((r = il(o)), r === null)) return Nt;
    if ((n++, (o = o[Dn]), r.injectorIndex !== -1)) return r.injectorIndex | (n << 16);
  }
  return Nt;
}
function Lp(e, t, n) {
  kp(e, t, n);
}
function tl(e, t, n) {
  if (n & M.Optional || e !== void 0) return e;
  ss(t, 'NodeInjector');
}
function nl(e, t, n, r) {
  if ((n & M.Optional && r === void 0 && (r = null), !(n & (M.Self | M.Host)))) {
    let o = e[Rt],
      i = de(void 0);
    try {
      return o ? o.get(t, r, n & M.Optional) : lc(t, r, n & M.Optional);
    } finally {
      de(i);
    }
  }
  return tl(r, t, n);
}
function rl(e, t, n, r = M.Default, o) {
  if (e !== null) {
    if (t[D] & 2048 && !(r & M.Self)) {
      let s = Bp(e, t, n, r, be);
      if (s !== be) return s;
    }
    let i = ol(e, t, n, r, be);
    if (i !== be) return i;
  }
  return nl(t, n, r, o);
}
function ol(e, t, n, r, o) {
  let i = $p(n);
  if (typeof i == 'function') {
    if (!$c(t, e, r)) return r & M.Host ? tl(o, n, r) : nl(t, n, r, o);
    try {
      let s;
      if (((s = i(r)), s == null && !(r & M.Optional))) ss(n);
      else return s;
    } finally {
      zc();
    }
  } else if (typeof i == 'number') {
    let s = null,
      a = el(e, t),
      u = Nt,
      c = r & M.Host ? t[oe][se] : null;
    for (
      (a === -1 || r & M.SkipSelf) &&
      ((u = a === -1 ? ps(e, t) : t[a + 8]),
      u === Nt || !$u(r, !1) ? (a = -1) : ((s = t[x]), (a = Nr(u)), (t = Rr(u, t))));
      a !== -1;

    ) {
      let l = t[x];
      if (Vu(i, a, l.data)) {
        let d = jp(a, t, n, s, r, c);
        if (d !== be) return d;
      }
      (u = t[a + 8]),
        u !== Nt && $u(r, t[x].data[a + 8] === c) && Vu(i, a, t) ? ((s = l), (a = Nr(u)), (t = Rr(u, t))) : (a = -1);
    }
  }
  return o;
}
function jp(e, t, n, r, o, i) {
  let s = t[x],
    a = s.data[e + 8],
    u = r == null ? wn(a) && Ri : r != s && (a.type & 3) !== 0,
    c = o & M.Host && i === a,
    l = Vp(a, s, n, u, c);
  return l !== null ? hn(t, s, l, a) : be;
}
function Vp(e, t, n, r, o) {
  let i = e.providerIndexes,
    s = t.data,
    a = i & 1048575,
    u = e.directiveStart,
    c = e.directiveEnd,
    l = i >> 20,
    d = r ? a : a + l,
    f = o ? a + l : c;
  for (let h = d; h < f; h++) {
    let v = s[h];
    if ((h < u && n === v) || (h >= u && v.type === n)) return h;
  }
  if (o) {
    let h = s[u];
    if (h && Cn(h) && h.type === n) return u;
  }
  return null;
}
function hn(e, t, n, r) {
  let o = e[n],
    i = t.data;
  if (Ap(o)) {
    let s = o;
    s.resolving && Mh(bh(i[n]));
    let a = ju(s.canSeeViewProviders);
    s.resolving = !0;
    let u,
      c = s.injectImpl ? de(s.injectImpl) : null,
      l = $c(e, r, M.Default);
    try {
      (o = e[n] = s.factory(void 0, i, e, r)), t.firstCreatePass && n >= r.directiveStart && xp(n, i[n], t);
    } finally {
      c !== null && de(c), ju(a), (s.resolving = !1), zc();
    }
  }
  return o;
}
function $p(e) {
  if (typeof e == 'string') return e.charCodeAt(0) || 0;
  let t = e.hasOwnProperty(nn) ? e[nn] : void 0;
  return typeof t == 'number' ? (t >= 0 ? t & Kc : Up) : t;
}
function Vu(e, t, n) {
  let r = 1 << e;
  return !!(n[t + (e >> Jc)] & r);
}
function $u(e, t) {
  return !(e & M.Self) && !(e & M.Host && t);
}
var ot = class {
  constructor(t, n) {
    (this._tNode = t), (this._lView = n);
  }
  get(t, n, r) {
    return rl(this._tNode, this._lView, t, Zr(r), n);
  }
};
function Up() {
  return new ot(We(), Z());
}
function gs(e) {
  return Yr(() => {
    let t = e.prototype.constructor,
      n = t[Tr] || Oi(t),
      r = Object.prototype,
      o = Object.getPrototypeOf(e.prototype).constructor;
    for (; o && o !== r; ) {
      let i = o[Tr] || Oi(o);
      if (i && i !== n) return i;
      o = Object.getPrototypeOf(o);
    }
    return i => new i();
  });
}
function Oi(e) {
  return ic(e)
    ? () => {
        let t = Oi(fe(e));
        return t && t();
      }
    : Pt(e);
}
function Bp(e, t, n, r, o) {
  let i = e,
    s = t;
  for (; i !== null && s !== null && s[D] & 2048 && !(s[D] & 512); ) {
    let a = ol(i, s, n, r | M.Self, be);
    if (a !== be) return a;
    let u = i.parent;
    if (!u) {
      let c = s[Ic];
      if (c) {
        let l = c.get(n, be, r);
        if (l !== be) return l;
      }
      (u = il(s)), (s = s[Dn]);
    }
    i = u;
  }
  return o;
}
function il(e) {
  let t = e[x],
    n = t.type;
  return n === 2 ? t.declTNode : n === 1 ? e[se] : null;
}
function Hp(e) {
  return typeof e == 'function';
}
function ms(e, t) {
  e.forEach(n => (Array.isArray(n) ? ms(n, t) : t(n)));
}
function sl(e, t, n) {
  t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function Or(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function al(e, t) {
  let n = [];
  for (let r = 0; r < e; r++) n.push(t);
  return n;
}
function zp(e, t, n, r) {
  let o = e.length;
  if (o == t) e.push(n, r);
  else if (o === 1) e.push(r, e[0]), (e[0] = n);
  else {
    for (o--, e.push(e[o - 1], e[o]); o > t; ) {
      let i = o - 2;
      (e[o] = e[i]), o--;
    }
    (e[t] = n), (e[t + 1] = r);
  }
}
function vs(e, t, n) {
  let r = In(e, t);
  return r >= 0 ? (e[r | 1] = n) : ((r = ~r), zp(e, r, t, n)), r;
}
function pi(e, t) {
  let n = In(e, t);
  if (n >= 0) return e[n | 1];
}
function In(e, t) {
  return Wp(e, t, 1);
}
function Wp(e, t, n) {
  let r = 0,
    o = e.length >> n;
  for (; o !== r; ) {
    let i = r + ((o - r) >> 1),
      s = e[i << n];
    if (t === s) return i << n;
    s > t ? (o = i) : (r = i + 1);
  }
  return ~(o << n);
}
var Ut = new I('ENVIRONMENT_INITIALIZER'),
  ul = new I('INJECTOR', -1),
  cl = new I('INJECTOR_DEF_TYPES'),
  Pr = class {
    get(t, n = an) {
      if (n === an) {
        let r = new Error(`NullInjectorError: No provider for ${ee(t)}!`);
        throw ((r.name = 'NullInjectorError'), r);
      }
      return n;
    }
  };
function lt(e) {
  return { ɵproviders: e };
}
function Gp(...e) {
  return { ɵproviders: ll(!0, e), ɵfromNgModule: !0 };
}
function ll(e, ...t) {
  let n = [],
    r = new Set(),
    o,
    i = s => {
      n.push(s);
    };
  return (
    ms(t, s => {
      let a = s;
      Pi(a, i, [], r) && ((o ||= []), o.push(a));
    }),
    o !== void 0 && dl(o, i),
    n
  );
}
function dl(e, t) {
  for (let n = 0; n < e.length; n++) {
    let { ngModule: r, providers: o } = e[n];
    ys(o, i => {
      t(i, r);
    });
  }
}
function Pi(e, t, n, r) {
  if (((e = fe(e)), !e)) return !1;
  let o = null,
    i = Su(e),
    s = !i && it(e);
  if (!i && !s) {
    let u = e.ngModule;
    if (((i = Su(u)), i)) o = u;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    o = e;
  }
  let a = r.has(o);
  if (s) {
    if (a) return !1;
    if ((r.add(o), s.dependencies)) {
      let u = typeof s.dependencies == 'function' ? s.dependencies() : s.dependencies;
      for (let c of u) Pi(c, t, n, r);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      r.add(o);
      let c;
      try {
        ms(i.imports, l => {
          Pi(l, t, n, r) && ((c ||= []), c.push(l));
        });
      } finally {
      }
      c !== void 0 && dl(c, t);
    }
    if (!a) {
      let c = Pt(o) || (() => new o());
      t({ provide: o, useFactory: c, deps: X }, o),
        t({ provide: cl, useValue: o, multi: !0 }, o),
        t({ provide: Ut, useValue: () => _(o), multi: !0 }, o);
    }
    let u = i.providers;
    if (u != null && !a) {
      let c = e;
      ys(u, l => {
        t(l, c);
      });
    }
  } else return !1;
  return o !== e && e.providers !== void 0;
}
function ys(e, t) {
  for (let n of e) sc(n) && (n = n.ɵproviders), Array.isArray(n) ? ys(n, t) : t(n);
}
var qp = F({ provide: String, useValue: F });
function fl(e) {
  return e !== null && typeof e == 'object' && qp in e;
}
function Zp(e) {
  return !!(e && e.useExisting);
}
function Yp(e) {
  return !!(e && e.useFactory);
}
function Fi(e) {
  return typeof e == 'function';
}
var to = new I('Set Injector scope.'),
  br = {},
  Qp = {},
  gi;
function Ds() {
  return gi === void 0 && (gi = new Pr()), gi;
}
var pe = class {},
  pn = class extends pe {
    get destroyed() {
      return this._destroyed;
    }
    constructor(t, n, r, o) {
      super(),
        (this.parent = n),
        (this.source = r),
        (this.scopes = o),
        (this.records = new Map()),
        (this._ngOnDestroyHooks = new Set()),
        (this._onDestroyHooks = []),
        (this._destroyed = !1),
        Li(t, s => this.processProvider(s)),
        this.records.set(ul, _t(void 0, this)),
        o.has('environment') && this.records.set(pe, _t(void 0, this));
      let i = this.records.get(to);
      i != null && typeof i.value == 'string' && this.scopes.add(i.value),
        (this.injectorDefTypes = new Set(this.get(cl, X, M.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      try {
        for (let n of this._ngOnDestroyHooks) n.ngOnDestroy();
        let t = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let n of t) n();
      } finally {
        this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear();
      }
    }
    onDestroy(t) {
      return this.assertNotDestroyed(), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t);
    }
    runInContext(t) {
      this.assertNotDestroyed();
      let n = Ue(this),
        r = de(void 0),
        o;
      try {
        return t();
      } finally {
        Ue(n), de(r);
      }
    }
    get(t, n = an, r = M.Default) {
      if ((this.assertNotDestroyed(), t.hasOwnProperty(bu))) return t[bu](this);
      r = Zr(r);
      let o,
        i = Ue(this),
        s = de(void 0);
      try {
        if (!(r & M.SkipSelf)) {
          let u = this.records.get(t);
          if (u === void 0) {
            let c = ng(t) && qr(t);
            c && this.injectableDefInScope(c) ? (u = _t(ki(t), br)) : (u = null), this.records.set(t, u);
          }
          if (u != null) return this.hydrate(t, u);
        }
        let a = r & M.Self ? Ds() : this.parent;
        return (n = r & M.Optional && n === an ? null : n), a.get(t, n);
      } catch (a) {
        if (a.name === 'NullInjectorError') {
          if (((a[xr] = a[xr] || []).unshift(ee(t)), i)) throw a;
          return jh(a, t, 'R3InjectorError', this.source);
        } else throw a;
      } finally {
        de(s), Ue(i);
      }
    }
    resolveInjectorInitializers() {
      let t = Ue(this),
        n = de(void 0),
        r;
      try {
        let o = this.get(Ut, X, M.Self);
        for (let i of o) i();
      } finally {
        Ue(t), de(n);
      }
    }
    toString() {
      let t = [],
        n = this.records;
      for (let r of n.keys()) t.push(ee(r));
      return `R3Injector[${t.join(', ')}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new y(205, !1);
    }
    processProvider(t) {
      t = fe(t);
      let n = Fi(t) ? t : fe(t && t.provide),
        r = Jp(t);
      if (!Fi(t) && t.multi === !0) {
        let o = this.records.get(n);
        o || ((o = _t(void 0, br, !0)), (o.factory = () => xi(o.multi)), this.records.set(n, o)),
          (n = t),
          o.multi.push(t);
      } else {
        let o = this.records.get(n);
      }
      this.records.set(n, r);
    }
    hydrate(t, n) {
      return (
        n.value === br && ((n.value = Qp), (n.value = n.factory())),
        typeof n.value == 'object' && n.value && tg(n.value) && this._ngOnDestroyHooks.add(n.value),
        n.value
      );
    }
    injectableDefInScope(t) {
      if (!t.providedIn) return !1;
      let n = fe(t.providedIn);
      return typeof n == 'string' ? n === 'any' || this.scopes.has(n) : this.injectorDefTypes.has(n);
    }
    removeOnDestroy(t) {
      let n = this._onDestroyHooks.indexOf(t);
      n !== -1 && this._onDestroyHooks.splice(n, 1);
    }
  };
function ki(e) {
  let t = qr(e),
    n = t !== null ? t.factory : Pt(e);
  if (n !== null) return n;
  if (e instanceof I) throw new y(204, !1);
  if (e instanceof Function) return Kp(e);
  throw new y(204, !1);
}
function Kp(e) {
  let t = e.length;
  if (t > 0) {
    let r = al(t, '?');
    throw new y(204, !1);
  }
  let n = xh(e);
  return n !== null ? () => n.factory(e) : () => new e();
}
function Jp(e) {
  if (fl(e)) return _t(void 0, e.useValue);
  {
    let t = Xp(e);
    return _t(t, br);
  }
}
function Xp(e, t, n) {
  let r;
  if (Fi(e)) {
    let o = fe(e);
    return Pt(o) || ki(o);
  } else if (fl(e)) r = () => fe(e.useValue);
  else if (Yp(e)) r = () => e.useFactory(...xi(e.deps || []));
  else if (Zp(e)) r = () => _(fe(e.useExisting));
  else {
    let o = fe(e && (e.useClass || e.provide));
    if (eg(e)) r = () => new o(...xi(e.deps));
    else return Pt(o) || ki(o);
  }
  return r;
}
function _t(e, t, n = !1) {
  return { factory: e, value: t, multi: n ? [] : void 0 };
}
function eg(e) {
  return !!e.deps;
}
function tg(e) {
  return e !== null && typeof e == 'object' && typeof e.ngOnDestroy == 'function';
}
function ng(e) {
  return typeof e == 'function' || (typeof e == 'object' && e instanceof I);
}
function Li(e, t) {
  for (let n of e) Array.isArray(n) ? Li(n, t) : n && sc(n) ? Li(n.ɵproviders, t) : t(n);
}
function qe(e, t) {
  e instanceof pn && e.assertNotDestroyed();
  let n,
    r = Ue(e),
    o = de(void 0);
  try {
    return t();
  } finally {
    Ue(r), de(o);
  }
}
function Uu(e, t = null, n = null, r) {
  let o = hl(e, t, n, r);
  return o.resolveInjectorInitializers(), o;
}
function hl(e, t = null, n = null, r, o = new Set()) {
  let i = [n || X, Gp(e)];
  return (r = r || (typeof e == 'object' ? void 0 : ee(e))), new pn(i, t || Ds(), r || null, o);
}
var Ze = (() => {
  let t = class t {
    static create(r, o) {
      if (Array.isArray(r)) return Uu({ name: '' }, o, r, '');
      {
        let i = r.name ?? '';
        return Uu({ name: i }, r.parent, r.providers, i);
      }
    }
  };
  (t.THROW_IF_NOT_FOUND = an),
    (t.NULL = new Pr()),
    (t.ɵprov = C({ token: t, providedIn: 'any', factory: () => _(ul) })),
    (t.__NG_ELEMENT_ID__ = -1);
  let e = t;
  return e;
})();
var ji;
function pl(e) {
  ji = e;
}
function no() {
  if (ji !== void 0) return ji;
  if (typeof document < 'u') return document;
  throw new y(210, !1);
}
var ro = new I('AppId', { providedIn: 'root', factory: () => rg }),
  rg = 'ng',
  ws = new I('Platform Initializer'),
  Le = new I('Platform ID', { providedIn: 'platform', factory: () => 'unknown' });
var Cs = new I('CSP nonce', {
  providedIn: 'root',
  factory: () => no().body?.querySelector('[ngCspNonce]')?.getAttribute('ngCspNonce') || null,
});
function og(e) {
  return e.ownerDocument.body;
}
function gl(e) {
  return e instanceof Function ? e() : e;
}
function yr(e) {
  return (e ?? p(Ze)).get(Le) === 'browser';
}
var ig = 'ngSkipHydration',
  sg = 'ngskiphydration';
function ml(e) {
  let t = e.mergedAttrs;
  if (t === null) return !1;
  for (let n = 0; n < t.length; n += 2) {
    let r = t[n];
    if (typeof r == 'number') return !1;
    if (typeof r == 'string' && r.toLowerCase() === sg) return !0;
  }
  return !1;
}
function vl(e) {
  return e.hasAttribute(ig);
}
function Fr(e) {
  return (e.flags & 128) === 128;
}
function ag(e) {
  if (Fr(e)) return !0;
  let t = e.parent;
  for (; t; ) {
    if (Fr(e) || ml(t)) return !0;
    t = t.parent;
  }
  return !1;
}
var Fe = (function (e) {
    return (e[(e.Important = 1)] = 'Important'), (e[(e.DashCase = 2)] = 'DashCase'), e;
  })(Fe || {}),
  ug = /^>|^->|<!--|-->|--!>|<!-$/g,
  cg = /(<|>)/g,
  lg = '\u200B$1\u200B';
function dg(e) {
  return e.replace(ug, t => t.replace(cg, lg));
}
var yl = new Map(),
  fg = 0;
function hg() {
  return fg++;
}
function pg(e) {
  yl.set(e[Kr], e);
}
function gg(e) {
  yl.delete(e[Kr]);
}
var Bu = '__ngContext__';
function Ft(e, t) {
  Oe(t) ? ((e[Bu] = t[Kr]), pg(t)) : (e[Bu] = t);
}
var mg;
function Es(e, t) {
  return mg(e, t);
}
function Is(e) {
  let t = e[U];
  return he(t) ? t[U] : t;
}
function Dl(e) {
  return Cl(e[ln]);
}
function wl(e) {
  return Cl(e[Ce]);
}
function Cl(e) {
  for (; e !== null && !he(e); ) e = e[Ce];
  return e;
}
function At(e, t, n, r, o) {
  if (r != null) {
    let i,
      s = !1;
    he(r) ? (i = r) : Oe(r) && ((s = !0), (r = r[re]));
    let a = Te(r);
    e === 0 && n !== null
      ? o == null
        ? Tl(t, n, a)
        : kr(t, n, a, o || null, !0)
      : e === 1 && n !== null
        ? kr(t, n, a, o || null, !0)
        : e === 2
          ? Nl(t, a, s)
          : e === 3 && t.destroyNode(a),
      i != null && Ng(t, e, i, n, o);
  }
}
function El(e, t) {
  return e.createText(t);
}
function Il(e, t) {
  return e.createComment(dg(t));
}
function bs(e, t, n) {
  return e.createElement(t, n);
}
function vg(e, t) {
  let n = t[H];
  bn(e, t, n, 2, null, null), (t[re] = null), (t[se] = null);
}
function yg(e, t, n, r, o, i) {
  (r[re] = o), (r[se] = t), bn(e, r, n, 1, o, i);
}
function Dg(e, t) {
  bn(e, t, t[H], 2, null, null);
}
function wg(e) {
  let t = e[ln];
  if (!t) return mi(e[x], e);
  for (; t; ) {
    let n = null;
    if (Oe(t)) n = t[ln];
    else {
      let r = t[ne];
      r && (n = r);
    }
    if (!n) {
      for (; t && !t[Ce] && t !== e; ) Oe(t) && mi(t[x], t), (t = t[U]);
      t === null && (t = e), Oe(t) && mi(t[x], t), (n = t && t[Ce]);
    }
    t = n;
  }
}
function Cg(e, t, n, r) {
  let o = ne + r,
    i = n.length;
  r > 0 && (n[o - 1][Ce] = t),
    r < i - ne ? ((t[Ce] = n[o]), sl(n, ne + r, t)) : (n.push(t), (t[Ce] = null)),
    (t[U] = n);
  let s = t[cs];
  s !== null && n !== s && Eg(s, t);
  let a = t[ls];
  a !== null && a.insertView(e), Pc(t), (t[D] |= 128);
}
function Eg(e, t) {
  let n = e[Ar],
    o = t[U][U][oe];
  t[oe] !== o && (e[D] |= Ot.HasTransplantedViews), n === null ? (e[Ar] = [t]) : n.push(t);
}
function bl(e, t) {
  let n = e[Ar],
    r = n.indexOf(t),
    o = t[U];
  n.splice(r, 1);
}
function Vi(e, t) {
  if (e.length <= ne) return;
  let n = ne + t,
    r = e[n];
  if (r) {
    let o = r[cs];
    o !== null && o !== e && bl(o, r), t > 0 && (e[n - 1][Ce] = r[Ce]);
    let i = Or(e, ne + t);
    vg(r[x], r);
    let s = i[ls];
    s !== null && s.detachView(i[x]), (r[U] = null), (r[Ce] = null), (r[D] &= -129);
  }
  return r;
}
function Ml(e, t) {
  if (!(t[D] & 256)) {
    let n = t[H];
    n.destroyNode && bn(e, t, n, 3, null, null), wg(t);
  }
}
function mi(e, t) {
  if (!(t[D] & 256)) {
    (t[D] &= -129), (t[D] |= 256), t[st] && Za(t[st]), bg(e, t), Ig(e, t), t[x].type === 1 && t[H].destroy();
    let n = t[cs];
    if (n !== null && he(t[U])) {
      n !== t[U] && bl(n, t);
      let r = t[ls];
      r !== null && r.detachView(e);
    }
    gg(t);
  }
}
function Ig(e, t) {
  let n = e.cleanup,
    r = t[Ou];
  if (n !== null)
    for (let i = 0; i < n.length - 1; i += 2)
      if (typeof n[i] == 'string') {
        let s = n[i + 3];
        s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
      } else {
        let s = r[n[i + 1]];
        n[i].call(s);
      }
  r !== null && (t[Ou] = null);
  let o = t[sn];
  if (o !== null) {
    t[sn] = null;
    for (let i = 0; i < o.length; i++) {
      let s = o[i];
      s();
    }
  }
}
function bg(e, t) {
  let n;
  if (e != null && (n = e.destroyHooks) != null)
    for (let r = 0; r < n.length; r += 2) {
      let o = t[n[r]];
      if (!(o instanceof fn)) {
        let i = n[r + 1];
        if (Array.isArray(i))
          for (let s = 0; s < i.length; s += 2) {
            let a = o[i[s]],
              u = i[s + 1];
            Be(4, a, u);
            try {
              u.call(a);
            } finally {
              Be(5, a, u);
            }
          }
        else {
          Be(4, o, i);
          try {
            i.call(o);
          } finally {
            Be(5, o, i);
          }
        }
      }
    }
}
function Sl(e, t, n) {
  return Mg(e, t.parent, n);
}
function Mg(e, t, n) {
  let r = t;
  for (; r !== null && r.type & 40; ) (t = r), (r = t.parent);
  if (r === null) return n[re];
  {
    let { componentOffset: o } = r;
    if (o > -1) {
      let { encapsulation: i } = e.data[r.directiveStart + o];
      if (i === Me.None || i === Me.Emulated) return null;
    }
    return Ee(r, n);
  }
}
function kr(e, t, n, r, o) {
  e.insertBefore(t, n, r, o);
}
function Tl(e, t, n) {
  e.appendChild(t, n);
}
function Hu(e, t, n, r, o) {
  r !== null ? kr(e, t, n, r, o) : Tl(e, t, n);
}
function Sg(e, t, n, r) {
  e.removeChild(t, n, r);
}
function Ms(e, t) {
  return e.parentNode(t);
}
function Tg(e, t) {
  return e.nextSibling(t);
}
function xl(e, t, n) {
  return _g(e, t, n);
}
function xg(e, t, n) {
  return e.type & 40 ? Ee(e, n) : null;
}
var _g = xg,
  zu;
function _l(e, t, n, r) {
  let o = Sl(e, r, t),
    i = t[H],
    s = r.parent || t[se],
    a = xl(s, r, t);
  if (o != null)
    if (Array.isArray(n)) for (let u = 0; u < n.length; u++) Hu(i, o, n[u], a, !1);
    else Hu(i, o, n, a, !1);
  zu !== void 0 && zu(i, r, t, n, o);
}
function Mr(e, t) {
  if (t !== null) {
    let n = t.type;
    if (n & 3) return Ee(t, e);
    if (n & 4) return $i(-1, e[t.index]);
    if (n & 8) {
      let r = t.child;
      if (r !== null) return Mr(e, r);
      {
        let o = e[t.index];
        return he(o) ? $i(-1, o) : Te(o);
      }
    } else {
      if (n & 32) return Es(t, e)() || Te(e[t.index]);
      {
        let r = Al(e, t);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let o = Is(e[oe]);
          return Mr(o, r);
        } else return Mr(e, t.next);
      }
    }
  }
  return null;
}
function Al(e, t) {
  if (t !== null) {
    let r = e[oe][se],
      o = t.projection;
    return r.projection[o];
  }
  return null;
}
function $i(e, t) {
  let n = ne + e + 1;
  if (n < t.length) {
    let r = t[n],
      o = r[x].firstChild;
    if (o !== null) return Mr(r, o);
  }
  return t[Pe];
}
function Nl(e, t, n) {
  let r = Ms(e, t);
  r && Sg(e, r, t, n);
}
function Rl(e) {
  e.textContent = '';
}
function Ss(e, t, n, r, o, i, s) {
  for (; n != null; ) {
    let a = r[n.index],
      u = n.type;
    if ((s && t === 0 && (a && Ft(Te(a), r), (n.flags |= 2)), (n.flags & 32) !== 32))
      if (u & 8) Ss(e, t, n.child, r, o, i, !1), At(t, e, o, a, i);
      else if (u & 32) {
        let c = Es(n, r),
          l;
        for (; (l = c()); ) At(t, e, o, l, i);
        At(t, e, o, a, i);
      } else u & 16 ? Ol(e, t, r, n, o, i) : At(t, e, o, a, i);
    n = s ? n.projectionNext : n.next;
  }
}
function bn(e, t, n, r, o, i) {
  Ss(n, r, e.firstChild, t, o, i, !1);
}
function Ag(e, t, n) {
  let r = t[H],
    o = Sl(e, n, t),
    i = n.parent || t[se],
    s = xl(i, n, t);
  Ol(r, 0, t, n, o, s);
}
function Ol(e, t, n, r, o, i) {
  let s = n[oe],
    u = s[se].projection[r.projection];
  if (Array.isArray(u))
    for (let c = 0; c < u.length; c++) {
      let l = u[c];
      At(t, e, o, l, i);
    }
  else {
    let c = u,
      l = s[U];
    Fr(r) && (c.flags |= 128), Ss(e, t, c, l, o, i, !0);
  }
}
function Ng(e, t, n, r, o) {
  let i = n[Pe],
    s = Te(n);
  i !== s && At(t, e, r, i, o);
  for (let a = ne; a < n.length; a++) {
    let u = n[a];
    bn(u[x], u, e, t, r, i);
  }
}
function Rg(e, t, n, r, o) {
  if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
  else {
    let i = r.indexOf('-') === -1 ? void 0 : Fe.DashCase;
    o == null
      ? e.removeStyle(n, r, i)
      : (typeof o == 'string' && o.endsWith('!important') && ((o = o.slice(0, -10)), (i |= Fe.Important)),
        e.setStyle(n, r, o, i));
  }
}
function Og(e, t, n) {
  e.setAttribute(t, 'style', n);
}
function Pl(e, t, n) {
  n === '' ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n);
}
function Fl(e, t, n) {
  let { mergedAttrs: r, classes: o, styles: i } = n;
  r !== null && _i(e, t, r), o !== null && Pl(e, t, o), i !== null && Og(e, t, i);
}
var Ui = class {
  constructor(t) {
    this.changingThisBreaksApplicationSecurity = t;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${yh})`;
  }
};
function Ts(e) {
  return e instanceof Ui ? e.changingThisBreaksApplicationSecurity : e;
}
function Pg() {
  let e = new dt();
  return p(Le) === 'browser' && (e.store = Fg(no(), p(ro))), e;
}
var dt = (() => {
  let t = class t {
    constructor() {
      (this.store = {}), (this.onSerializeCallbacks = {});
    }
    get(r, o) {
      return this.store[r] !== void 0 ? this.store[r] : o;
    }
    set(r, o) {
      this.store[r] = o;
    }
    remove(r) {
      delete this.store[r];
    }
    hasKey(r) {
      return this.store.hasOwnProperty(r);
    }
    get isEmpty() {
      return Object.keys(this.store).length === 0;
    }
    onSerialize(r, o) {
      this.onSerializeCallbacks[r] = o;
    }
    toJson() {
      for (let r in this.onSerializeCallbacks)
        if (this.onSerializeCallbacks.hasOwnProperty(r))
          try {
            this.store[r] = this.onSerializeCallbacks[r]();
          } catch (o) {
            console.warn('Exception in onSerialize callback: ', o);
          }
      return JSON.stringify(this.store).replace(/</g, '\\u003C');
    }
  };
  t.ɵprov = C({ token: t, providedIn: 'root', factory: Pg });
  let e = t;
  return e;
})();
function Fg(e, t) {
  let n = e.getElementById(t + '-state');
  if (n?.textContent)
    try {
      return JSON.parse(n.textContent);
    } catch (r) {
      console.warn('Exception while restoring TransferState for app ' + t, r);
    }
  return {};
}
var kl = 'h',
  Ll = 'b',
  Bi = (function (e) {
    return (e.FirstChild = 'f'), (e.NextSibling = 'n'), e;
  })(Bi || {}),
  kg = 'e',
  Lg = 't',
  xs = 'c',
  jl = 'x',
  Lr = 'r',
  jg = 'i',
  Vg = 'n',
  $g = 'd',
  Ug = '__nghData__',
  Vl = Ug,
  vi = 'ngh',
  Bg = 'nghm',
  $l = (e, t, n) => null;
function Hg(e, t, n = !1) {
  let r = e.getAttribute(vi);
  if (r == null) return null;
  let [o, i] = r.split('|');
  if (((r = n ? i : o), !r)) return null;
  let s = n ? o : i ? `|${i}` : '',
    a = {};
  if (r !== '') {
    let c = t.get(dt, null, { optional: !0 });
    c !== null && (a = c.get(Vl, [])[Number(r)]);
  }
  let u = { data: a, firstChild: e.firstChild ?? null };
  return n && ((u.firstChild = e), oo(u, 0, e.nextSibling)), s ? e.setAttribute(vi, s) : e.removeAttribute(vi), u;
}
function zg() {
  $l = Hg;
}
function _s(e, t, n = !1) {
  return $l(e, t, n);
}
function Wg(e) {
  let t = e._lView;
  return t[x].type === 2 ? null : (Sc(t) && (t = t[ie]), t);
}
function Gg(e) {
  return e.textContent?.replace(/\s/gm, '');
}
function qg(e) {
  let t = no(),
    n = t.createNodeIterator(e, NodeFilter.SHOW_COMMENT, {
      acceptNode(i) {
        let s = Gg(i);
        return s === 'ngetn' || s === 'ngtns' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    }),
    r,
    o = [];
  for (; (r = n.nextNode()); ) o.push(r);
  for (let i of o) i.textContent === 'ngetn' ? i.replaceWith(t.createTextNode('')) : i.remove();
}
function oo(e, t, n) {
  (e.segmentHeads ??= {}), (e.segmentHeads[t] = n);
}
function Hi(e, t) {
  return e.segmentHeads?.[t] ?? null;
}
function Zg(e, t) {
  let n = e.data,
    r = n[kg]?.[t] ?? null;
  return r === null && n[xs]?.[t] && (r = As(e, t)), r;
}
function Ul(e, t) {
  return e.data[xs]?.[t] ?? null;
}
function As(e, t) {
  let n = Ul(e, t) ?? [],
    r = 0;
  for (let o of n) r += o[Lr] * (o[jl] ?? 1);
  return r;
}
function io(e, t) {
  if (typeof e.disconnectedNodes > 'u') {
    let n = e.data[$g];
    e.disconnectedNodes = n ? new Set(n) : null;
  }
  return !!e.disconnectedNodes?.has(t);
}
var zi = class {},
  jr = class {};
function Yg(e) {
  let t = Error(`No component factory found for ${ee(e)}.`);
  return (t[Qg] = e), t;
}
var Qg = 'ngComponent';
var Wi = class {
    resolveComponentFactory(t) {
      throw Yg(t);
    }
  },
  so = (() => {
    let t = class t {};
    t.NULL = new Wi();
    let e = t;
    return e;
  })();
function Kg() {
  return Ns(We(), Z());
}
function Ns(e, t) {
  return new ao(Ee(e, t));
}
var ao = (() => {
  let t = class t {
    constructor(r) {
      this.nativeElement = r;
    }
  };
  t.__NG_ELEMENT_ID__ = Kg;
  let e = t;
  return e;
})();
var gn = class {};
var Jg = (() => {
    let t = class t {};
    t.ɵprov = C({ token: t, providedIn: 'root', factory: () => null });
    let e = t;
    return e;
  })(),
  kt = class {
    constructor(t) {
      (this.full = t),
        (this.major = t.split('.')[0]),
        (this.minor = t.split('.')[1]),
        (this.patch = t.split('.').slice(2).join('.'));
    }
  },
  Xg = new kt('17.0.7'),
  yi = {};
function Vr(e, t, n, r, o = !1) {
  for (; n !== null; ) {
    let i = t[n.index];
    i !== null && r.push(Te(i)), he(i) && em(i, r);
    let s = n.type;
    if (s & 8) Vr(e, t, n.child, r);
    else if (s & 32) {
      let a = Es(n, t),
        u;
      for (; (u = a()); ) r.push(u);
    } else if (s & 16) {
      let a = Al(t, n);
      if (Array.isArray(a)) r.push(...a);
      else {
        let u = Is(t[oe]);
        Vr(u[x], u, a, r, !0);
      }
    }
    n = o ? n.projectionNext : n.next;
  }
  return r;
}
function em(e, t) {
  for (let n = ne; n < e.length; n++) {
    let r = e[n],
      o = r[x].firstChild;
    o !== null && Vr(r[x], r, o, t);
  }
  e[Pe] !== e[re] && t.push(e[Pe]);
}
var Bl = [];
function tm(e) {
  return e[st] ?? nm(e);
}
function nm(e) {
  let t = Bl.pop() ?? Object.create(om);
  return (t.lView = e), t;
}
function rm(e) {
  e.lView[st] !== e && ((e.lView = null), Bl.push(e));
}
var om = V(g({}, Wa), {
    consumerIsAlwaysLive: !0,
    consumerMarkedDirty: e => {
      Xr(e.lView);
    },
    consumerOnSignalRead() {
      this.lView[st] = this;
    },
  }),
  im = 'ngOriginalError';
function Di(e) {
  return e[im];
}
var ke = class {
    constructor() {
      this._console = console;
    }
    handleError(t) {
      let n = this._findOriginalError(t);
      this._console.error('ERROR', t), n && this._console.error('ORIGINAL ERROR', n);
    }
    _findOriginalError(t) {
      let n = t && Di(t);
      for (; n && Di(n); ) n = Di(n);
      return n || null;
    }
  },
  Hl = new I('', { providedIn: 'root', factory: () => p(ke).handleError.bind(void 0) }),
  Dr = new I(''),
  zl = !1,
  Wl = new I('', { providedIn: 'root', factory: () => zl });
var Mn = {};
function iS(e) {
  Gl(ct(), Z(), En() + e, !1);
}
function Gl(e, t, n, r) {
  if (!r)
    if ((t[D] & 3) === 3) {
      let i = e.preOrderCheckHooks;
      i !== null && Er(t, i, n);
    } else {
      let i = e.preOrderHooks;
      i !== null && Ir(t, i, 0, n);
    }
  at(n);
}
function Rs(e, t = M.Default) {
  let n = Z();
  if (n === null) return _(e, t);
  let r = We();
  return rl(r, n, fe(e), t);
}
function sm(e, t) {
  let n = e.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        if (o < 0) at(~o);
        else {
          let i = o,
            s = n[++r],
            a = n[++r];
          Ep(s, i);
          let u = t[i];
          a(2, u);
        }
      }
    } finally {
      at(-1);
    }
}
function Os(e, t, n, r, o, i, s, a, u, c, l) {
  let d = t.blueprint.slice();
  return (
    (d[re] = o),
    (d[D] = r | 4 | 128 | 8),
    (c !== null || (e && e[D] & 2048)) && (d[D] |= 2048),
    Rc(d),
    (d[U] = d[Dn] = e),
    (d[He] = n),
    (d[cn] = s || (e && e[cn])),
    (d[H] = a || (e && e[H])),
    (d[Rt] = u || (e && e[Rt]) || null),
    (d[se] = i),
    (d[Kr] = hg()),
    (d[Se] = l),
    (d[Ic] = c),
    (d[oe] = t.type == 2 ? e[oe] : d),
    d
  );
}
function uo(e, t, n, r, o) {
  let i = e.data[t];
  if (i === null) (i = am(e, t, n, r, o)), Cp() && (i.flags |= 32);
  else if (i.type & 64) {
    (i.type = n), (i.value = r), (i.attrs = o);
    let s = vp();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return eo(i, !0), i;
}
function am(e, t, n, r, o) {
  let i = kc(),
    s = Lc(),
    a = s ? i : i && i.parent,
    u = (e.data[t] = gm(e, a, n, t, r, o));
  return (
    e.firstChild === null && (e.firstChild = u),
    i !== null &&
      (s ? i.child == null && u.parent !== null && (i.child = u) : i.next === null && ((i.next = u), (u.prev = i))),
    u
  );
}
function ql(e, t, n, r) {
  if (n === 0) return -1;
  let o = t.length;
  for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
  return o;
}
function Zl(e, t, n, r, o) {
  let i = En(),
    s = r & 2;
  try {
    at(-1), s && t.length > ie && Gl(e, t, ie, !1), Be(s ? 2 : 0, o), n(r, o);
  } finally {
    at(i), Be(s ? 3 : 1, o);
  }
}
function Yl(e, t, n) {
  if (Mc(t)) {
    let r = te(null);
    try {
      let o = t.directiveStart,
        i = t.directiveEnd;
      for (let s = o; s < i; s++) {
        let a = e.data[s];
        a.contentQueries && a.contentQueries(1, n[s], s);
      }
    } finally {
      te(r);
    }
  }
}
function um(e, t, n) {
  Fc() && (Im(e, t, n, Ee(n, t)), (n.flags & 64) === 64 && ed(e, t, n));
}
function cm(e, t, n = Ee) {
  let r = t.localNames;
  if (r !== null) {
    let o = t.index + 1;
    for (let i = 0; i < r.length; i += 2) {
      let s = r[i + 1],
        a = s === -1 ? n(t, e) : e[s];
      e[o++] = a;
    }
  }
}
function Ql(e) {
  let t = e.tView;
  return t === null || t.incompleteFirstPass
    ? (e.tView = Kl(
        1,
        null,
        e.template,
        e.decls,
        e.vars,
        e.directiveDefs,
        e.pipeDefs,
        e.viewQuery,
        e.schemas,
        e.consts,
        e.id
      ))
    : t;
}
function Kl(e, t, n, r, o, i, s, a, u, c, l) {
  let d = ie + r,
    f = d + o,
    h = lm(d, f),
    v = typeof c == 'function' ? c() : c;
  return (h[x] = {
    type: e,
    blueprint: h,
    template: n,
    queries: null,
    viewQuery: a,
    declTNode: t,
    data: h.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: f,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof i == 'function' ? i() : i,
    pipeRegistry: typeof s == 'function' ? s() : s,
    firstChild: null,
    schemas: u,
    consts: v,
    incompleteFirstPass: !1,
    ssrId: l,
  });
}
function lm(e, t) {
  let n = [];
  for (let r = 0; r < t; r++) n.push(r < e ? null : Mn);
  return n;
}
function dm(e, t, n, r) {
  let i = r.get(Wl, zl) || n === Me.ShadowDom,
    s = e.selectRootElement(t, i);
  return fm(s), s;
}
function fm(e) {
  Jl(e);
}
var Jl = e => null;
function hm(e) {
  vl(e) ? Rl(e) : qg(e);
}
function pm() {
  Jl = hm;
}
function gm(e, t, n, r, o, i) {
  let s = t ? t.injectorIndex : -1,
    a = 0;
  return (
    $t() && (a |= 128),
    {
      type: n,
      index: r,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: o,
      attrs: i,
      mergedAttrs: null,
      localNames: null,
      initialInputs: void 0,
      inputs: null,
      outputs: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: t,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
function Wu(e, t, n, r) {
  for (let o in e)
    if (e.hasOwnProperty(o)) {
      n = n === null ? {} : n;
      let i = e[o];
      r === null ? Gu(n, t, o, i) : r.hasOwnProperty(o) && Gu(n, t, r[o], i);
    }
  return n;
}
function Gu(e, t, n, r) {
  e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
}
function mm(e, t, n) {
  let r = t.directiveStart,
    o = t.directiveEnd,
    i = e.data,
    s = t.attrs,
    a = [],
    u = null,
    c = null;
  for (let l = r; l < o; l++) {
    let d = i[l],
      f = n ? n.get(d) : null,
      h = f ? f.inputs : null,
      v = f ? f.outputs : null;
    (u = Wu(d.inputs, l, u, h)), (c = Wu(d.outputs, l, c, v));
    let S = u !== null && s !== null && !pc(t) ? Rm(u, l, s) : null;
    a.push(S);
  }
  u !== null && (u.hasOwnProperty('class') && (t.flags |= 8), u.hasOwnProperty('style') && (t.flags |= 16)),
    (t.initialInputs = a),
    (t.inputs = u),
    (t.outputs = c);
}
function vm(e) {
  return e === 'class'
    ? 'className'
    : e === 'for'
      ? 'htmlFor'
      : e === 'formaction'
        ? 'formAction'
        : e === 'innerHtml'
          ? 'innerHTML'
          : e === 'readonly'
            ? 'readOnly'
            : e === 'tabindex'
              ? 'tabIndex'
              : e;
}
function ym(e, t, n, r, o, i, s, a) {
  let u = Ee(t, n),
    c = t.inputs,
    l;
  !a && c != null && (l = c[r])
    ? (Fs(e, n, l, r, o), wn(t) && Dm(n, t.index))
    : t.type & 3
      ? ((r = vm(r)), (o = s != null ? s(o, t.value || '', r) : o), i.setProperty(u, r, o))
      : t.type & 12;
}
function Dm(e, t) {
  let n = Vt(t, e);
  n[D] & 16 || (n[D] |= 64);
}
function wm(e, t, n, r) {
  if (Fc()) {
    let o = r === null ? null : { '': -1 },
      i = Mm(e, n),
      s,
      a;
    i === null ? (s = a = null) : ([s, a] = i), s !== null && Xl(e, t, n, s, o, a), o && Sm(n, r, o);
  }
  n.mergedAttrs = as(n.mergedAttrs, n.attrs);
}
function Xl(e, t, n, r, o, i) {
  for (let c = 0; c < r.length; c++) Lp(Xc(n, t), e, r[c].type);
  xm(n, e.data.length, r.length);
  for (let c = 0; c < r.length; c++) {
    let l = r[c];
    l.providersResolver && l.providersResolver(l);
  }
  let s = !1,
    a = !1,
    u = ql(e, t, r.length, null);
  for (let c = 0; c < r.length; c++) {
    let l = r[c];
    (n.mergedAttrs = as(n.mergedAttrs, l.hostAttrs)),
      _m(e, n, t, u, l),
      Tm(u, l, o),
      l.contentQueries !== null && (n.flags |= 4),
      (l.hostBindings !== null || l.hostAttrs !== null || l.hostVars !== 0) && (n.flags |= 64);
    let d = l.type.prototype;
    !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
      !a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
      u++;
  }
  mm(e, n, i);
}
function Cm(e, t, n, r, o) {
  let i = o.hostBindings;
  if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~t.index;
    Em(s) != a && s.push(a), s.push(n, r, i);
  }
}
function Em(e) {
  let t = e.length;
  for (; t > 0; ) {
    let n = e[--t];
    if (typeof n == 'number' && n < 0) return n;
  }
  return 0;
}
function Im(e, t, n, r) {
  let o = n.directiveStart,
    i = n.directiveEnd;
  wn(n) && Am(t, n, e.data[o + n.componentOffset]), e.firstCreatePass || Xc(n, t), Ft(r, t);
  let s = n.initialInputs;
  for (let a = o; a < i; a++) {
    let u = e.data[a],
      c = hn(t, e, a, n);
    if ((Ft(c, t), s !== null && Nm(t, a - o, c, u, n, s), Cn(u))) {
      let l = Vt(n.index, t);
      l[He] = hn(t, e, a, n);
    }
  }
}
function ed(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd,
    i = n.index,
    s = Ip();
  try {
    at(i);
    for (let a = r; a < o; a++) {
      let u = e.data[a],
        c = t[a];
      Ni(a), (u.hostBindings !== null || u.hostVars !== 0 || u.hostAttrs !== null) && bm(u, c);
    }
  } finally {
    at(-1), Ni(s);
  }
}
function bm(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
function Mm(e, t) {
  let n = e.directiveRegistry,
    r = null,
    o = null;
  if (n)
    for (let i = 0; i < n.length; i++) {
      let s = n[i];
      if (gc(t, s.selectors, !1))
        if ((r || (r = []), Cn(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (o = o || new Map()), s.findHostDirectiveDefs(s, a, o), r.unshift(...a, s);
            let u = a.length;
            Gi(e, t, u);
          } else r.unshift(s), Gi(e, t, 0);
        else (o = o || new Map()), s.findHostDirectiveDefs?.(s, r, o), r.push(s);
    }
  return r === null ? null : [r, o];
}
function Gi(e, t, n) {
  (t.componentOffset = n), (e.components ??= []).push(t.index);
}
function Sm(e, t, n) {
  if (t) {
    let r = (e.localNames = []);
    for (let o = 0; o < t.length; o += 2) {
      let i = n[t[o + 1]];
      if (i == null) throw new y(-301, !1);
      r.push(t[o], i);
    }
  }
}
function Tm(e, t, n) {
  if (n) {
    if (t.exportAs) for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
    Cn(t) && (n[''] = e);
  }
}
function xm(e, t, n) {
  (e.flags |= 1), (e.directiveStart = t), (e.directiveEnd = t + n), (e.providerIndexes = t);
}
function _m(e, t, n, r, o) {
  e.data[r] = o;
  let i = o.factory || (o.factory = Pt(o.type, !0)),
    s = new fn(i, Cn(o), Rs);
  (e.blueprint[r] = s), (n[r] = s), Cm(e, t, r, ql(e, n, o.hostVars, Mn), o);
}
function Am(e, t, n) {
  let r = Ee(t, e),
    o = Ql(n),
    i = e[cn].rendererFactory,
    s = 16;
  n.signals ? (s = 4096) : n.onPush && (s = 64);
  let a = Ps(e, Os(e, o, null, s, r, t, null, i.createRenderer(r, n), null, null, null));
  e[t.index] = a;
}
function Nm(e, t, n, r, o, i) {
  let s = i[t];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let u = s[a++],
        c = s[a++],
        l = s[a++];
      td(r, n, u, c, l);
    }
}
function td(e, t, n, r, o) {
  let i = te(null);
  try {
    let s = e.inputTransforms;
    s !== null && s.hasOwnProperty(r) && (o = s[r].call(t, o)),
      e.setInput !== null ? e.setInput(t, o, n, r) : (t[r] = o);
  } finally {
    te(i);
  }
}
function Rm(e, t, n) {
  let r = null,
    o = 0;
  for (; o < n.length; ) {
    let i = n[o];
    if (i === 0) {
      o += 4;
      continue;
    } else if (i === 5) {
      o += 2;
      continue;
    }
    if (typeof i == 'number') break;
    if (e.hasOwnProperty(i)) {
      r === null && (r = []);
      let s = e[i];
      for (let a = 0; a < s.length; a += 2)
        if (s[a] === t) {
          r.push(i, s[a + 1], n[o + 1]);
          break;
        }
    }
    o += 2;
  }
  return r;
}
function Om(e, t, n, r) {
  return [e, !0, 0, t, null, r, null, n, null, null];
}
function nd(e, t) {
  let n = e.contentQueries;
  if (n !== null) {
    let r = te(null);
    try {
      for (let o = 0; o < n.length; o += 2) {
        let i = n[o],
          s = n[o + 1];
        if (s !== -1) {
          let a = e.data[s];
          Vc(i), a.contentQueries(2, t[s], s);
        }
      }
    } finally {
      te(r);
    }
  }
}
function Ps(e, t) {
  return e[ln] ? (e[Pu][Ce] = t) : (e[ln] = t), (e[Pu] = t), t;
}
function qi(e, t, n) {
  Vc(0);
  let r = te(null);
  try {
    t(e, n);
  } finally {
    te(r);
  }
}
function Pm(e, t) {
  let n = e[Rt],
    r = n ? n.get(ke, null) : null;
  r && r.handleError(t);
}
function Fs(e, t, n, r, o) {
  for (let i = 0; i < n.length; ) {
    let s = n[i++],
      a = n[i++],
      u = t[s],
      c = e.data[s];
    td(c, u, r, a, o);
  }
}
var Fm = 100;
function km(e, t = !0) {
  let n = e[cn],
    r = n.rendererFactory,
    o = n.afterRenderEventManager,
    i = !1;
  i || (r.begin?.(), o?.begin());
  try {
    Lm(e);
  } catch (s) {
    throw (t && Pm(e, s), s);
  } finally {
    i || (r.end?.(), n.inlineEffectRunner?.flush(), o?.end());
  }
}
function Lm(e) {
  Zi(e, 0);
  let t = 0;
  for (; Oc(e); ) {
    if (t === Fm) throw new y(103, !1);
    t++, Zi(e, 1);
  }
}
function jm(e, t, n, r) {
  let o = t[D];
  if ((o & 256) === 256) return;
  let i = !1;
  !i && t[cn].inlineEffectRunner?.flush(), fs(t);
  let s = null,
    a = null;
  !i && Vm(e) && ((a = tm(t)), (s = Ga(a)));
  try {
    Rc(t), yp(e.bindingStartIndex), n !== null && Zl(e, t, n, 2, r);
    let u = (o & 3) === 3;
    if (!i)
      if (u) {
        let d = e.preOrderCheckHooks;
        d !== null && Er(t, d, null);
      } else {
        let d = e.preOrderHooks;
        d !== null && Ir(t, d, 0, null), fi(t, 0);
      }
    if (($m(t), rd(t, 0), e.contentQueries !== null && nd(e, t), !i))
      if (u) {
        let d = e.contentCheckHooks;
        d !== null && Er(t, d);
      } else {
        let d = e.contentHooks;
        d !== null && Ir(t, d, 1), fi(t, 1);
      }
    sm(e, t);
    let c = e.components;
    c !== null && id(t, c, 0);
    let l = e.viewQuery;
    if ((l !== null && qi(2, l, r), !i))
      if (u) {
        let d = e.viewCheckHooks;
        d !== null && Er(t, d);
      } else {
        let d = e.viewHooks;
        d !== null && Ir(t, d, 2), fi(t, 2);
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[di])) {
      for (let d of t[di]) d();
      t[di] = null;
    }
    i || (t[D] &= -73);
  } catch (u) {
    throw (Xr(t), u);
  } finally {
    a !== null && (qa(a, s), rm(a)), hs();
  }
}
function Vm(e) {
  return e.type !== 2;
}
function rd(e, t) {
  for (let n = Dl(e); n !== null; n = wl(n)) {
    n[D] &= ~Ot.HasChildViewsToRefresh;
    for (let r = ne; r < n.length; r++) {
      let o = n[r];
      od(o, t);
    }
  }
}
function $m(e) {
  for (let t = Dl(e); t !== null; t = wl(t)) {
    if (!(t[D] & Ot.HasTransplantedViews)) continue;
    let n = t[Ar];
    for (let r = 0; r < n.length; r++) {
      let o = n[r],
        i = o[U];
      cp(o);
    }
  }
}
function Um(e, t, n) {
  let r = Vt(t, e);
  od(r, n);
}
function od(e, t) {
  ds(e) && Zi(e, t);
}
function Zi(e, t) {
  let r = e[x],
    o = e[D],
    i = e[st],
    s = !!(t === 0 && o & 16);
  if (
    ((s ||= !!(o & 64 && t === 0)),
    (s ||= !!(o & 1024)),
    (s ||= !!(i?.dirty && Bo(i))),
    i && (i.dirty = !1),
    (e[D] &= -9217),
    s)
  )
    jm(r, e, r.template, e[He]);
  else if (o & 8192) {
    rd(e, 1);
    let a = r.components;
    a !== null && id(e, a, 1);
  }
}
function id(e, t, n) {
  for (let r = 0; r < t.length; r++) Um(e, t[r], n);
}
function sd(e) {
  for (; e; ) {
    e[D] |= 64;
    let t = Is(e);
    if (Sc(e) && !t) return e;
    e = t;
  }
  return null;
}
var Lt = class {
    get rootNodes() {
      let t = this._lView,
        n = t[x];
      return Vr(n, t, n.firstChild, []);
    }
    constructor(t, n, r = !0) {
      (this._lView = t),
        (this._cdRefInjectingView = n),
        (this.notifyErrorHandler = r),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[He];
    }
    set context(t) {
      this._lView[He] = t;
    }
    get destroyed() {
      return (this._lView[D] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let t = this._lView[U];
        if (he(t)) {
          let n = t[_r],
            r = n ? n.indexOf(this) : -1;
          r > -1 && (Vi(t, r), Or(n, r));
        }
        this._attachedToViewContainer = !1;
      }
      Ml(this._lView[x], this._lView);
    }
    onDestroy(t) {
      lp(this._lView, t);
    }
    markForCheck() {
      sd(this._cdRefInjectingView || this._lView);
    }
    detach() {
      this._lView[D] &= -129;
    }
    reattach() {
      Pc(this._lView), (this._lView[D] |= 128);
    }
    detectChanges() {
      (this._lView[D] |= 1024), km(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new y(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      (this._appRef = null), Dg(this._lView[x], this._lView);
    }
    attachToAppRef(t) {
      if (this._attachedToViewContainer) throw new y(902, !1);
      this._appRef = t;
    }
  },
  co = (() => {
    let t = class t {};
    t.__NG_ELEMENT_ID__ = Bm;
    let e = t;
    return e;
  })();
function Bm(e) {
  return Hm(We(), Z(), (e & 16) === 16);
}
function Hm(e, t, n) {
  if (wn(e) && !n) {
    let r = Vt(e.index, t);
    return new Lt(r, r);
  } else if (e.type & 47) {
    let r = t[oe];
    return new Lt(r, t);
  }
  return null;
}
var qu = new Set();
function Sn(e) {
  qu.has(e) || (qu.add(e), performance?.mark?.('mark_feature_usage', { detail: { feature: e } }));
}
var Yi = class extends q {
  constructor(t = !1) {
    super(), (this.__isAsync = t);
  }
  emit(t) {
    super.next(t);
  }
  subscribe(t, n, r) {
    let o = t,
      i = n || (() => null),
      s = r;
    if (t && typeof t == 'object') {
      let u = t;
      (o = u.next?.bind(u)), (i = u.error?.bind(u)), (s = u.complete?.bind(u));
    }
    this.__isAsync && ((i = wi(i)), o && (o = wi(o)), s && (s = wi(s)));
    let a = super.subscribe({ next: o, error: i, complete: s });
    return t instanceof z && t.add(a), a;
  }
};
function wi(e) {
  return t => {
    setTimeout(e, void 0, t);
  };
}
var we = Yi;
function Zu(...e) {}
function zm() {
  let e = typeof rn.requestAnimationFrame == 'function',
    t = rn[e ? 'requestAnimationFrame' : 'setTimeout'],
    n = rn[e ? 'cancelAnimationFrame' : 'clearTimeout'];
  if (typeof Zone < 'u' && t && n) {
    let r = t[Zone.__symbol__('OriginalDelegate')];
    r && (t = r);
    let o = n[Zone.__symbol__('OriginalDelegate')];
    o && (n = o);
  }
  return { nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: n };
}
var j = class e {
    constructor({
      enableLongStackTrace: t = !1,
      shouldCoalesceEventChangeDetection: n = !1,
      shouldCoalesceRunChangeDetection: r = !1,
    }) {
      if (
        ((this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new we(!1)),
        (this.onMicrotaskEmpty = new we(!1)),
        (this.onStable = new we(!1)),
        (this.onError = new we(!1)),
        typeof Zone > 'u')
      )
        throw new y(908, !1);
      Zone.assertZonePatched();
      let o = this;
      (o._nesting = 0),
        (o._outer = o._inner = Zone.current),
        Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
        t && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
        (o.shouldCoalesceEventChangeDetection = !r && n),
        (o.shouldCoalesceRunChangeDetection = r),
        (o.lastRequestAnimationFrameId = -1),
        (o.nativeRequestAnimationFrame = zm().nativeRequestAnimationFrame),
        qm(o);
    }
    static isInAngularZone() {
      return typeof Zone < 'u' && Zone.current.get('isAngularZone') === !0;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new y(909, !1);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new y(909, !1);
    }
    run(t, n, r) {
      return this._inner.run(t, n, r);
    }
    runTask(t, n, r, o) {
      let i = this._inner,
        s = i.scheduleEventTask('NgZoneEvent: ' + o, t, Wm, Zu, Zu);
      try {
        return i.runTask(s, n, r);
      } finally {
        i.cancelTask(s);
      }
    }
    runGuarded(t, n, r) {
      return this._inner.runGuarded(t, n, r);
    }
    runOutsideAngular(t) {
      return this._outer.run(t);
    }
  },
  Wm = {};
function ks(e) {
  if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
      e._nesting++, e.onMicrotaskEmpty.emit(null);
    } finally {
      if ((e._nesting--, !e.hasPendingMicrotasks))
        try {
          e.runOutsideAngular(() => e.onStable.emit(null));
        } finally {
          e.isStable = !0;
        }
    }
}
function Gm(e) {
  e.isCheckStableRunning ||
    e.lastRequestAnimationFrameId !== -1 ||
    ((e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(rn, () => {
      e.fakeTopEventTask ||
        (e.fakeTopEventTask = Zone.root.scheduleEventTask(
          'fakeTopEventTask',
          () => {
            (e.lastRequestAnimationFrameId = -1),
              Qi(e),
              (e.isCheckStableRunning = !0),
              ks(e),
              (e.isCheckStableRunning = !1);
          },
          void 0,
          () => {},
          () => {}
        )),
        e.fakeTopEventTask.invoke();
    })),
    Qi(e));
}
function qm(e) {
  let t = () => {
    Gm(e);
  };
  e._inner = e._inner.fork({
    name: 'angular',
    properties: { isAngularZone: !0 },
    onInvokeTask: (n, r, o, i, s, a) => {
      if (Zm(a)) return n.invokeTask(o, i, s, a);
      try {
        return Yu(e), n.invokeTask(o, i, s, a);
      } finally {
        ((e.shouldCoalesceEventChangeDetection && i.type === 'eventTask') || e.shouldCoalesceRunChangeDetection) && t(),
          Qu(e);
      }
    },
    onInvoke: (n, r, o, i, s, a, u) => {
      try {
        return Yu(e), n.invoke(o, i, s, a, u);
      } finally {
        e.shouldCoalesceRunChangeDetection && t(), Qu(e);
      }
    },
    onHasTask: (n, r, o, i) => {
      n.hasTask(o, i),
        r === o &&
          (i.change == 'microTask'
            ? ((e._hasPendingMicrotasks = i.microTask), Qi(e), ks(e))
            : i.change == 'macroTask' && (e.hasPendingMacrotasks = i.macroTask));
    },
    onHandleError: (n, r, o, i) => (n.handleError(o, i), e.runOutsideAngular(() => e.onError.emit(i)), !1),
  });
}
function Qi(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && e.lastRequestAnimationFrameId !== -1)
    ? (e.hasPendingMicrotasks = !0)
    : (e.hasPendingMicrotasks = !1);
}
function Yu(e) {
  e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function Qu(e) {
  e._nesting--, ks(e);
}
var ad = new I('', { providedIn: 'root', factory: ud });
function ud() {
  let e = p(j),
    t = !0,
    n = new N(o => {
      (t = e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
        e.runOutsideAngular(() => {
          o.next(t), o.complete();
        });
    }),
    r = new N(o => {
      let i;
      e.runOutsideAngular(() => {
        i = e.onStable.subscribe(() => {
          j.assertNotInAngularZone(),
            queueMicrotask(() => {
              !t && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks && ((t = !0), o.next(!0));
            });
        });
      });
      let s = e.onUnstable.subscribe(() => {
        j.assertInAngularZone(),
          t &&
            ((t = !1),
            e.runOutsideAngular(() => {
              o.next(!1);
            }));
      });
      return () => {
        i.unsubscribe(), s.unsubscribe();
      };
    });
  return ni(n, r.pipe(ui()));
}
function Zm(e) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0].data?.__ignore_ng_zone__ === !0;
}
var Ym = (() => {
  let t = class t {
    constructor() {
      (this.renderDepth = 0), (this.handler = null), (this.internalCallbacks = []);
    }
    begin() {
      this.handler?.validateBegin(), this.renderDepth++;
    }
    end() {
      if ((this.renderDepth--, this.renderDepth === 0)) {
        for (let r of this.internalCallbacks) r();
        (this.internalCallbacks.length = 0), this.handler?.execute();
      }
    }
    ngOnDestroy() {
      this.handler?.destroy(), (this.handler = null), (this.internalCallbacks.length = 0);
    }
  };
  t.ɵprov = C({ token: t, providedIn: 'root', factory: () => new t() });
  let e = t;
  return e;
})();
function Qm(e, t) {
  let n = Vt(t, e),
    r = n[x];
  Km(r, n);
  let o = n[re];
  o !== null && n[Se] === null && (n[Se] = _s(o, n[Rt])), cd(r, n, n[He]);
}
function Km(e, t) {
  for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
}
function cd(e, t, n) {
  fs(t);
  try {
    let r = e.viewQuery;
    r !== null && qi(1, r, n);
    let o = e.template;
    o !== null && Zl(e, t, o, 1, n),
      e.firstCreatePass && (e.firstCreatePass = !1),
      e.staticContentQueries && nd(e, t),
      e.staticViewQueries && qi(2, e.viewQuery, n);
    let i = e.components;
    i !== null && Jm(t, i);
  } catch (r) {
    throw (e.firstCreatePass && ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)), r);
  } finally {
    (t[D] &= -5), hs();
  }
}
function Jm(e, t) {
  for (let n = 0; n < t.length; n++) Qm(e, t[n]);
}
function Ki(e, t, n) {
  let r = n ? e.styles : null,
    o = n ? e.classes : null,
    i = 0;
  if (t !== null)
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (typeof a == 'number') i = a;
      else if (i == 1) o = Si(o, a);
      else if (i == 2) {
        let u = a,
          c = t[++s];
        r = Si(r, u + ': ' + c + ';');
      }
    }
  n ? (e.styles = r) : (e.stylesWithoutHost = r), n ? (e.classes = o) : (e.classesWithoutHost = o);
}
var $r = class extends so {
  constructor(t) {
    super(), (this.ngModule = t);
  }
  resolveComponentFactory(t) {
    let n = it(t);
    return new mn(n, this.ngModule);
  }
};
function Ku(e) {
  let t = [];
  for (let n in e)
    if (e.hasOwnProperty(n)) {
      let r = e[n];
      t.push({ propName: r, templateName: n });
    }
  return t;
}
function Xm(e) {
  let t = e.toLowerCase();
  return t === 'svg' ? Ac : t === 'math' ? sp : null;
}
var Ji = class {
    constructor(t, n) {
      (this.injector = t), (this.parentInjector = n);
    }
    get(t, n, r) {
      r = Zr(r);
      let o = this.injector.get(t, yi, r);
      return o !== yi || n === yi ? o : this.parentInjector.get(t, n, r);
    }
  },
  mn = class extends jr {
    get inputs() {
      let t = this.componentDef,
        n = t.inputTransforms,
        r = Ku(t.inputs);
      if (n !== null) for (let o of r) n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
      return r;
    }
    get outputs() {
      return Ku(this.componentDef.outputs);
    }
    constructor(t, n) {
      super(),
        (this.componentDef = t),
        (this.ngModule = n),
        (this.componentType = t.type),
        (this.selector = Kh(t.selectors)),
        (this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : []),
        (this.isBoundToModule = !!n);
    }
    create(t, n, r, o) {
      o = o || this.ngModule;
      let i = o instanceof pe ? o : o?.injector;
      i && this.componentDef.getStandaloneInjector !== null && (i = this.componentDef.getStandaloneInjector(i) || i);
      let s = i ? new Ji(t, i) : t,
        a = s.get(gn, null);
      if (a === null) throw new y(407, !1);
      let u = s.get(Jg, null),
        c = s.get(Ym, null),
        l = { rendererFactory: a, sanitizer: u, inlineEffectRunner: null, afterRenderEventManager: c },
        d = a.createRenderer(null, this.componentDef),
        f = this.componentDef.selectors[0][0] || 'div',
        h = r ? dm(d, r, this.componentDef.encapsulation, s) : bs(d, f, Xm(f)),
        v = 4608,
        S = this.componentDef.onPush ? 576 : 528,
        Y = this.componentDef.signals ? v : S,
        P = null;
      h !== null && (P = _s(h, s, !0));
      let ce = Kl(0, null, null, 1, 0, null, null, null, null, null, null),
        Xe = Os(null, ce, null, Y, null, null, l, d, s, null, P);
      fs(Xe);
      let Va, Yn;
      try {
        let je = this.componentDef,
          vt,
          $o = null;
        je.findHostDirectiveDefs
          ? ((vt = []), ($o = new Map()), je.findHostDirectiveDefs(je, vt, $o), vt.push(je))
          : (vt = [je]);
        let $f = ev(Xe, h),
          Uf = tv($f, h, je, vt, Xe, l, d);
        (Yn = Nc(ce, ie)),
          h && ov(d, je, h, r),
          n !== void 0 && iv(Yn, this.ngContentSelectors, n),
          (Va = rv(Uf, je, vt, $o, Xe, [sv])),
          cd(ce, Xe, null);
      } finally {
        hs();
      }
      return new Xi(this.componentType, Va, Ns(Yn, Xe), Xe, Yn);
    }
  },
  Xi = class extends zi {
    constructor(t, n, r, o, i) {
      super(),
        (this.location = r),
        (this._rootLView = o),
        (this._tNode = i),
        (this.previousInputValues = null),
        (this.instance = n),
        (this.hostView = this.changeDetectorRef = new Lt(o, void 0, !1)),
        (this.componentType = t);
    }
    setInput(t, n) {
      let r = this._tNode.inputs,
        o;
      if (r !== null && (o = r[t])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n))
        )
          return;
        let i = this._rootLView;
        Fs(i[x], i, o, t, n), this.previousInputValues.set(t, n);
        let s = Vt(this._tNode.index, i);
        sd(s);
      }
    }
    get injector() {
      return new ot(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(t) {
      this.hostView.onDestroy(t);
    }
  };
function ev(e, t) {
  let n = e[x],
    r = ie;
  return (e[r] = t), uo(n, r, 2, '#host', null);
}
function tv(e, t, n, r, o, i, s) {
  let a = o[x];
  nv(r, e, t, s);
  let u = null;
  t !== null && (u = _s(t, o[Rt]));
  let c = i.rendererFactory.createRenderer(t, n),
    l = 16;
  n.signals ? (l = 4096) : n.onPush && (l = 64);
  let d = Os(o, Ql(n), null, l, o[e.index], e, i, c, null, null, u);
  return a.firstCreatePass && Gi(a, e, r.length - 1), Ps(o, d), (o[e.index] = d);
}
function nv(e, t, n, r) {
  for (let o of e) t.mergedAttrs = as(t.mergedAttrs, o.hostAttrs);
  t.mergedAttrs !== null && (Ki(t, t.mergedAttrs, !0), n !== null && Fl(r, n, t));
}
function rv(e, t, n, r, o, i) {
  let s = We(),
    a = o[x],
    u = Ee(s, o);
  Xl(a, o, s, n, null, r);
  for (let l = 0; l < n.length; l++) {
    let d = s.directiveStart + l,
      f = hn(o, a, d, s);
    Ft(f, o);
  }
  ed(a, o, s), u && Ft(u, o);
  let c = hn(o, a, s.directiveStart + s.componentOffset, s);
  if (((e[He] = o[He] = c), i !== null)) for (let l of i) l(c, t);
  return Yl(a, s, e), c;
}
function ov(e, t, n, r) {
  if (r) _i(e, n, ['ng-version', Xg.full]);
  else {
    let { attrs: o, classes: i } = Jh(t.selectors[0]);
    o && _i(e, n, o), i && i.length > 0 && Pl(e, n, i.join(' '));
  }
}
function iv(e, t, n) {
  let r = (e.projection = []);
  for (let o = 0; o < t.length; o++) {
    let i = n[o];
    r.push(i != null ? Array.from(i) : null);
  }
}
function sv() {
  let e = We();
  Zc(Z()[x], e);
}
function ld(e, t, n) {
  let r = e[t];
  return Object.is(r, n) ? !1 : ((e[t] = n), !0);
}
function wr(e, t) {
  return (e << 17) | (t << 2);
}
function ut(e) {
  return (e >> 17) & 32767;
}
function av(e) {
  return (e & 2) == 2;
}
function uv(e, t) {
  return (e & 131071) | (t << 17);
}
function es(e) {
  return e | 2;
}
function jt(e) {
  return (e & 131068) >> 2;
}
function Ci(e, t) {
  return (e & -131069) | (t << 2);
}
function cv(e) {
  return (e & 1) === 1;
}
function ts(e) {
  return e | 1;
}
function lv(e, t, n, r, o, i) {
  let s = i ? t.classBindings : t.styleBindings,
    a = ut(s),
    u = jt(s);
  e[r] = n;
  let c = !1,
    l;
  if (Array.isArray(n)) {
    let d = n;
    (l = d[1]), (l === null || In(d, l) > 0) && (c = !0);
  } else l = n;
  if (o)
    if (u !== 0) {
      let f = ut(e[a + 1]);
      (e[r + 1] = wr(f, a)), f !== 0 && (e[f + 1] = Ci(e[f + 1], r)), (e[a + 1] = uv(e[a + 1], r));
    } else (e[r + 1] = wr(a, 0)), a !== 0 && (e[a + 1] = Ci(e[a + 1], r)), (a = r);
  else (e[r + 1] = wr(u, 0)), a === 0 ? (a = r) : (e[u + 1] = Ci(e[u + 1], r)), (u = r);
  c && (e[r + 1] = es(e[r + 1])),
    Ju(e, l, r, !0, i),
    Ju(e, l, r, !1, i),
    dv(t, l, e, r, i),
    (s = wr(a, u)),
    i ? (t.classBindings = s) : (t.styleBindings = s);
}
function dv(e, t, n, r, o) {
  let i = o ? e.residualClasses : e.residualStyles;
  i != null && typeof t == 'string' && In(i, t) >= 0 && (n[r + 1] = ts(n[r + 1]));
}
function Ju(e, t, n, r, o) {
  let i = e[n + 1],
    s = t === null,
    a = r ? ut(i) : jt(i),
    u = !1;
  for (; a !== 0 && (u === !1 || s); ) {
    let c = e[a],
      l = e[a + 1];
    fv(c, t) && ((u = !0), (e[a + 1] = r ? ts(l) : es(l))), (a = r ? ut(l) : jt(l));
  }
  u && (e[n + 1] = r ? es(i) : ts(i));
}
function fv(e, t) {
  return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t
    ? !0
    : Array.isArray(e) && typeof t == 'string'
      ? In(e, t) >= 0
      : !1;
}
var De = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function hv(e) {
  return e.substring(De.key, De.keyEnd);
}
function pv(e) {
  return gv(e), dd(e, fd(e, 0, De.textEnd));
}
function dd(e, t) {
  let n = De.textEnd;
  return n === t ? -1 : ((t = De.keyEnd = mv(e, (De.key = t), n)), fd(e, t, n));
}
function gv(e) {
  (De.key = 0), (De.keyEnd = 0), (De.value = 0), (De.valueEnd = 0), (De.textEnd = e.length);
}
function fd(e, t, n) {
  for (; t < n && e.charCodeAt(t) <= 32; ) t++;
  return t;
}
function mv(e, t, n) {
  for (; t < n && e.charCodeAt(t) > 32; ) t++;
  return t;
}
function vv(e, t, n) {
  let r = Z(),
    o = Dp();
  if (ld(r, o, t)) {
    let i = ct(),
      s = Sp();
    ym(i, s, r, e, t, r[H], n, !1);
  }
  return vv;
}
function ns(e, t, n, r, o) {
  let i = t.inputs,
    s = o ? 'class' : 'style';
  Fs(e, n, i[s], s, r);
}
function sS(e) {
  Dv(Sv, yv, e, !0);
}
function yv(e, t) {
  for (let n = pv(t); n >= 0; n = dd(t, n)) vs(e, hv(t), !0);
}
function Dv(e, t, n, r) {
  let o = ct(),
    i = wp(2);
  o.firstUpdatePass && wv(o, null, i, r);
  let s = Z();
  if (n !== Mn && ld(s, i, n)) {
    let a = o.data[En()];
    if (pd(a, r) && !hd(o, i)) {
      let u = r ? a.classesWithoutHost : a.stylesWithoutHost;
      u !== null && (n = Si(u, n || '')), ns(o, a, s, n, r);
    } else Tv(o, a, s, s[H], s[i + 1], (s[i + 1] = Mv(e, t, n)), r, i);
  }
}
function hd(e, t) {
  return t >= e.expandoStartIndex;
}
function wv(e, t, n, r) {
  let o = e.data;
  if (o[n + 1] === null) {
    let i = o[En()],
      s = hd(e, n);
    pd(i, r) && t === null && !s && (t = !1), (t = Cv(o, i, t, r)), lv(o, i, t, n, s, r);
  }
}
function Cv(e, t, n, r) {
  let o = bp(e),
    i = r ? t.residualClasses : t.residualStyles;
  if (o === null)
    (r ? t.classBindings : t.styleBindings) === 0 && ((n = Ei(null, e, t, n, r)), (n = vn(n, t.attrs, r)), (i = null));
  else {
    let s = t.directiveStylingLast;
    if (s === -1 || e[s] !== o)
      if (((n = Ei(o, e, t, n, r)), i === null)) {
        let u = Ev(e, t, r);
        u !== void 0 && Array.isArray(u) && ((u = Ei(null, e, t, u[1], r)), (u = vn(u, t.attrs, r)), Iv(e, t, r, u));
      } else i = bv(e, t, r);
  }
  return i !== void 0 && (r ? (t.residualClasses = i) : (t.residualStyles = i)), n;
}
function Ev(e, t, n) {
  let r = n ? t.classBindings : t.styleBindings;
  if (jt(r) !== 0) return e[ut(r)];
}
function Iv(e, t, n, r) {
  let o = n ? t.classBindings : t.styleBindings;
  e[ut(o)] = r;
}
function bv(e, t, n) {
  let r,
    o = t.directiveEnd;
  for (let i = 1 + t.directiveStylingLast; i < o; i++) {
    let s = e[i].hostAttrs;
    r = vn(r, s, n);
  }
  return vn(r, t.attrs, n);
}
function Ei(e, t, n, r, o) {
  let i = null,
    s = n.directiveEnd,
    a = n.directiveStylingLast;
  for (a === -1 ? (a = n.directiveStart) : a++; a < s && ((i = t[a]), (r = vn(r, i.hostAttrs, o)), i !== e); ) a++;
  return e !== null && (n.directiveStylingLast = a), r;
}
function vn(e, t, n) {
  let r = n ? 1 : 2,
    o = -1;
  if (t !== null)
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      typeof s == 'number'
        ? (o = s)
        : o === r && (Array.isArray(e) || (e = e === void 0 ? [] : ['', e]), vs(e, s, n ? !0 : t[++i]));
    }
  return e === void 0 ? null : e;
}
function Mv(e, t, n) {
  if (n == null || n === '') return X;
  let r = [],
    o = Ts(n);
  if (Array.isArray(o)) for (let i = 0; i < o.length; i++) e(r, o[i], !0);
  else if (typeof o == 'object') for (let i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
  else typeof o == 'string' && t(r, o);
  return r;
}
function Sv(e, t, n) {
  let r = String(t);
  r !== '' && !r.includes(' ') && vs(e, r, n);
}
function Tv(e, t, n, r, o, i, s, a) {
  o === Mn && (o = X);
  let u = 0,
    c = 0,
    l = 0 < o.length ? o[0] : null,
    d = 0 < i.length ? i[0] : null;
  for (; l !== null || d !== null; ) {
    let f = u < o.length ? o[u + 1] : void 0,
      h = c < i.length ? i[c + 1] : void 0,
      v = null,
      S;
    l === d
      ? ((u += 2), (c += 2), f !== h && ((v = d), (S = h)))
      : d === null || (l !== null && l < d)
        ? ((u += 2), (v = l))
        : ((c += 2), (v = d), (S = h)),
      v !== null && xv(e, t, n, r, v, S, s, a),
      (l = u < o.length ? o[u] : null),
      (d = c < i.length ? i[c] : null);
  }
}
function xv(e, t, n, r, o, i, s, a) {
  if (!(t.type & 3)) return;
  let u = e.data,
    c = u[a + 1],
    l = cv(c) ? Xu(u, t, n, o, jt(c), s) : void 0;
  if (!Ur(l)) {
    Ur(i) || (av(c) && (i = Xu(u, null, n, o, a, s)));
    let d = ap(En(), n);
    Rg(r, s, d, o, i);
  }
}
function Xu(e, t, n, r, o, i) {
  let s = t === null,
    a;
  for (; o > 0; ) {
    let u = e[o],
      c = Array.isArray(u),
      l = c ? u[1] : u,
      d = l === null,
      f = n[o + 1];
    f === Mn && (f = d ? X : void 0);
    let h = d ? pi(f, r) : l === r ? f : void 0;
    if ((c && !Ur(h) && (h = pi(u, r)), Ur(h) && ((a = h), s))) return a;
    let v = e[o + 1];
    o = s ? ut(v) : jt(v);
  }
  if (t !== null) {
    let u = i ? t.residualClasses : t.residualStyles;
    u != null && (a = pi(u, r));
  }
  return a;
}
function Ur(e) {
  return e !== void 0;
}
function pd(e, t) {
  return (e.flags & (t ? 8 : 16)) !== 0;
}
function gd(e) {
  let t = e[dn] ?? [],
    r = e[U][H];
  for (let o of t) _v(o, r);
  e[dn] = X;
}
function _v(e, t) {
  let n = 0,
    r = e.firstChild;
  if (r) {
    let o = e.data[Lr];
    for (; n < o; ) {
      let i = r.nextSibling;
      Nl(t, r, !1), (r = i), n++;
    }
  }
}
function md(e) {
  gd(e);
  for (let t = ne; t < e.length; t++) Br(e[t]);
}
function Br(e) {
  let t = e[x];
  for (let n = ie; n < t.bindingStartIndex; n++)
    if (he(e[n])) {
      let r = e[n];
      md(r);
    } else Oe(e[n]) && Br(e[n]);
}
function Av(e) {
  let t = e._views;
  for (let n of t) {
    let r = Wg(n);
    if (r !== null && r[re] !== null)
      if (Oe(r)) Br(r);
      else {
        let o = r[re];
        Br(o), md(r);
      }
  }
}
var Nv = new RegExp(`^(\\d+)*(${Ll}|${kl})*(.*)`);
function Rv(e) {
  let t = e.match(Nv),
    [n, r, o, i] = t,
    s = r ? parseInt(r, 10) : o,
    a = [];
  for (let [u, c, l] of i.matchAll(/(f|n)(\d*)/g)) {
    let d = parseInt(l, 10) || 1;
    a.push(c, d);
  }
  return [s, ...a];
}
function Ov(e) {
  return !e.prev && e.parent?.type === 8;
}
function Ii(e) {
  return e.index - ie;
}
function lo(e, t, n, r) {
  let o = null,
    i = Ii(r),
    s = e.data[Vg];
  if (s?.[i]) o = Fv(s[i], n);
  else if (t.firstChild === r) o = e.firstChild;
  else {
    let a = r.prev === null,
      u = r.prev ?? r.parent;
    if (Ov(r)) {
      let c = Ii(r.parent);
      o = Hi(e, c);
    } else {
      let c = Ee(u, n);
      if (a) o = c.firstChild;
      else {
        let l = Ii(u),
          d = Hi(e, l);
        if (u.type === 2 && d) {
          let h = As(e, l) + 1;
          o = fo(h, d);
        } else o = c.nextSibling;
      }
    }
  }
  return o;
}
function fo(e, t) {
  let n = t;
  for (let r = 0; r < e; r++) n = n.nextSibling;
  return n;
}
function Pv(e, t) {
  let n = e;
  for (let r = 0; r < t.length; r += 2) {
    let o = t[r],
      i = t[r + 1];
    for (let s = 0; s < i; s++)
      switch (o) {
        case Bi.FirstChild:
          n = n.firstChild;
          break;
        case Bi.NextSibling:
          n = n.nextSibling;
          break;
      }
  }
  return n;
}
function Fv(e, t) {
  let [n, ...r] = Rv(e),
    o;
  if (n === kl) o = t[oe][re];
  else if (n === Ll) o = og(t[oe][re]);
  else {
    let i = Number(n);
    o = Te(t[i + ie]);
  }
  return Pv(o, r);
}
function kv(e, t) {
  let n = [];
  for (let r of t)
    for (let o = 0; o < (r[jl] ?? 1); o++) {
      let i = { data: r, firstChild: null };
      r[Lr] > 0 && ((i.firstChild = e), (e = fo(r[Lr], e))), n.push(i);
    }
  return [e, n];
}
var vd = (e, t) => null;
function Lv(e, t) {
  let n = e[dn];
  return !t || n === null || n.length === 0 ? null : n[0].data[jg] === t ? n.shift() : (gd(e), null);
}
function jv() {
  vd = Lv;
}
function ec(e, t) {
  return vd(e, t);
}
function tc(e, t) {
  return !t || t.firstChild === null || Fr(e);
}
function Vv(e, t, n, r = !0) {
  let o = t[x];
  if ((Cg(o, t, e, n), r)) {
    let s = $i(n, e),
      a = t[H],
      u = Ms(a, e[Pe]);
    u !== null && yg(o, e[se], a, t, u, s);
  }
  let i = t[Se];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
var ho = (() => {
  let t = class t {};
  t.__NG_ELEMENT_ID__ = $v;
  let e = t;
  return e;
})();
function $v() {
  let e = We();
  return Bv(e, Z());
}
var Uv = ho,
  yd = class extends Uv {
    constructor(t, n, r) {
      super(), (this._lContainer = t), (this._hostTNode = n), (this._hostLView = r);
    }
    get element() {
      return Ns(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new ot(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let t = ps(this._hostTNode, this._hostLView);
      if (Qc(t)) {
        let n = Rr(t, this._hostLView),
          r = Nr(t),
          o = n[x].data[r + 8];
        return new ot(o, n);
      } else return new ot(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(t) {
      let n = nc(this._lContainer);
      return (n !== null && n[t]) || null;
    }
    get length() {
      return this._lContainer.length - ne;
    }
    createEmbeddedView(t, n, r) {
      let o, i;
      typeof r == 'number' ? (o = r) : r != null && ((o = r.index), (i = r.injector));
      let s = ec(this._lContainer, t.ssrId),
        a = t.createEmbeddedViewImpl(n || {}, i, s);
      return this.insertImpl(a, o, tc(this._hostTNode, s)), a;
    }
    createComponent(t, n, r, o, i) {
      let s = t && !Hp(t),
        a;
      if (s) a = n;
      else {
        let v = n || {};
        (a = v.index), (r = v.injector), (o = v.projectableNodes), (i = v.environmentInjector || v.ngModuleRef);
      }
      let u = s ? t : new mn(it(t)),
        c = r || this.parentInjector;
      if (!i && u.ngModule == null) {
        let S = (s ? c : this.parentInjector).get(pe, null);
        S && (i = S);
      }
      let l = it(u.componentType ?? {}),
        d = ec(this._lContainer, l?.id ?? null),
        f = d?.firstChild ?? null,
        h = u.create(c, o, f, i);
      return this.insertImpl(h.hostView, a, tc(this._hostTNode, d)), h;
    }
    insert(t, n) {
      return this.insertImpl(t, n, !0);
    }
    insertImpl(t, n, r) {
      let o = t._lView;
      if (up(o)) {
        let a = this.indexOf(t);
        if (a !== -1) this.detach(a);
        else {
          let u = o[U],
            c = new yd(u, u[se], u[U]);
          c.detach(c.indexOf(t));
        }
      }
      let i = this._adjustIndex(n),
        s = this._lContainer;
      return Vv(s, o, i, r), t.attachToViewContainerRef(), sl(bi(s), i, t), t;
    }
    move(t, n) {
      return this.insert(t, n);
    }
    indexOf(t) {
      let n = nc(this._lContainer);
      return n !== null ? n.indexOf(t) : -1;
    }
    remove(t) {
      let n = this._adjustIndex(t, -1),
        r = Vi(this._lContainer, n);
      r && (Or(bi(this._lContainer), n), Ml(r[x], r));
    }
    detach(t) {
      let n = this._adjustIndex(t, -1),
        r = Vi(this._lContainer, n);
      return r && Or(bi(this._lContainer), n) != null ? new Lt(r) : null;
    }
    _adjustIndex(t, n = 0) {
      return t ?? this.length + n;
    }
  };
function nc(e) {
  return e[_r];
}
function bi(e) {
  return e[_r] || (e[_r] = []);
}
function Bv(e, t) {
  let n,
    r = t[e.index];
  return he(r) ? (n = r) : ((n = Om(r, t, null, e)), (t[e.index] = n), Ps(t, n)), Dd(n, t, e, r), new yd(n, e, t);
}
function Hv(e, t) {
  let n = e[H],
    r = n.createComment(''),
    o = Ee(t, e),
    i = Ms(n, o);
  return kr(n, i, r, Tg(n, o), !1), r;
}
var Dd = Cd,
  wd = (e, t, n) => !1;
function Cd(e, t, n, r) {
  if (e[Pe]) return;
  let o;
  n.type & 8 ? (o = Te(r)) : (o = Hv(t, n)), (e[Pe] = o);
}
function zv(e, t, n) {
  if (e[Pe] && e[dn]) return !0;
  let r = n[Se],
    o = t.index - ie;
  if (!r || ag(t) || io(r, o)) return !1;
  let s = Hi(r, o),
    a = r.data[xs]?.[o],
    [u, c] = kv(s, a);
  return (e[Pe] = u), (e[dn] = c), !0;
}
function Wv(e, t, n, r) {
  wd(e, n, t) || Cd(e, t, n, r);
}
function Gv() {
  (Dd = Wv), (wd = zv);
}
var qv = Ed;
function Ed(e, t, n, r) {
  return Ge(!0), t[H].createComment('');
}
function Zv(e, t, n, r) {
  let o = t[Se],
    i = !o || $t() || io(o, r);
  if ((Ge(i), i)) return Ed(e, t, n, r);
  let s = o.data[Lg]?.[r] ?? null;
  s !== null && n.tView !== null && n.tView.ssrId === null && (n.tView.ssrId = s);
  let a = lo(o, e, t, n);
  oo(o, r, a);
  let u = As(o, r);
  return fo(u, a);
}
function Yv() {
  qv = Zv;
}
function Qv(e, t, n, r, o, i) {
  let s = t.consts,
    a = ku(s, o),
    u = uo(t, e, 2, r, a);
  return (
    wm(t, n, u, ku(s, i)),
    u.attrs !== null && Ki(u, u.attrs, !1),
    u.mergedAttrs !== null && Ki(u, u.mergedAttrs, !0),
    t.queries !== null && t.queries.elementStart(t, u),
    u
  );
}
function Id(e, t, n, r) {
  let o = Z(),
    i = ct(),
    s = ie + e,
    a = o[H],
    u = i.firstCreatePass ? Qv(s, i, o, t, n, r) : i.data[s],
    c = Md(i, o, u, a, t, e);
  o[s] = c;
  let l = np(u);
  return (
    eo(u, !0),
    Fl(a, c, u),
    (u.flags & 32) !== 32 && qc() && _l(i, o, c, u),
    dp() === 0 && Ft(c, o),
    fp(),
    l && (um(i, o, u), Yl(i, u, o)),
    r !== null && cm(o, u),
    Id
  );
}
function bd() {
  let e = We();
  Lc() ? jc() : ((e = e.parent), eo(e, !1));
  let t = e;
  pp(t) && mp(), hp();
  let n = ct();
  return (
    n.firstCreatePass && (Zc(n, e), Mc(e) && n.queries.elementEnd(e)),
    t.classesWithoutHost != null && Np(t) && ns(n, t, Z(), t.classesWithoutHost, !0),
    t.stylesWithoutHost != null && Rp(t) && ns(n, t, Z(), t.stylesWithoutHost, !1),
    bd
  );
}
function Ls(e, t, n, r) {
  return Id(e, t, n, r), bd(), Ls;
}
var Md = (e, t, n, r, o, i) => (Ge(!0), bs(r, o, Wc()));
function Kv(e, t, n, r, o, i) {
  let s = t[Se],
    a = !s || $t() || io(s, i);
  if ((Ge(a), a)) return bs(r, o, Wc());
  let u = lo(s, e, t, n);
  return Ul(s, i) && oo(s, i, u.nextSibling), s && (ml(n) || vl(u)) && wn(n) && (gp(n), Rl(u)), u;
}
function Jv() {
  Md = Kv;
}
var Xv = (e, t, n, r) => (Ge(!0), Il(t[H], ''));
function ey(e, t, n, r) {
  let o,
    i = t[Se],
    s = !i || $t();
  if ((Ge(s), s)) return Il(t[H], '');
  let a = lo(i, e, t, n),
    u = Zg(i, r);
  return oo(i, r, a), (o = fo(u, a)), o;
}
function ty() {
  Xv = ey;
}
var Hr = 'en-US';
var ny = Hr;
function ry(e) {
  Sh(e, 'Expected localeId to be defined'), typeof e == 'string' && (ny = e.toLowerCase().replace(/_/g, '-'));
}
function Tn(e) {
  return !!e && typeof e.then == 'function';
}
function Sd(e) {
  return !!e && typeof e.subscribe == 'function';
}
function oy(e, t) {
  let n = null,
    r = Gh(e);
  for (let o = 0; o < t.length; o++) {
    let i = t[o];
    if (i === '*') {
      n = o;
      continue;
    }
    if (r === null ? gc(e, i, !0) : Yh(r, i)) return o;
  }
  return n;
}
function uS(e) {
  let t = Z()[oe][se];
  if (!t.projection) {
    let n = e ? e.length : 1,
      r = (t.projection = al(n, null)),
      o = r.slice(),
      i = t.child;
    for (; i !== null; ) {
      let s = e ? oy(i, e) : 0;
      s !== null && (o[s] ? (o[s].projectionNext = i) : (r[s] = i), (o[s] = i)), (i = i.next);
    }
  }
}
function cS(e, t = 0, n) {
  let r = Z(),
    o = ct(),
    i = uo(o, ie + e, 16, null, n || null);
  i.projection === null && (i.projection = t), jc(), (!r[Se] || $t()) && (i.flags & 32) !== 32 && Ag(o, r, i);
}
function lS(e, t = '') {
  let n = Z(),
    r = ct(),
    o = e + ie,
    i = r.firstCreatePass ? uo(r, o, 1, t, null) : r.data[o],
    s = Td(r, n, i, t, e);
  (n[o] = s), qc() && _l(r, n, s, i), eo(i, !1);
}
var Td = (e, t, n, r, o) => (Ge(!0), El(t[H], r));
function iy(e, t, n, r, o) {
  let i = t[Se],
    s = !i || $t() || io(i, o);
  return Ge(s), s ? El(t[H], r) : lo(i, e, t, n);
}
function sy() {
  Td = iy;
}
var ze = class {},
  yn = class {};
var rs = class extends ze {
    constructor(t, n, r) {
      super(),
        (this._parent = n),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new $r(this));
      let o = wc(t);
      (this._bootstrapComponents = gl(o.bootstrap)),
        (this._r3Injector = hl(
          t,
          n,
          [{ provide: ze, useValue: this }, { provide: so, useValue: this.componentFactoryResolver }, ...r],
          ee(t),
          new Set(['environment'])
        )),
        this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(t));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let t = this._r3Injector;
      !t.destroyed && t.destroy(), this.destroyCbs.forEach(n => n()), (this.destroyCbs = null);
    }
    onDestroy(t) {
      this.destroyCbs.push(t);
    }
  },
  os = class extends yn {
    constructor(t) {
      super(), (this.moduleType = t);
    }
    create(t) {
      return new rs(this.moduleType, t, []);
    }
  };
var zr = class extends ze {
  constructor(t) {
    super(), (this.componentFactoryResolver = new $r(this)), (this.instance = null);
    let n = new pn(
      [...t.providers, { provide: ze, useValue: this }, { provide: so, useValue: this.componentFactoryResolver }],
      t.parent || Ds(),
      t.debugName,
      new Set(['environment'])
    );
    (this.injector = n), t.runEnvironmentInitializers && n.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(t) {
    this.injector.onDestroy(t);
  }
};
function js(e, t, n = null) {
  return new zr({ providers: e, parent: t, debugName: n, runEnvironmentInitializers: !0 }).injector;
}
var ay = (() => {
  let t = class t {
    constructor(r) {
      (this._injector = r), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(r) {
      if (!r.standalone) return null;
      if (!this.cachedInjectors.has(r)) {
        let o = ll(!1, r.type),
          i = o.length > 0 ? js([o], this._injector, `Standalone[${r.type.name}]`) : null;
        this.cachedInjectors.set(r, i);
      }
      return this.cachedInjectors.get(r);
    }
    ngOnDestroy() {
      try {
        for (let r of this.cachedInjectors.values()) r !== null && r.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
  };
  t.ɵprov = C({ token: t, providedIn: 'environment', factory: () => new t(_(pe)) });
  let e = t;
  return e;
})();
function xd(e) {
  Sn('NgStandalone'), (e.getStandaloneInjector = t => t.get(ay).getOrCreateStandaloneInjector(e));
}
var po = (() => {
    let t = class t {
      log(r) {
        console.log(r);
      }
      warn(r) {
        console.warn(r);
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'platform' }));
    let e = t;
    return e;
  })(),
  go = (() => {
    let t = class t {
      constructor() {
        (this.taskId = 0), (this.pendingTasks = new Set()), (this.hasPendingTasks = new W(!1));
      }
      add() {
        this.hasPendingTasks.next(!0);
        let r = this.taskId++;
        return this.pendingTasks.add(r), r;
      }
      remove(r) {
        this.pendingTasks.delete(r), this.pendingTasks.size === 0 && this.hasPendingTasks.next(!1);
      }
      ngOnDestroy() {
        this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  is = class {
    constructor(t, n) {
      (this.ngModuleFactory = t), (this.componentFactories = n);
    }
  },
  Vs = (() => {
    let t = class t {
      compileModuleSync(r) {
        return new os(r);
      }
      compileModuleAsync(r) {
        return Promise.resolve(this.compileModuleSync(r));
      }
      compileModuleAndAllComponentsSync(r) {
        let o = this.compileModuleSync(r),
          i = wc(r),
          s = gl(i.declarations).reduce((a, u) => {
            let c = it(u);
            return c && a.push(new mn(c)), a;
          }, []);
        return new is(o, s);
      }
      compileModuleAndAllComponentsAsync(r) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(r));
      }
      clearCache() {}
      clearCacheFor(r) {}
      getModuleId(r) {}
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })();
var _d = new I('');
var Ad = new I('Application Initializer'),
  Nd = (() => {
    let t = class t {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((r, o) => {
            (this.resolve = r), (this.reject = o);
          })),
          (this.appInits = p(Ad, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let r = [];
        for (let i of this.appInits) {
          let s = i();
          if (Tn(s)) r.push(s);
          else if (Sd(s)) {
            let a = new Promise((u, c) => {
              s.subscribe({ complete: u, error: c });
            });
            r.push(a);
          }
        }
        let o = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(r)
          .then(() => {
            o();
          })
          .catch(i => {
            this.reject(i);
          }),
          r.length === 0 && o(),
          (this.initialized = !0);
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  Bt = new I('appBootstrapListener');
function uy() {
  Ya(() => {
    throw new y(600, !1);
  });
}
function cy(e) {
  return e.isBoundToModule;
}
function ly(e, t, n) {
  try {
    let r = n();
    return Tn(r)
      ? r.catch(o => {
          throw (t.runOutsideAngular(() => e.handleError(o)), o);
        })
      : r;
  } catch (r) {
    throw (t.runOutsideAngular(() => e.handleError(r)), r);
  }
}
var Ye = (() => {
  let t = class t {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = p(Hl)),
        (this.zoneIsStable = p(ad)),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = p(go).hasPendingTasks.pipe(
          J(r => (r ? m(!1) : this.zoneIsStable)),
          oi()
        )),
        (this._injector = p(pe));
    }
    get destroyed() {
      return this._destroyed;
    }
    get injector() {
      return this._injector;
    }
    bootstrap(r, o) {
      let i = r instanceof jr;
      if (!this._injector.get(Nd).done) {
        let v =
          'Cannot bootstrap as there are still asynchronous initializers running.' +
          (!i && Dc(r) ? '' : ' Bootstrap components in the `ngDoBootstrap` method of the root module.');
        throw new y(405, !1);
      }
      let a;
      i ? (a = r) : (a = this._injector.get(so).resolveComponentFactory(r)), this.componentTypes.push(a.componentType);
      let u = cy(a) ? void 0 : this._injector.get(ze),
        c = o || a.selector,
        l = a.create(Ze.NULL, [], c, u),
        d = l.location.nativeElement,
        f = l.injector.get(_d, null);
      return (
        f?.registerApplication(d),
        l.onDestroy(() => {
          this.detachView(l.hostView), Mi(this.components, l), f?.unregisterApplication(d);
        }),
        this._loadComponent(l),
        l
      );
    }
    tick() {
      if (this._runningTick) throw new y(101, !1);
      try {
        this._runningTick = !0;
        for (let r of this._views) r.detectChanges();
      } catch (r) {
        this.internalErrorHandler(r);
      } finally {
        this._runningTick = !1;
      }
    }
    attachView(r) {
      let o = r;
      this._views.push(o), o.attachToAppRef(this);
    }
    detachView(r) {
      let o = r;
      Mi(this._views, o), o.detachFromAppRef();
    }
    _loadComponent(r) {
      this.attachView(r.hostView), this.tick(), this.components.push(r);
      let o = this._injector.get(Bt, []);
      [...this._bootstrapListeners, ...o].forEach(i => i(r));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach(r => r()), this._views.slice().forEach(r => r.destroy());
        } finally {
          (this._destroyed = !0), (this._views = []), (this._bootstrapListeners = []), (this._destroyListeners = []);
        }
    }
    onDestroy(r) {
      return this._destroyListeners.push(r), () => Mi(this._destroyListeners, r);
    }
    destroy() {
      if (this._destroyed) throw new y(406, !1);
      let r = this._injector;
      r.destroy && !r.destroyed && r.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    warnIfDestroyed() {}
  };
  (t.ɵfac = function (o) {
    return new (o || t)();
  }),
    (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'root' }));
  let e = t;
  return e;
})();
function Mi(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
var Cr;
function $s(e) {
  Cr ??= new WeakMap();
  let t = Cr.get(e);
  if (t) return t;
  let n = e.isStable
    .pipe(ve(r => r))
    .toPromise()
    .then(() => {});
  return Cr.set(e, n), e.onDestroy(() => Cr?.delete(e)), n;
}
var dy = (() => {
  let t = class t {
    constructor() {
      (this.zone = p(j)), (this.applicationRef = p(Ye));
    }
    initialize() {
      this._onMicrotaskEmptySubscription ||
        (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
          next: () => {
            this.zone.run(() => {
              this.applicationRef.tick();
            });
          },
        }));
    }
    ngOnDestroy() {
      this._onMicrotaskEmptySubscription?.unsubscribe();
    }
  };
  (t.ɵfac = function (o) {
    return new (o || t)();
  }),
    (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'root' }));
  let e = t;
  return e;
})();
function fy(e) {
  return [
    { provide: j, useFactory: e },
    {
      provide: Ut,
      multi: !0,
      useFactory: () => {
        let t = p(dy, { optional: !0 });
        return () => t.initialize();
      },
    },
    { provide: Hl, useFactory: hy },
    { provide: ad, useFactory: ud },
  ];
}
function hy() {
  let e = p(j),
    t = p(ke);
  return n => e.runOutsideAngular(() => t.handleError(n));
}
function py(e) {
  let t = fy(() => new j(gy(e)));
  return lt([[], t]);
}
function gy(e) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
  };
}
function my() {
  return (typeof $localize < 'u' && $localize.locale) || Hr;
}
var Us = new I('LocaleId', { providedIn: 'root', factory: () => p(Us, M.Optional | M.SkipSelf) || my() });
var Rd = new I('PlatformDestroyListeners');
var Sr = null;
function vy(e = [], t) {
  return Ze.create({
    name: t,
    providers: [{ provide: to, useValue: 'platform' }, { provide: Rd, useValue: new Set([() => (Sr = null)]) }, ...e],
  });
}
function yy(e = []) {
  if (Sr) return Sr;
  let t = vy(e);
  return (Sr = t), uy(), Dy(t), t;
}
function Dy(e) {
  e.get(ws, null)?.forEach(n => n());
}
function Od(e) {
  try {
    let { rootComponent: t, appProviders: n, platformProviders: r } = e,
      o = yy(r),
      i = [py(), ...(n || [])],
      a = new zr({ providers: i, parent: o, debugName: '', runEnvironmentInitializers: !1 }).injector,
      u = a.get(j);
    return u.run(() => {
      a.resolveInjectorInitializers();
      let c = a.get(ke, null),
        l;
      u.runOutsideAngular(() => {
        l = u.onError.subscribe({
          next: h => {
            c.handleError(h);
          },
        });
      });
      let d = () => a.destroy(),
        f = o.get(Rd);
      return (
        f.add(d),
        a.onDestroy(() => {
          l.unsubscribe(), f.delete(d);
        }),
        ly(c, u, () => {
          let h = a.get(Nd);
          return (
            h.runInitializers(),
            h.donePromise.then(() => {
              let v = a.get(Us, Hr);
              ry(v || Hr);
              let S = a.get(Ye);
              return t !== void 0 && S.bootstrap(t), S;
            })
          );
        })
      );
    });
  } catch (t) {
    return Promise.reject(t);
  }
}
var rc = !1;
function wy() {
  rc || ((rc = !0), zg(), Jv(), sy(), ty(), Yv(), Gv(), jv(), pm());
}
function Cy(e, t) {
  return $s(e);
}
function Pd() {
  return lt([
    {
      provide: Dr,
      useFactory: () => {
        let e = !0;
        return yr() && (e = !!p(dt, { optional: !0 })?.get(Vl, null)), e && Sn('NgHydration'), e;
      },
    },
    {
      provide: Ut,
      useValue: () => {
        yr() && p(Dr) && (Ey(), wy());
      },
      multi: !0,
    },
    { provide: Wl, useFactory: () => yr() && p(Dr) },
    {
      provide: Bt,
      useFactory: () => {
        if (yr() && p(Dr)) {
          let e = p(Ye),
            t = p(Ze);
          return () => {
            Cy(e, t).then(() => {
              j.assertInAngularZone(), Av(e);
            });
          };
        }
        return () => {};
      },
      multi: !0,
    },
  ]);
}
function Ey() {
  let e = no(),
    t;
  for (let n of e.body.childNodes)
    if (n.nodeType === Node.COMMENT_NODE && n.textContent?.trim() === Bg) {
      t = n;
      break;
    }
  if (!t) throw new y(-507, !1);
}
var Hs = null;
function Ht() {
  return Hs;
}
function jd(e) {
  Hs || (Hs = e);
}
var mo = class {},
  ae = new I('DocumentToken'),
  Vd = (() => {
    let t = class t {
      historyGo(r) {
        throw new Error('Not implemented');
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: () => (() => p(Sy))(), providedIn: 'platform' }));
    let e = t;
    return e;
  })();
var Sy = (() => {
  let t = class t extends Vd {
    constructor() {
      super(), (this._doc = p(ae)), (this._location = window.location), (this._history = window.history);
    }
    getBaseHrefFromDOM() {
      return Ht().getBaseHref(this._doc);
    }
    onPopState(r) {
      let o = Ht().getGlobalEventTarget(this._doc, 'window');
      return o.addEventListener('popstate', r, !1), () => o.removeEventListener('popstate', r);
    }
    onHashChange(r) {
      let o = Ht().getGlobalEventTarget(this._doc, 'window');
      return o.addEventListener('hashchange', r, !1), () => o.removeEventListener('hashchange', r);
    }
    get href() {
      return this._location.href;
    }
    get protocol() {
      return this._location.protocol;
    }
    get hostname() {
      return this._location.hostname;
    }
    get port() {
      return this._location.port;
    }
    get pathname() {
      return this._location.pathname;
    }
    get search() {
      return this._location.search;
    }
    get hash() {
      return this._location.hash;
    }
    set pathname(r) {
      this._location.pathname = r;
    }
    pushState(r, o, i) {
      this._history.pushState(r, o, i);
    }
    replaceState(r, o, i) {
      this._history.replaceState(r, o, i);
    }
    forward() {
      this._history.forward();
    }
    back() {
      this._history.back();
    }
    historyGo(r = 0) {
      this._history.go(r);
    }
    getState() {
      return this._history.state;
    }
  };
  (t.ɵfac = function (o) {
    return new (o || t)();
  }),
    (t.ɵprov = C({ token: t, factory: () => (() => new t())(), providedIn: 'platform' }));
  let e = t;
  return e;
})();
function $d(e, t) {
  if (e.length == 0) return t;
  if (t.length == 0) return e;
  let n = 0;
  return e.endsWith('/') && n++, t.startsWith('/') && n++, n == 2 ? e + t.substring(1) : n == 1 ? e + t : e + '/' + t;
}
function Fd(e) {
  let t = e.match(/#|\?|$/),
    n = (t && t.index) || e.length,
    r = n - (e[n - 1] === '/' ? 1 : 0);
  return e.slice(0, r) + e.slice(n);
}
function ft(e) {
  return e && e[0] !== '?' ? '?' + e : e;
}
var yo = (() => {
    let t = class t {
      historyGo(r) {
        throw new Error('Not implemented');
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: () => (() => p(Ud))(), providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  Ty = new I('appBaseHref'),
  Ud = (() => {
    let t = class t extends yo {
      constructor(r, o) {
        super(),
          (this._platformLocation = r),
          (this._removeListenerFns = []),
          (this._baseHref = o ?? this._platformLocation.getBaseHrefFromDOM() ?? p(ae).location?.origin ?? '');
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
      }
      onPopState(r) {
        this._removeListenerFns.push(this._platformLocation.onPopState(r), this._platformLocation.onHashChange(r));
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(r) {
        return $d(this._baseHref, r);
      }
      path(r = !1) {
        let o = this._platformLocation.pathname + ft(this._platformLocation.search),
          i = this._platformLocation.hash;
        return i && r ? `${o}${i}` : o;
      }
      pushState(r, o, i, s) {
        let a = this.prepareExternalUrl(i + ft(s));
        this._platformLocation.pushState(r, o, a);
      }
      replaceState(r, o, i, s) {
        let a = this.prepareExternalUrl(i + ft(s));
        this._platformLocation.replaceState(r, o, a);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(r = 0) {
        this._platformLocation.historyGo?.(r);
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)(_(Vd), _(Ty, 8));
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })();
var xn = (() => {
  let t = class t {
    constructor(r) {
      (this._subject = new we()),
        (this._urlChangeListeners = []),
        (this._urlChangeSubscription = null),
        (this._locationStrategy = r);
      let o = this._locationStrategy.getBaseHref();
      (this._basePath = Ay(Fd(kd(o)))),
        this._locationStrategy.onPopState(i => {
          this._subject.emit({ url: this.path(!0), pop: !0, state: i.state, type: i.type });
        });
    }
    ngOnDestroy() {
      this._urlChangeSubscription?.unsubscribe(), (this._urlChangeListeners = []);
    }
    path(r = !1) {
      return this.normalize(this._locationStrategy.path(r));
    }
    getState() {
      return this._locationStrategy.getState();
    }
    isCurrentPathEqualTo(r, o = '') {
      return this.path() == this.normalize(r + ft(o));
    }
    normalize(r) {
      return t.stripTrailingSlash(_y(this._basePath, kd(r)));
    }
    prepareExternalUrl(r) {
      return r && r[0] !== '/' && (r = '/' + r), this._locationStrategy.prepareExternalUrl(r);
    }
    go(r, o = '', i = null) {
      this._locationStrategy.pushState(i, '', r, o),
        this._notifyUrlChangeListeners(this.prepareExternalUrl(r + ft(o)), i);
    }
    replaceState(r, o = '', i = null) {
      this._locationStrategy.replaceState(i, '', r, o),
        this._notifyUrlChangeListeners(this.prepareExternalUrl(r + ft(o)), i);
    }
    forward() {
      this._locationStrategy.forward();
    }
    back() {
      this._locationStrategy.back();
    }
    historyGo(r = 0) {
      this._locationStrategy.historyGo?.(r);
    }
    onUrlChange(r) {
      return (
        this._urlChangeListeners.push(r),
        this._urlChangeSubscription ||
          (this._urlChangeSubscription = this.subscribe(o => {
            this._notifyUrlChangeListeners(o.url, o.state);
          })),
        () => {
          let o = this._urlChangeListeners.indexOf(r);
          this._urlChangeListeners.splice(o, 1),
            this._urlChangeListeners.length === 0 &&
              (this._urlChangeSubscription?.unsubscribe(), (this._urlChangeSubscription = null));
        }
      );
    }
    _notifyUrlChangeListeners(r = '', o) {
      this._urlChangeListeners.forEach(i => i(r, o));
    }
    subscribe(r, o, i) {
      return this._subject.subscribe({ next: r, error: o, complete: i });
    }
  };
  (t.normalizeQueryParams = ft),
    (t.joinWithSlash = $d),
    (t.stripTrailingSlash = Fd),
    (t.ɵfac = function (o) {
      return new (o || t)(_(yo));
    }),
    (t.ɵprov = C({ token: t, factory: () => xy(), providedIn: 'root' }));
  let e = t;
  return e;
})();
function xy() {
  return new xn(_(yo));
}
function _y(e, t) {
  if (!e || !t.startsWith(e)) return t;
  let n = t.substring(e.length);
  return n === '' || ['/', ';', '?', '#'].includes(n[0]) ? n : t;
}
function kd(e) {
  return e.replace(/\/index.html$/, '');
}
function Ay(e) {
  if (new RegExp('^(https?:)?//').test(e)) {
    let [, n] = e.split(/\/\/[^\/]+/);
    return n;
  }
  return e;
}
function Bd(e, t) {
  t = encodeURIComponent(t);
  for (let n of e.split(';')) {
    let r = n.indexOf('='),
      [o, i] = r == -1 ? [n, ''] : [n.slice(0, r), n.slice(r + 1)];
    if (o.trim() === t) return decodeURIComponent(i);
  }
  return null;
}
var Ny = (() => {
    let t = class t {};
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵmod = Qr({ type: t })),
      (t.ɵinj = Gr({}));
    let e = t;
    return e;
  })(),
  Hd = 'browser',
  Ry = 'server';
function zs(e) {
  return e === Ry;
}
var vo = class {};
var wo = class e {
  constructor(t) {
    (this.normalizedNames = new Map()),
      (this.lazyUpdate = null),
      t
        ? typeof t == 'string'
          ? (this.lazyInit = () => {
              (this.headers = new Map()),
                t
                  .split(
                    `
`
                  )
                  .forEach(n => {
                    let r = n.indexOf(':');
                    if (r > 0) {
                      let o = n.slice(0, r),
                        i = o.toLowerCase(),
                        s = n.slice(r + 1).trim();
                      this.maybeSetNormalizedName(o, i),
                        this.headers.has(i) ? this.headers.get(i).push(s) : this.headers.set(i, [s]);
                    }
                  });
            })
          : typeof Headers < 'u' && t instanceof Headers
            ? ((this.headers = new Map()),
              t.forEach((n, r) => {
                this.setHeaderEntries(r, n);
              }))
            : (this.lazyInit = () => {
                (this.headers = new Map()),
                  Object.entries(t).forEach(([n, r]) => {
                    this.setHeaderEntries(n, r);
                  });
              })
        : (this.headers = new Map());
  }
  has(t) {
    return this.init(), this.headers.has(t.toLowerCase());
  }
  get(t) {
    this.init();
    let n = this.headers.get(t.toLowerCase());
    return n && n.length > 0 ? n[0] : null;
  }
  keys() {
    return this.init(), Array.from(this.normalizedNames.values());
  }
  getAll(t) {
    return this.init(), this.headers.get(t.toLowerCase()) || null;
  }
  append(t, n) {
    return this.clone({ name: t, value: n, op: 'a' });
  }
  set(t, n) {
    return this.clone({ name: t, value: n, op: 's' });
  }
  delete(t, n) {
    return this.clone({ name: t, value: n, op: 'd' });
  }
  maybeSetNormalizedName(t, n) {
    this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
  }
  init() {
    this.lazyInit &&
      (this.lazyInit instanceof e ? this.copyFrom(this.lazyInit) : this.lazyInit(),
      (this.lazyInit = null),
      this.lazyUpdate && (this.lazyUpdate.forEach(t => this.applyUpdate(t)), (this.lazyUpdate = null)));
  }
  copyFrom(t) {
    t.init(),
      Array.from(t.headers.keys()).forEach(n => {
        this.headers.set(n, t.headers.get(n)), this.normalizedNames.set(n, t.normalizedNames.get(n));
      });
  }
  clone(t) {
    let n = new e();
    return (
      (n.lazyInit = this.lazyInit && this.lazyInit instanceof e ? this.lazyInit : this),
      (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
      n
    );
  }
  applyUpdate(t) {
    let n = t.name.toLowerCase();
    switch (t.op) {
      case 'a':
      case 's':
        let r = t.value;
        if ((typeof r == 'string' && (r = [r]), r.length === 0)) return;
        this.maybeSetNormalizedName(t.name, n);
        let o = (t.op === 'a' ? this.headers.get(n) : void 0) || [];
        o.push(...r), this.headers.set(n, o);
        break;
      case 'd':
        let i = t.value;
        if (!i) this.headers.delete(n), this.normalizedNames.delete(n);
        else {
          let s = this.headers.get(n);
          if (!s) return;
          (s = s.filter(a => i.indexOf(a) === -1)),
            s.length === 0 ? (this.headers.delete(n), this.normalizedNames.delete(n)) : this.headers.set(n, s);
        }
        break;
    }
  }
  setHeaderEntries(t, n) {
    let r = (Array.isArray(n) ? n : [n]).map(i => i.toString()),
      o = t.toLowerCase();
    this.headers.set(o, r), this.maybeSetNormalizedName(t, o);
  }
  forEach(t) {
    this.init(),
      Array.from(this.normalizedNames.keys()).forEach(n => t(this.normalizedNames.get(n), this.headers.get(n)));
  }
};
var Qd = (function (e) {
    return (
      (e[(e.Sent = 0)] = 'Sent'),
      (e[(e.UploadProgress = 1)] = 'UploadProgress'),
      (e[(e.ResponseHeader = 2)] = 'ResponseHeader'),
      (e[(e.DownloadProgress = 3)] = 'DownloadProgress'),
      (e[(e.Response = 4)] = 'Response'),
      (e[(e.User = 5)] = 'User'),
      e
    );
  })(Qd || {}),
  Ws = class {
    constructor(t, n = 200, r = 'OK') {
      (this.headers = t.headers || new wo()),
        (this.status = t.status !== void 0 ? t.status : n),
        (this.statusText = t.statusText || r),
        (this.url = t.url || null),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  };
var Co = class e extends Ws {
  constructor(t = {}) {
    super(t), (this.type = Qd.Response), (this.body = t.body !== void 0 ? t.body : null);
  }
  clone(t = {}) {
    return new e({
      body: t.body !== void 0 ? t.body : this.body,
      headers: t.headers || this.headers,
      status: t.status !== void 0 ? t.status : this.status,
      statusText: t.statusText || this.statusText,
      url: t.url || this.url || void 0,
    });
  }
};
var Py = new I('');
var zd = 'b',
  Wd = 'h',
  Gd = 's',
  qd = 'st',
  Zd = 'u',
  Yd = 'rt',
  Do = new I(''),
  Fy = ['GET', 'HEAD'];
function ky(e, t) {
  let l = p(Do),
    { isCacheActive: n } = l,
    r = Ha(l, ['isCacheActive']),
    { transferCache: o, method: i } = e;
  if (
    !n ||
    (i === 'POST' && !r.includePostRequests && !o) ||
    (i !== 'POST' && !Fy.includes(i)) ||
    o === !1 ||
    r.filter?.(e) === !1
  )
    return t(e);
  let s = p(dt),
    a = jy(e),
    u = s.get(a, null),
    c = r.includeHeaders;
  if ((typeof o == 'object' && o.includeHeaders && (c = o.includeHeaders), u)) {
    let { [zd]: d, [Yd]: f, [Wd]: h, [Gd]: v, [qd]: S, [Zd]: Y } = u,
      P = d;
    switch (f) {
      case 'arraybuffer':
        P = new TextEncoder().encode(d).buffer;
        break;
      case 'blob':
        P = new Blob([d]);
        break;
    }
    let ce = new wo(h);
    return m(new Co({ body: P, headers: ce, status: v, statusText: S, url: Y }));
  }
  return t(e).pipe(
    $(d => {
      d instanceof Co &&
        s.set(a, {
          [zd]: d.body,
          [Wd]: Ly(d.headers, c),
          [Gd]: d.status,
          [qd]: d.statusText,
          [Zd]: d.url || '',
          [Yd]: e.responseType,
        });
    })
  );
}
function Ly(e, t) {
  if (!t) return {};
  let n = {};
  for (let r of t) {
    let o = e.getAll(r);
    o !== null && (n[r] = o);
  }
  return n;
}
function jy(e) {
  let { params: t, method: n, responseType: r, url: o } = e,
    i = t
      .keys()
      .sort()
      .map(u => `${u}=${t.getAll(u)}`)
      .join('&'),
    s = n + '.' + r + '.' + o + '?' + i,
    a = Vy(s);
  return a;
}
function Vy(e) {
  let t = 0;
  for (let n of e) t = (Math.imul(31, t) + n.charCodeAt(0)) << 0;
  return (t += 2147483647 + 1), t.toString();
}
function Kd(e) {
  return [
    { provide: Do, useFactory: () => (Sn('NgHttpTransferCache'), g({ isCacheActive: !0 }, e)) },
    { provide: Py, useValue: ky, multi: !0, deps: [dt, Do] },
    {
      provide: Bt,
      multi: !0,
      useFactory: () => {
        let t = p(Ye),
          n = p(Do);
        return () => {
          $s(t).then(() => {
            n.isCacheActive = !1;
          });
        };
      },
    },
  ];
}
var Zs = class extends mo {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !0);
    }
  },
  Ys = class e extends Zs {
    static makeCurrent() {
      jd(new e());
    }
    onAndCancel(t, n, r) {
      return (
        t.addEventListener(n, r),
        () => {
          t.removeEventListener(n, r);
        }
      );
    }
    dispatchEvent(t, n) {
      t.dispatchEvent(n);
    }
    remove(t) {
      t.parentNode && t.parentNode.removeChild(t);
    }
    createElement(t, n) {
      return (n = n || this.getDefaultDocument()), n.createElement(t);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument('fakeTitle');
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(t) {
      return t.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(t) {
      return t instanceof DocumentFragment;
    }
    getGlobalEventTarget(t, n) {
      return n === 'window' ? window : n === 'document' ? t : n === 'body' ? t.body : null;
    }
    getBaseHref(t) {
      let n = Uy();
      return n == null ? null : By(n);
    }
    resetBaseElement() {
      _n = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(t) {
      return Bd(document.cookie, t);
    }
  },
  _n = null;
function Uy() {
  return (_n = _n || document.querySelector('base')), _n ? _n.getAttribute('href') : null;
}
function By(e) {
  return new URL(e, document.baseURI).pathname;
}
var Hy = (() => {
    let t = class t {
      build() {
        return new XMLHttpRequest();
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  Qs = new I('EventManagerPlugins'),
  tf = (() => {
    let t = class t {
      constructor(r, o) {
        (this._zone = o),
          (this._eventNameToPlugin = new Map()),
          r.forEach(i => {
            i.manager = this;
          }),
          (this._plugins = r.slice().reverse());
      }
      addEventListener(r, o, i) {
        return this._findPluginFor(o).addEventListener(r, o, i);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(r) {
        let o = this._eventNameToPlugin.get(r);
        if (o) return o;
        if (((o = this._plugins.find(s => s.supports(r))), !o)) throw new y(5101, !1);
        return this._eventNameToPlugin.set(r, o), o;
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)(_(Qs), _(j));
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  Eo = class {
    constructor(t) {
      this._doc = t;
    }
  },
  Gs = 'ng-app-id',
  nf = (() => {
    let t = class t {
      constructor(r, o, i, s = {}) {
        (this.doc = r),
          (this.appId = o),
          (this.nonce = i),
          (this.platformId = s),
          (this.styleRef = new Map()),
          (this.hostNodes = new Set()),
          (this.styleNodesInDOM = this.collectServerRenderedStyles()),
          (this.platformIsServer = zs(s)),
          this.resetHostNodes();
      }
      addStyles(r) {
        for (let o of r) this.changeUsageCount(o, 1) === 1 && this.onStyleAdded(o);
      }
      removeStyles(r) {
        for (let o of r) this.changeUsageCount(o, -1) <= 0 && this.onStyleRemoved(o);
      }
      ngOnDestroy() {
        let r = this.styleNodesInDOM;
        r && (r.forEach(o => o.remove()), r.clear());
        for (let o of this.getAllStyles()) this.onStyleRemoved(o);
        this.resetHostNodes();
      }
      addHost(r) {
        this.hostNodes.add(r);
        for (let o of this.getAllStyles()) this.addStyleToHost(r, o);
      }
      removeHost(r) {
        this.hostNodes.delete(r);
      }
      getAllStyles() {
        return this.styleRef.keys();
      }
      onStyleAdded(r) {
        for (let o of this.hostNodes) this.addStyleToHost(o, r);
      }
      onStyleRemoved(r) {
        let o = this.styleRef;
        o.get(r)?.elements?.forEach(i => i.remove()), o.delete(r);
      }
      collectServerRenderedStyles() {
        let r = this.doc.head?.querySelectorAll(`style[${Gs}="${this.appId}"]`);
        if (r?.length) {
          let o = new Map();
          return (
            r.forEach(i => {
              i.textContent != null && o.set(i.textContent, i);
            }),
            o
          );
        }
        return null;
      }
      changeUsageCount(r, o) {
        let i = this.styleRef;
        if (i.has(r)) {
          let s = i.get(r);
          return (s.usage += o), s.usage;
        }
        return i.set(r, { usage: o, elements: [] }), o;
      }
      getStyleElement(r, o) {
        let i = this.styleNodesInDOM,
          s = i?.get(o);
        if (s?.parentNode === r) return i.delete(o), s.removeAttribute(Gs), s;
        {
          let a = this.doc.createElement('style');
          return (
            this.nonce && a.setAttribute('nonce', this.nonce),
            (a.textContent = o),
            this.platformIsServer && a.setAttribute(Gs, this.appId),
            r.appendChild(a),
            a
          );
        }
      }
      addStyleToHost(r, o) {
        let i = this.getStyleElement(r, o),
          s = this.styleRef,
          a = s.get(o)?.elements;
        a ? a.push(i) : s.set(o, { elements: [i], usage: 1 });
      }
      resetHostNodes() {
        let r = this.hostNodes;
        r.clear(), r.add(this.doc.head);
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)(_(ae), _(ro), _(Cs, 8), _(Le));
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  qs = {
    svg: 'http://www.w3.org/2000/svg',
    xhtml: 'http://www.w3.org/1999/xhtml',
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/xmlns/',
    math: 'http://www.w3.org/1998/MathML/',
  },
  Js = /%COMP%/g,
  rf = '%COMP%',
  zy = `_nghost-${rf}`,
  Wy = `_ngcontent-${rf}`,
  Gy = !0,
  qy = new I('RemoveStylesOnCompDestroy', { providedIn: 'root', factory: () => Gy });
function Zy(e) {
  return Wy.replace(Js, e);
}
function Yy(e) {
  return zy.replace(Js, e);
}
function of(e, t) {
  return t.map(n => n.replace(Js, e));
}
var Jd = (() => {
    let t = class t {
      constructor(r, o, i, s, a, u, c, l = null) {
        (this.eventManager = r),
          (this.sharedStylesHost = o),
          (this.appId = i),
          (this.removeStylesOnCompDestroy = s),
          (this.doc = a),
          (this.platformId = u),
          (this.ngZone = c),
          (this.nonce = l),
          (this.rendererByCompId = new Map()),
          (this.platformIsServer = zs(u)),
          (this.defaultRenderer = new An(r, a, c, this.platformIsServer));
      }
      createRenderer(r, o) {
        if (!r || !o) return this.defaultRenderer;
        this.platformIsServer && o.encapsulation === Me.ShadowDom && (o = V(g({}, o), { encapsulation: Me.Emulated }));
        let i = this.getOrCreateRenderer(r, o);
        return i instanceof Io ? i.applyToHost(r) : i instanceof Nn && i.applyStyles(), i;
      }
      getOrCreateRenderer(r, o) {
        let i = this.rendererByCompId,
          s = i.get(o.id);
        if (!s) {
          let a = this.doc,
            u = this.ngZone,
            c = this.eventManager,
            l = this.sharedStylesHost,
            d = this.removeStylesOnCompDestroy,
            f = this.platformIsServer;
          switch (o.encapsulation) {
            case Me.Emulated:
              s = new Io(c, l, o, this.appId, d, a, u, f);
              break;
            case Me.ShadowDom:
              return new Ks(c, l, r, o, a, u, this.nonce, f);
            default:
              s = new Nn(c, l, o, d, a, u, f);
              break;
          }
          i.set(o.id, s);
        }
        return s;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)(_(tf), _(nf), _(ro), _(qy), _(ae), _(Le), _(j), _(Cs));
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  An = class {
    constructor(t, n, r, o) {
      (this.eventManager = t),
        (this.doc = n),
        (this.ngZone = r),
        (this.platformIsServer = o),
        (this.data = Object.create(null)),
        (this.throwOnSyntheticProps = !0),
        (this.destroyNode = null);
    }
    destroy() {}
    createElement(t, n) {
      return n ? this.doc.createElementNS(qs[n] || n, t) : this.doc.createElement(t);
    }
    createComment(t) {
      return this.doc.createComment(t);
    }
    createText(t) {
      return this.doc.createTextNode(t);
    }
    appendChild(t, n) {
      (Xd(t) ? t.content : t).appendChild(n);
    }
    insertBefore(t, n, r) {
      t && (Xd(t) ? t.content : t).insertBefore(n, r);
    }
    removeChild(t, n) {
      t && t.removeChild(n);
    }
    selectRootElement(t, n) {
      let r = typeof t == 'string' ? this.doc.querySelector(t) : t;
      if (!r) throw new y(-5104, !1);
      return n || (r.textContent = ''), r;
    }
    parentNode(t) {
      return t.parentNode;
    }
    nextSibling(t) {
      return t.nextSibling;
    }
    setAttribute(t, n, r, o) {
      if (o) {
        n = o + ':' + n;
        let i = qs[o];
        i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
      } else t.setAttribute(n, r);
    }
    removeAttribute(t, n, r) {
      if (r) {
        let o = qs[r];
        o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
      } else t.removeAttribute(n);
    }
    addClass(t, n) {
      t.classList.add(n);
    }
    removeClass(t, n) {
      t.classList.remove(n);
    }
    setStyle(t, n, r, o) {
      o & (Fe.DashCase | Fe.Important)
        ? t.style.setProperty(n, r, o & Fe.Important ? 'important' : '')
        : (t.style[n] = r);
    }
    removeStyle(t, n, r) {
      r & Fe.DashCase ? t.style.removeProperty(n) : (t.style[n] = '');
    }
    setProperty(t, n, r) {
      t != null && (t[n] = r);
    }
    setValue(t, n) {
      t.nodeValue = n;
    }
    listen(t, n, r) {
      if (typeof t == 'string' && ((t = Ht().getGlobalEventTarget(this.doc, t)), !t))
        throw new Error(`Unsupported event target ${t} for event ${n}`);
      return this.eventManager.addEventListener(t, n, this.decoratePreventDefault(r));
    }
    decoratePreventDefault(t) {
      return n => {
        if (n === '__ngUnwrap__') return t;
        (this.platformIsServer ? this.ngZone.runGuarded(() => t(n)) : t(n)) === !1 && n.preventDefault();
      };
    }
  };
function Xd(e) {
  return e.tagName === 'TEMPLATE' && e.content !== void 0;
}
var Ks = class extends An {
    constructor(t, n, r, o, i, s, a, u) {
      super(t, i, s, u),
        (this.sharedStylesHost = n),
        (this.hostEl = r),
        (this.shadowRoot = r.attachShadow({ mode: 'open' })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let c = of(o.id, o.styles);
      for (let l of c) {
        let d = document.createElement('style');
        a && d.setAttribute('nonce', a), (d.textContent = l), this.shadowRoot.appendChild(d);
      }
    }
    nodeOrShadowRoot(t) {
      return t === this.hostEl ? this.shadowRoot : t;
    }
    appendChild(t, n) {
      return super.appendChild(this.nodeOrShadowRoot(t), n);
    }
    insertBefore(t, n, r) {
      return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
    }
    removeChild(t, n) {
      return super.removeChild(this.nodeOrShadowRoot(t), n);
    }
    parentNode(t) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  Nn = class extends An {
    constructor(t, n, r, o, i, s, a, u) {
      super(t, i, s, a),
        (this.sharedStylesHost = n),
        (this.removeStylesOnCompDestroy = o),
        (this.styles = u ? of(u, r.styles) : r.styles);
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
      this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles);
    }
  },
  Io = class extends Nn {
    constructor(t, n, r, o, i, s, a, u) {
      let c = o + '-' + r.id;
      super(t, n, r, i, s, a, u, c), (this.contentAttr = Zy(c)), (this.hostAttr = Yy(c));
    }
    applyToHost(t) {
      this.applyStyles(), this.setAttribute(t, this.hostAttr, '');
    }
    createElement(t, n) {
      let r = super.createElement(t, n);
      return super.setAttribute(r, this.contentAttr, ''), r;
    }
  },
  Qy = (() => {
    let t = class t extends Eo {
      constructor(r) {
        super(r);
      }
      supports(r) {
        return !0;
      }
      addEventListener(r, o, i) {
        return r.addEventListener(o, i, !1), () => this.removeEventListener(r, o, i);
      }
      removeEventListener(r, o, i) {
        return r.removeEventListener(o, i);
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)(_(ae));
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  ef = ['alt', 'control', 'meta', 'shift'],
  Ky = {
    '\b': 'Backspace',
    '	': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    Del: 'Delete',
    Esc: 'Escape',
    Left: 'ArrowLeft',
    Right: 'ArrowRight',
    Up: 'ArrowUp',
    Down: 'ArrowDown',
    Menu: 'ContextMenu',
    Scroll: 'ScrollLock',
    Win: 'OS',
  },
  Jy = { alt: e => e.altKey, control: e => e.ctrlKey, meta: e => e.metaKey, shift: e => e.shiftKey },
  Xy = (() => {
    let t = class t extends Eo {
      constructor(r) {
        super(r);
      }
      supports(r) {
        return t.parseEventName(r) != null;
      }
      addEventListener(r, o, i) {
        let s = t.parseEventName(o),
          a = t.eventCallback(s.fullKey, i, this.manager.getZone());
        return this.manager.getZone().runOutsideAngular(() => Ht().onAndCancel(r, s.domEventName, a));
      }
      static parseEventName(r) {
        let o = r.toLowerCase().split('.'),
          i = o.shift();
        if (o.length === 0 || !(i === 'keydown' || i === 'keyup')) return null;
        let s = t._normalizeKey(o.pop()),
          a = '',
          u = o.indexOf('code');
        if (
          (u > -1 && (o.splice(u, 1), (a = 'code.')),
          ef.forEach(l => {
            let d = o.indexOf(l);
            d > -1 && (o.splice(d, 1), (a += l + '.'));
          }),
          (a += s),
          o.length != 0 || s.length === 0)
        )
          return null;
        let c = {};
        return (c.domEventName = i), (c.fullKey = a), c;
      }
      static matchEventFullKeyCode(r, o) {
        let i = Ky[r.key] || r.key,
          s = '';
        return (
          o.indexOf('code.') > -1 && ((i = r.code), (s = 'code.')),
          i == null || !i
            ? !1
            : ((i = i.toLowerCase()),
              i === ' ' ? (i = 'space') : i === '.' && (i = 'dot'),
              ef.forEach(a => {
                if (a !== i) {
                  let u = Jy[a];
                  u(r) && (s += a + '.');
                }
              }),
              (s += i),
              s === o)
        );
      }
      static eventCallback(r, o, i) {
        return s => {
          t.matchEventFullKeyCode(s, r) && i.runGuarded(() => o(s));
        };
      }
      static _normalizeKey(r) {
        return r === 'esc' ? 'escape' : r;
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)(_(ae));
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })();
function CT(e, t) {
  return Od(g({ rootComponent: e }, eD(t)));
}
function eD(e) {
  return { appProviders: [...iD, ...(e?.providers ?? [])], platformProviders: oD };
}
function tD() {
  Ys.makeCurrent();
}
function nD() {
  return new ke();
}
function rD() {
  return pl(document), document;
}
var oD = [
  { provide: Le, useValue: Hd },
  { provide: ws, useValue: tD, multi: !0 },
  { provide: ae, useFactory: rD, deps: [] },
];
var iD = [
  { provide: to, useValue: 'root' },
  { provide: ke, useFactory: nD, deps: [] },
  { provide: Qs, useClass: Qy, multi: !0, deps: [ae, j, Le] },
  { provide: Qs, useClass: Xy, multi: !0, deps: [ae] },
  Jd,
  nf,
  tf,
  { provide: gn, useExisting: Jd },
  { provide: vo, useClass: Hy, deps: [] },
  [],
];
function sD() {
  return new Xs(_(ae));
}
var Xs = (() => {
  let t = class t {
    constructor(r) {
      this._doc = r;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(r) {
      this._doc.title = r || '';
    }
  };
  (t.ɵfac = function (o) {
    return new (o || t)(_(ae));
  }),
    (t.ɵprov = C({
      token: t,
      factory: function (o) {
        let i = null;
        return o ? (i = new o()) : (i = sD()), i;
      },
      providedIn: 'root',
    }));
  let e = t;
  return e;
})();
function ET(...e) {
  let t = [],
    n = new Set(),
    r = n.has(1);
  for (let { ɵproviders: o, ɵkind: i } of e) n.add(i), o.length && t.push(o);
  return lt([[], Pd(), n.has(0) || r ? [] : Kd({}), t]);
}
var E = 'primary',
  Gn = Symbol('RouteTitle'),
  oa = class {
    constructor(t) {
      this.params = t || {};
    }
    has(t) {
      return Object.prototype.hasOwnProperty.call(this.params, t);
    }
    get(t) {
      if (this.has(t)) {
        let n = this.params[t];
        return Array.isArray(n) ? n[0] : n;
      }
      return null;
    }
    getAll(t) {
      if (this.has(t)) {
        let n = this.params[t];
        return Array.isArray(n) ? n : [n];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function Zt(e) {
  return new oa(e);
}
function uD(e, t, n) {
  let r = n.path.split('/');
  if (r.length > e.length || (n.pathMatch === 'full' && (t.hasChildren() || r.length < e.length))) return null;
  let o = {};
  for (let i = 0; i < r.length; i++) {
    let s = r[i],
      a = e[i];
    if (s.startsWith(':')) o[s.substring(1)] = a;
    else if (s !== a.path) return null;
  }
  return { consumed: e.slice(0, r.length), posParams: o };
}
function cD(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; ++n) if (!xe(e[n], t[n])) return !1;
  return !0;
}
function xe(e, t) {
  let n = e ? ia(e) : void 0,
    r = t ? ia(t) : void 0;
  if (!n || !r || n.length != r.length) return !1;
  let o;
  for (let i = 0; i < n.length; i++) if (((o = n[i]), !df(e[o], t[o]))) return !1;
  return !0;
}
function ia(e) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
}
function df(e, t) {
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return !1;
    let n = [...e].sort(),
      r = [...t].sort();
    return n.every((o, i) => r[i] === o);
  } else return e === t;
}
function ff(e) {
  return e.length > 0 ? e[e.length - 1] : null;
}
function Je(e) {
  return ti(e) ? e : Tn(e) ? L(Promise.resolve(e)) : m(e);
}
var lD = { exact: pf, subset: gf },
  hf = { exact: dD, subset: fD, ignored: () => !0 };
function sf(e, t, n) {
  return (
    lD[n.paths](e.root, t.root, n.matrixParams) &&
    hf[n.queryParams](e.queryParams, t.queryParams) &&
    !(n.fragment === 'exact' && e.fragment !== t.fragment)
  );
}
function dD(e, t) {
  return xe(e, t);
}
function pf(e, t, n) {
  if (!pt(e.segments, t.segments) || !So(e.segments, t.segments, n) || e.numberOfChildren !== t.numberOfChildren)
    return !1;
  for (let r in t.children) if (!e.children[r] || !pf(e.children[r], t.children[r], n)) return !1;
  return !0;
}
function fD(e, t) {
  return Object.keys(t).length <= Object.keys(e).length && Object.keys(t).every(n => df(e[n], t[n]));
}
function gf(e, t, n) {
  return mf(e, t, t.segments, n);
}
function mf(e, t, n, r) {
  if (e.segments.length > n.length) {
    let o = e.segments.slice(0, n.length);
    return !(!pt(o, n) || t.hasChildren() || !So(o, n, r));
  } else if (e.segments.length === n.length) {
    if (!pt(e.segments, n) || !So(e.segments, n, r)) return !1;
    for (let o in t.children) if (!e.children[o] || !gf(e.children[o], t.children[o], r)) return !1;
    return !0;
  } else {
    let o = n.slice(0, e.segments.length),
      i = n.slice(e.segments.length);
    return !pt(e.segments, o) || !So(e.segments, o, r) || !e.children[E] ? !1 : mf(e.children[E], t, i, r);
  }
}
function So(e, t, n) {
  return t.every((r, o) => hf[n](e[o].parameters, r.parameters));
}
var Qe = class {
    constructor(t = new O([], {}), n = {}, r = null) {
      (this.root = t), (this.queryParams = n), (this.fragment = r);
    }
    get queryParamMap() {
      return this._queryParamMap || (this._queryParamMap = Zt(this.queryParams)), this._queryParamMap;
    }
    toString() {
      return gD.serialize(this);
    }
  },
  O = class {
    constructor(t, n) {
      (this.segments = t), (this.children = n), (this.parent = null), Object.values(n).forEach(r => (r.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return To(this);
    }
  },
  ht = class {
    constructor(t, n) {
      (this.path = t), (this.parameters = n);
    }
    get parameterMap() {
      return this._parameterMap || (this._parameterMap = Zt(this.parameters)), this._parameterMap;
    }
    toString() {
      return yf(this);
    }
  };
function hD(e, t) {
  return pt(e, t) && e.every((n, r) => xe(n.parameters, t[r].parameters));
}
function pt(e, t) {
  return e.length !== t.length ? !1 : e.every((n, r) => n.path === t[r].path);
}
function pD(e, t) {
  let n = [];
  return (
    Object.entries(e.children).forEach(([r, o]) => {
      r === E && (n = n.concat(t(o, r)));
    }),
    Object.entries(e.children).forEach(([r, o]) => {
      r !== E && (n = n.concat(t(o, r)));
    }),
    n
  );
}
var Aa = (() => {
    let t = class t {};
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: () => (() => new _o())(), providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  _o = class {
    parse(t) {
      let n = new aa(t);
      return new Qe(n.parseRootSegment(), n.parseQueryParams(), n.parseFragment());
    }
    serialize(t) {
      let n = `/${Rn(t.root, !0)}`,
        r = yD(t.queryParams),
        o = typeof t.fragment == 'string' ? `#${mD(t.fragment)}` : '';
      return `${n}${r}${o}`;
    }
  },
  gD = new _o();
function To(e) {
  return e.segments.map(t => yf(t)).join('/');
}
function Rn(e, t) {
  if (!e.hasChildren()) return To(e);
  if (t) {
    let n = e.children[E] ? Rn(e.children[E], !1) : '',
      r = [];
    return (
      Object.entries(e.children).forEach(([o, i]) => {
        o !== E && r.push(`${o}:${Rn(i, !1)}`);
      }),
      r.length > 0 ? `${n}(${r.join('//')})` : n
    );
  } else {
    let n = pD(e, (r, o) => (o === E ? [Rn(e.children[E], !1)] : [`${o}:${Rn(r, !1)}`]));
    return Object.keys(e.children).length === 1 && e.children[E] != null
      ? `${To(e)}/${n[0]}`
      : `${To(e)}/(${n.join('//')})`;
  }
}
function vf(e) {
  return encodeURIComponent(e).replace(/%40/g, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',');
}
function bo(e) {
  return vf(e).replace(/%3B/gi, ';');
}
function mD(e) {
  return encodeURI(e);
}
function sa(e) {
  return vf(e).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
}
function xo(e) {
  return decodeURIComponent(e);
}
function af(e) {
  return xo(e.replace(/\+/g, '%20'));
}
function yf(e) {
  return `${sa(e.path)}${vD(e.parameters)}`;
}
function vD(e) {
  return Object.keys(e)
    .map(t => `;${sa(t)}=${sa(e[t])}`)
    .join('');
}
function yD(e) {
  let t = Object.keys(e)
    .map(n => {
      let r = e[n];
      return Array.isArray(r) ? r.map(o => `${bo(n)}=${bo(o)}`).join('&') : `${bo(n)}=${bo(r)}`;
    })
    .filter(n => !!n);
  return t.length ? `?${t.join('&')}` : '';
}
var DD = /^[^\/()?;#]+/;
function ea(e) {
  let t = e.match(DD);
  return t ? t[0] : '';
}
var wD = /^[^\/()?;=#]+/;
function CD(e) {
  let t = e.match(wD);
  return t ? t[0] : '';
}
var ED = /^[^=?&#]+/;
function ID(e) {
  let t = e.match(ED);
  return t ? t[0] : '';
}
var bD = /^[^&#]+/;
function MD(e) {
  let t = e.match(bD);
  return t ? t[0] : '';
}
var aa = class {
  constructor(t) {
    (this.url = t), (this.remaining = t);
  }
  parseRootSegment() {
    return (
      this.consumeOptional('/'),
      this.remaining === '' || this.peekStartsWith('?') || this.peekStartsWith('#')
        ? new O([], {})
        : new O([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let t = {};
    if (this.consumeOptional('?'))
      do this.parseQueryParam(t);
      while (this.consumeOptional('&'));
    return t;
  }
  parseFragment() {
    return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null;
  }
  parseChildren() {
    if (this.remaining === '') return {};
    this.consumeOptional('/');
    let t = [];
    for (
      this.peekStartsWith('(') || t.push(this.parseSegment());
      this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(');

    )
      this.capture('/'), t.push(this.parseSegment());
    let n = {};
    this.peekStartsWith('/(') && (this.capture('/'), (n = this.parseParens(!0)));
    let r = {};
    return (
      this.peekStartsWith('(') && (r = this.parseParens(!1)),
      (t.length > 0 || Object.keys(n).length > 0) && (r[E] = new O(t, n)),
      r
    );
  }
  parseSegment() {
    let t = ea(this.remaining);
    if (t === '' && this.peekStartsWith(';')) throw new y(4009, !1);
    return this.capture(t), new ht(xo(t), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let t = {};
    for (; this.consumeOptional(';'); ) this.parseParam(t);
    return t;
  }
  parseParam(t) {
    let n = CD(this.remaining);
    if (!n) return;
    this.capture(n);
    let r = '';
    if (this.consumeOptional('=')) {
      let o = ea(this.remaining);
      o && ((r = o), this.capture(r));
    }
    t[xo(n)] = xo(r);
  }
  parseQueryParam(t) {
    let n = ID(this.remaining);
    if (!n) return;
    this.capture(n);
    let r = '';
    if (this.consumeOptional('=')) {
      let s = MD(this.remaining);
      s && ((r = s), this.capture(r));
    }
    let o = af(n),
      i = af(r);
    if (t.hasOwnProperty(o)) {
      let s = t[o];
      Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
    } else t[o] = i;
  }
  parseParens(t) {
    let n = {};
    for (this.capture('('); !this.consumeOptional(')') && this.remaining.length > 0; ) {
      let r = ea(this.remaining),
        o = this.remaining[r.length];
      if (o !== '/' && o !== ')' && o !== ';') throw new y(4010, !1);
      let i;
      r.indexOf(':') > -1 ? ((i = r.slice(0, r.indexOf(':'))), this.capture(i), this.capture(':')) : t && (i = E);
      let s = this.parseChildren();
      (n[i] = Object.keys(s).length === 1 ? s[E] : new O([], s)), this.consumeOptional('//');
    }
    return n;
  }
  peekStartsWith(t) {
    return this.remaining.startsWith(t);
  }
  consumeOptional(t) {
    return this.peekStartsWith(t) ? ((this.remaining = this.remaining.substring(t.length)), !0) : !1;
  }
  capture(t) {
    if (!this.consumeOptional(t)) throw new y(4011, !1);
  }
};
function Df(e) {
  return e.segments.length > 0 ? new O([], { [E]: e }) : e;
}
function wf(e) {
  let t = {};
  for (let r of Object.keys(e.children)) {
    let o = e.children[r],
      i = wf(o);
    if (r === E && i.segments.length === 0 && i.hasChildren()) for (let [s, a] of Object.entries(i.children)) t[s] = a;
    else (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
  }
  let n = new O(e.segments, t);
  return SD(n);
}
function SD(e) {
  if (e.numberOfChildren === 1 && e.children[E]) {
    let t = e.children[E];
    return new O(e.segments.concat(t.segments), t.children);
  }
  return e;
}
function Yt(e) {
  return e instanceof Qe;
}
function TD(e, t, n = null, r = null) {
  let o = Cf(e);
  return Ef(o, t, n, r);
}
function Cf(e) {
  let t;
  function n(i) {
    let s = {};
    for (let u of i.children) {
      let c = n(u);
      s[u.outlet] = c;
    }
    let a = new O(i.url, s);
    return i === e && (t = a), a;
  }
  let r = n(e.root),
    o = Df(r);
  return t ?? o;
}
function Ef(e, t, n, r) {
  let o = e;
  for (; o.parent; ) o = o.parent;
  if (t.length === 0) return ta(o, o, o, n, r);
  let i = xD(t);
  if (i.toRoot()) return ta(o, o, new O([], {}), n, r);
  let s = _D(i, o, e),
    a = s.processChildren ? Fn(s.segmentGroup, s.index, i.commands) : bf(s.segmentGroup, s.index, i.commands);
  return ta(o, s.segmentGroup, a, n, r);
}
function Ao(e) {
  return typeof e == 'object' && e != null && !e.outlets && !e.segmentPath;
}
function jn(e) {
  return typeof e == 'object' && e != null && e.outlets;
}
function ta(e, t, n, r, o) {
  let i = {};
  r &&
    Object.entries(r).forEach(([u, c]) => {
      i[u] = Array.isArray(c) ? c.map(l => `${l}`) : `${c}`;
    });
  let s;
  e === t ? (s = n) : (s = If(e, t, n));
  let a = Df(wf(s));
  return new Qe(a, i, o);
}
function If(e, t, n) {
  let r = {};
  return (
    Object.entries(e.children).forEach(([o, i]) => {
      i === t ? (r[o] = n) : (r[o] = If(i, t, n));
    }),
    new O(e.segments, r)
  );
}
var No = class {
  constructor(t, n, r) {
    if (((this.isAbsolute = t), (this.numberOfDoubleDots = n), (this.commands = r), t && r.length > 0 && Ao(r[0])))
      throw new y(4003, !1);
    let o = r.find(jn);
    if (o && o !== ff(r)) throw new y(4004, !1);
  }
  toRoot() {
    return this.isAbsolute && this.commands.length === 1 && this.commands[0] == '/';
  }
};
function xD(e) {
  if (typeof e[0] == 'string' && e.length === 1 && e[0] === '/') return new No(!0, 0, e);
  let t = 0,
    n = !1,
    r = e.reduce((o, i, s) => {
      if (typeof i == 'object' && i != null) {
        if (i.outlets) {
          let a = {};
          return (
            Object.entries(i.outlets).forEach(([u, c]) => {
              a[u] = typeof c == 'string' ? c.split('/') : c;
            }),
            [...o, { outlets: a }]
          );
        }
        if (i.segmentPath) return [...o, i.segmentPath];
      }
      return typeof i != 'string'
        ? [...o, i]
        : s === 0
          ? (i.split('/').forEach((a, u) => {
              (u == 0 && a === '.') || (u == 0 && a === '' ? (n = !0) : a === '..' ? t++ : a != '' && o.push(a));
            }),
            o)
          : [...o, i];
    }, []);
  return new No(n, t, r);
}
var Gt = class {
  constructor(t, n, r) {
    (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
  }
};
function _D(e, t, n) {
  if (e.isAbsolute) return new Gt(t, !0, 0);
  if (!n) return new Gt(t, !1, NaN);
  if (n.parent === null) return new Gt(n, !0, 0);
  let r = Ao(e.commands[0]) ? 0 : 1,
    o = n.segments.length - 1 + r;
  return AD(n, o, e.numberOfDoubleDots);
}
function AD(e, t, n) {
  let r = e,
    o = t,
    i = n;
  for (; i > o; ) {
    if (((i -= o), (r = r.parent), !r)) throw new y(4005, !1);
    o = r.segments.length;
  }
  return new Gt(r, !1, o - i);
}
function ND(e) {
  return jn(e[0]) ? e[0].outlets : { [E]: e };
}
function bf(e, t, n) {
  if ((e || (e = new O([], {})), e.segments.length === 0 && e.hasChildren())) return Fn(e, t, n);
  let r = RD(e, t, n),
    o = n.slice(r.commandIndex);
  if (r.match && r.pathIndex < e.segments.length) {
    let i = new O(e.segments.slice(0, r.pathIndex), {});
    return (i.children[E] = new O(e.segments.slice(r.pathIndex), e.children)), Fn(i, 0, o);
  } else
    return r.match && o.length === 0
      ? new O(e.segments, {})
      : r.match && !e.hasChildren()
        ? ua(e, t, n)
        : r.match
          ? Fn(e, 0, o)
          : ua(e, t, n);
}
function Fn(e, t, n) {
  if (n.length === 0) return new O(e.segments, {});
  {
    let r = ND(n),
      o = {};
    if (
      Object.keys(r).some(i => i !== E) &&
      e.children[E] &&
      e.numberOfChildren === 1 &&
      e.children[E].segments.length === 0
    ) {
      let i = Fn(e.children[E], t, n);
      return new O(e.segments, i.children);
    }
    return (
      Object.entries(r).forEach(([i, s]) => {
        typeof s == 'string' && (s = [s]), s !== null && (o[i] = bf(e.children[i], t, s));
      }),
      Object.entries(e.children).forEach(([i, s]) => {
        r[i] === void 0 && (o[i] = s);
      }),
      new O(e.segments, o)
    );
  }
}
function RD(e, t, n) {
  let r = 0,
    o = t,
    i = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; o < e.segments.length; ) {
    if (r >= n.length) return i;
    let s = e.segments[o],
      a = n[r];
    if (jn(a)) break;
    let u = `${a}`,
      c = r < n.length - 1 ? n[r + 1] : null;
    if (o > 0 && u === void 0) break;
    if (u && c && typeof c == 'object' && c.outlets === void 0) {
      if (!cf(u, c, s)) return i;
      r += 2;
    } else {
      if (!cf(u, {}, s)) return i;
      r++;
    }
    o++;
  }
  return { match: !0, pathIndex: o, commandIndex: r };
}
function ua(e, t, n) {
  let r = e.segments.slice(0, t),
    o = 0;
  for (; o < n.length; ) {
    let i = n[o];
    if (jn(i)) {
      let u = OD(i.outlets);
      return new O(r, u);
    }
    if (o === 0 && Ao(n[0])) {
      let u = e.segments[t];
      r.push(new ht(u.path, uf(n[0]))), o++;
      continue;
    }
    let s = jn(i) ? i.outlets[E] : `${i}`,
      a = o < n.length - 1 ? n[o + 1] : null;
    s && a && Ao(a) ? (r.push(new ht(s, uf(a))), (o += 2)) : (r.push(new ht(s, {})), o++);
  }
  return new O(r, {});
}
function OD(e) {
  let t = {};
  return (
    Object.entries(e).forEach(([n, r]) => {
      typeof r == 'string' && (r = [r]), r !== null && (t[n] = ua(new O([], {}), 0, r));
    }),
    t
  );
}
function uf(e) {
  let t = {};
  return Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t;
}
function cf(e, t, n) {
  return e == n.path && xe(t, n.parameters);
}
var kn = 'imperative',
  ge = class {
    constructor(t, n) {
      (this.id = t), (this.url = n);
    }
  },
  Vn = class extends ge {
    constructor(t, n, r = 'imperative', o = null) {
      super(t, n), (this.type = 0), (this.navigationTrigger = r), (this.restoredState = o);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  gt = class extends ge {
    constructor(t, n, r) {
      super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  Ke = class extends ge {
    constructor(t, n, r, o) {
      super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  mt = class extends ge {
    constructor(t, n, r, o) {
      super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
    }
  },
  $n = class extends ge {
    constructor(t, n, r, o) {
      super(t, n), (this.error = r), (this.target = o), (this.type = 3);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  Ro = class extends ge {
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o), (this.type = 4);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  ca = class extends ge {
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o), (this.type = 7);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  la = class extends ge {
    constructor(t, n, r, o, i) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o), (this.shouldActivate = i), (this.type = 8);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  da = class extends ge {
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o), (this.type = 5);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  fa = class extends ge {
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o), (this.type = 6);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  ha = class {
    constructor(t) {
      (this.route = t), (this.type = 9);
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  pa = class {
    constructor(t) {
      (this.route = t), (this.type = 10);
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  ga = class {
    constructor(t) {
      (this.snapshot = t), (this.type = 11);
    }
    toString() {
      return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
    }
  },
  ma = class {
    constructor(t) {
      (this.snapshot = t), (this.type = 12);
    }
    toString() {
      return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
    }
  },
  va = class {
    constructor(t) {
      (this.snapshot = t), (this.type = 13);
    }
    toString() {
      return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
    }
  },
  ya = class {
    constructor(t) {
      (this.snapshot = t), (this.type = 14);
    }
    toString() {
      return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
    }
  };
var Un = class {},
  Bn = class {
    constructor(t) {
      this.url = t;
    }
  };
var Da = class {
    constructor() {
      (this.outlet = null),
        (this.route = null),
        (this.injector = null),
        (this.children = new jo()),
        (this.attachRef = null);
    }
  },
  jo = (() => {
    let t = class t {
      constructor() {
        this.contexts = new Map();
      }
      onChildOutletCreated(r, o) {
        let i = this.getOrCreateContext(r);
        (i.outlet = o), this.contexts.set(r, i);
      }
      onChildOutletDestroyed(r) {
        let o = this.getContext(r);
        o && ((o.outlet = null), (o.attachRef = null));
      }
      onOutletDeactivated() {
        let r = this.contexts;
        return (this.contexts = new Map()), r;
      }
      onOutletReAttached(r) {
        this.contexts = r;
      }
      getOrCreateContext(r) {
        let o = this.getContext(r);
        return o || ((o = new Da()), this.contexts.set(r, o)), o;
      }
      getContext(r) {
        return this.contexts.get(r) || null;
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  Oo = class {
    constructor(t) {
      this._root = t;
    }
    get root() {
      return this._root.value;
    }
    parent(t) {
      let n = this.pathFromRoot(t);
      return n.length > 1 ? n[n.length - 2] : null;
    }
    children(t) {
      let n = wa(t, this._root);
      return n ? n.children.map(r => r.value) : [];
    }
    firstChild(t) {
      let n = wa(t, this._root);
      return n && n.children.length > 0 ? n.children[0].value : null;
    }
    siblings(t) {
      let n = Ca(t, this._root);
      return n.length < 2 ? [] : n[n.length - 2].children.map(o => o.value).filter(o => o !== t);
    }
    pathFromRoot(t) {
      return Ca(t, this._root).map(n => n.value);
    }
  };
function wa(e, t) {
  if (e === t.value) return t;
  for (let n of t.children) {
    let r = wa(e, n);
    if (r) return r;
  }
  return null;
}
function Ca(e, t) {
  if (e === t.value) return [t];
  for (let n of t.children) {
    let r = Ca(e, n);
    if (r.length) return r.unshift(t), r;
  }
  return [];
}
var ue = class {
  constructor(t, n) {
    (this.value = t), (this.children = n);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function Wt(e) {
  let t = {};
  return e && e.children.forEach(n => (t[n.value.outlet] = n)), t;
}
var Po = class extends Oo {
  constructor(t, n) {
    super(t), (this.snapshot = n), Ra(this, t);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function Mf(e, t) {
  let n = PD(e, t),
    r = new W([new ht('', {})]),
    o = new W({}),
    i = new W({}),
    s = new W({}),
    a = new W(''),
    u = new Qt(r, o, s, a, i, E, t, n.root);
  return (u.snapshot = n.root), new Po(new ue(u, []), n);
}
function PD(e, t) {
  let n = {},
    r = {},
    o = {},
    i = '',
    s = new Hn([], n, o, i, r, E, t, null, {});
  return new Fo('', new ue(s, []));
}
var Qt = class {
  constructor(t, n, r, o, i, s, a, u) {
    (this.urlSubject = t),
      (this.paramsSubject = n),
      (this.queryParamsSubject = r),
      (this.fragmentSubject = o),
      (this.dataSubject = i),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = u),
      (this.title = this.dataSubject?.pipe(R(c => c[Gn])) ?? m(void 0)),
      (this.url = t),
      (this.params = n),
      (this.queryParams = r),
      (this.fragment = o),
      (this.data = i);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return this._paramMap || (this._paramMap = this.params.pipe(R(t => Zt(t)))), this._paramMap;
  }
  get queryParamMap() {
    return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(R(t => Zt(t)))), this._queryParamMap;
  }
  toString() {
    return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
  }
};
function Na(e, t, n = 'emptyOnly') {
  let r,
    { routeConfig: o } = e;
  return (
    t !== null && (n === 'always' || o?.path === '' || (!t.component && !t.routeConfig?.loadComponent))
      ? (r = {
          params: g(g({}, t.params), e.params),
          data: g(g({}, t.data), e.data),
          resolve: g(g(g(g({}, e.data), t.data), o?.data), e._resolvedData),
        })
      : (r = { params: e.params, data: e.data, resolve: g(g({}, e.data), e._resolvedData ?? {}) }),
    o && Tf(o) && (r.resolve[Gn] = o.title),
    r
  );
}
var Hn = class {
    get title() {
      return this.data?.[Gn];
    }
    constructor(t, n, r, o, i, s, a, u, c) {
      (this.url = t),
        (this.params = n),
        (this.queryParams = r),
        (this.fragment = o),
        (this.data = i),
        (this.outlet = s),
        (this.component = a),
        (this.routeConfig = u),
        (this._resolve = c);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return this._paramMap || (this._paramMap = Zt(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return this._queryParamMap || (this._queryParamMap = Zt(this.queryParams)), this._queryParamMap;
    }
    toString() {
      let t = this.url.map(r => r.toString()).join('/'),
        n = this.routeConfig ? this.routeConfig.path : '';
      return `Route(url:'${t}', path:'${n}')`;
    }
  },
  Fo = class extends Oo {
    constructor(t, n) {
      super(n), (this.url = t), Ra(this, n);
    }
    toString() {
      return Sf(this._root);
    }
  };
function Ra(e, t) {
  (t.value._routerState = e), t.children.forEach(n => Ra(e, n));
}
function Sf(e) {
  let t = e.children.length > 0 ? ` { ${e.children.map(Sf).join(', ')} } ` : '';
  return `${e.value}${t}`;
}
function na(e) {
  if (e.snapshot) {
    let t = e.snapshot,
      n = e._futureSnapshot;
    (e.snapshot = n),
      xe(t.queryParams, n.queryParams) || e.queryParamsSubject.next(n.queryParams),
      t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
      xe(t.params, n.params) || e.paramsSubject.next(n.params),
      cD(t.url, n.url) || e.urlSubject.next(n.url),
      xe(t.data, n.data) || e.dataSubject.next(n.data);
  } else (e.snapshot = e._futureSnapshot), e.dataSubject.next(e._futureSnapshot.data);
}
function Ea(e, t) {
  let n = xe(e.params, t.params) && hD(e.url, t.url),
    r = !e.parent != !t.parent;
  return n && !r && (!e.parent || Ea(e.parent, t.parent));
}
function Tf(e) {
  return typeof e.title == 'string' || e.title === null;
}
var FD = (() => {
    let t = class t {
      constructor() {
        (this.activated = null),
          (this._activatedRoute = null),
          (this.name = E),
          (this.activateEvents = new we()),
          (this.deactivateEvents = new we()),
          (this.attachEvents = new we()),
          (this.detachEvents = new we()),
          (this.parentContexts = p(jo)),
          (this.location = p(ho)),
          (this.changeDetector = p(co)),
          (this.environmentInjector = p(pe)),
          (this.inputBinder = p(Oa, { optional: !0 })),
          (this.supportsBindingToComponentInputs = !0);
      }
      get activatedComponentRef() {
        return this.activated;
      }
      ngOnChanges(r) {
        if (r.name) {
          let { firstChange: o, previousValue: i } = r.name;
          if (o) return;
          this.isTrackedInParentContexts(i) && (this.deactivate(), this.parentContexts.onChildOutletDestroyed(i)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(r) {
        return this.parentContexts.getContext(r)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if ((this.parentContexts.onChildOutletCreated(this.name, this), this.activated)) return;
        let r = this.parentContexts.getContext(this.name);
        r?.route && (r.attachRef ? this.attach(r.attachRef, r.route) : this.activateWith(r.route, r.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new y(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new y(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new y(4012, !1);
        this.location.detach();
        let r = this.activated;
        return (this.activated = null), (this._activatedRoute = null), this.detachEvents.emit(r.instance), r;
      }
      attach(r, o) {
        (this.activated = r),
          (this._activatedRoute = o),
          this.location.insert(r.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(r.instance);
      }
      deactivate() {
        if (this.activated) {
          let r = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(r);
        }
      }
      activateWith(r, o) {
        if (this.isActivated) throw new y(4013, !1);
        this._activatedRoute = r;
        let i = this.location,
          a = r.snapshot.component,
          u = this.parentContexts.getOrCreateContext(this.name).children,
          c = new Ia(r, u, i.injector);
        (this.activated = i.createComponent(a, {
          index: i.length,
          injector: c,
          environmentInjector: o ?? this.environmentInjector,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵdir = us({
        type: t,
        selectors: [['router-outlet']],
        inputs: { name: 'name' },
        outputs: {
          activateEvents: 'activate',
          deactivateEvents: 'deactivate',
          attachEvents: 'attach',
          detachEvents: 'detach',
        },
        exportAs: ['outlet'],
        standalone: !0,
        features: [Jr],
      }));
    let e = t;
    return e;
  })(),
  Ia = class {
    constructor(t, n, r) {
      (this.route = t), (this.childContexts = n), (this.parent = r);
    }
    get(t, n) {
      return t === Qt ? this.route : t === jo ? this.childContexts : this.parent.get(t, n);
    }
  },
  Oa = new I('');
function kD(e, t, n) {
  let r = zn(e, t._root, n ? n._root : void 0);
  return new Po(r, t);
}
function zn(e, t, n) {
  if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
    let r = n.value;
    r._futureSnapshot = t.value;
    let o = LD(e, t, n);
    return new ue(r, o);
  } else {
    if (e.shouldAttach(t.value)) {
      let i = e.retrieve(t.value);
      if (i !== null) {
        let s = i.route;
        return (s.value._futureSnapshot = t.value), (s.children = t.children.map(a => zn(e, a))), s;
      }
    }
    let r = jD(t.value),
      o = t.children.map(i => zn(e, i));
    return new ue(r, o);
  }
}
function LD(e, t, n) {
  return t.children.map(r => {
    for (let o of n.children) if (e.shouldReuseRoute(r.value, o.value.snapshot)) return zn(e, r, o);
    return zn(e, r);
  });
}
function jD(e) {
  return new Qt(
    new W(e.url),
    new W(e.params),
    new W(e.queryParams),
    new W(e.fragment),
    new W(e.data),
    e.outlet,
    e.component,
    e
  );
}
var xf = 'ngNavigationCancelingError';
function _f(e, t) {
  let { redirectTo: n, navigationBehaviorOptions: r } = Yt(t)
      ? { redirectTo: t, navigationBehaviorOptions: void 0 }
      : t,
    o = Af(!1, 0, t);
  return (o.url = n), (o.navigationBehaviorOptions = r), o;
}
function Af(e, t, n) {
  let r = new Error('NavigationCancelingError: ' + (e || ''));
  return (r[xf] = !0), (r.cancellationCode = t), n && (r.url = n), r;
}
function VD(e) {
  return Nf(e) && Yt(e.url);
}
function Nf(e) {
  return e && e[xf];
}
var $D = (() => {
  let t = class t {};
  (t.ɵfac = function (o) {
    return new (o || t)();
  }),
    (t.ɵcmp = mc({
      type: t,
      selectors: [['ng-component']],
      standalone: !0,
      features: [xd],
      decls: 1,
      vars: 0,
      template: function (o, i) {
        o & 1 && Ls(0, 'router-outlet');
      },
      dependencies: [FD],
      encapsulation: 2,
    }));
  let e = t;
  return e;
})();
function UD(e, t) {
  return e.providers && !e._injector && (e._injector = js(e.providers, t, `Route: ${e.path}`)), e._injector ?? t;
}
function Pa(e) {
  let t = e.children && e.children.map(Pa),
    n = t ? V(g({}, e), { children: t }) : g({}, e);
  return (
    !n.component && !n.loadComponent && (t || n.loadChildren) && n.outlet && n.outlet !== E && (n.component = $D), n
  );
}
function _e(e) {
  return e.outlet || E;
}
function BD(e, t) {
  let n = e.filter(r => _e(r) === t);
  return n.push(...e.filter(r => _e(r) !== t)), n;
}
function qn(e) {
  if (!e) return null;
  if (e.routeConfig?._injector) return e.routeConfig._injector;
  for (let t = e.parent; t; t = t.parent) {
    let n = t.routeConfig;
    if (n?._loadedInjector) return n._loadedInjector;
    if (n?._injector) return n._injector;
  }
  return null;
}
var HD = (e, t, n, r) => R(o => (new ba(t, o.targetRouterState, o.currentRouterState, n, r).activate(e), o)),
  ba = class {
    constructor(t, n, r, o, i) {
      (this.routeReuseStrategy = t),
        (this.futureState = n),
        (this.currState = r),
        (this.forwardEvent = o),
        (this.inputBindingEnabled = i);
    }
    activate(t) {
      let n = this.futureState._root,
        r = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(n, r, t), na(this.futureState.root), this.activateChildRoutes(n, r, t);
    }
    deactivateChildRoutes(t, n, r) {
      let o = Wt(n);
      t.children.forEach(i => {
        let s = i.value.outlet;
        this.deactivateRoutes(i, o[s], r), delete o[s];
      }),
        Object.values(o).forEach(i => {
          this.deactivateRouteAndItsChildren(i, r);
        });
    }
    deactivateRoutes(t, n, r) {
      let o = t.value,
        i = n ? n.value : null;
      if (o === i)
        if (o.component) {
          let s = r.getContext(o.outlet);
          s && this.deactivateChildRoutes(t, n, s.children);
        } else this.deactivateChildRoutes(t, n, r);
      else i && this.deactivateRouteAndItsChildren(n, r);
    }
    deactivateRouteAndItsChildren(t, n) {
      t.value.component && this.routeReuseStrategy.shouldDetach(t.value.snapshot)
        ? this.detachAndStoreRouteSubtree(t, n)
        : this.deactivateRouteAndOutlet(t, n);
    }
    detachAndStoreRouteSubtree(t, n) {
      let r = n.getContext(t.value.outlet),
        o = r && t.value.component ? r.children : n,
        i = Wt(t);
      for (let s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], o);
      if (r && r.outlet) {
        let s = r.outlet.detach(),
          a = r.children.onOutletDeactivated();
        this.routeReuseStrategy.store(t.value.snapshot, { componentRef: s, route: t, contexts: a });
      }
    }
    deactivateRouteAndOutlet(t, n) {
      let r = n.getContext(t.value.outlet),
        o = r && t.value.component ? r.children : n,
        i = Wt(t);
      for (let s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], o);
      r &&
        (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()), (r.attachRef = null), (r.route = null));
    }
    activateChildRoutes(t, n, r) {
      let o = Wt(n);
      t.children.forEach(i => {
        this.activateRoutes(i, o[i.value.outlet], r), this.forwardEvent(new ya(i.value.snapshot));
      }),
        t.children.length && this.forwardEvent(new ma(t.value.snapshot));
    }
    activateRoutes(t, n, r) {
      let o = t.value,
        i = n ? n.value : null;
      if ((na(o), o === i))
        if (o.component) {
          let s = r.getOrCreateContext(o.outlet);
          this.activateChildRoutes(t, n, s.children);
        } else this.activateChildRoutes(t, n, r);
      else if (o.component) {
        let s = r.getOrCreateContext(o.outlet);
        if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(o.snapshot);
          this.routeReuseStrategy.store(o.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            na(a.route.value),
            this.activateChildRoutes(t, null, s.children);
        } else {
          let a = qn(o.snapshot);
          (s.attachRef = null),
            (s.route = o),
            (s.injector = a),
            s.outlet && s.outlet.activateWith(o, s.injector),
            this.activateChildRoutes(t, null, s.children);
        }
      } else this.activateChildRoutes(t, null, r);
    }
  },
  ko = class {
    constructor(t) {
      (this.path = t), (this.route = this.path[this.path.length - 1]);
    }
  },
  qt = class {
    constructor(t, n) {
      (this.component = t), (this.route = n);
    }
  };
function zD(e, t, n) {
  let r = e._root,
    o = t ? t._root : null;
  return On(r, o, n, [r.value]);
}
function WD(e) {
  let t = e.routeConfig ? e.routeConfig.canActivateChild : null;
  return !t || t.length === 0 ? null : { node: e, guards: t };
}
function Jt(e, t) {
  let n = Symbol(),
    r = t.get(e, n);
  return r === n ? (typeof e == 'function' && !ac(e) ? e : t.get(e)) : r;
}
function On(e, t, n, r, o = { canDeactivateChecks: [], canActivateChecks: [] }) {
  let i = Wt(t);
  return (
    e.children.forEach(s => {
      GD(s, i[s.value.outlet], n, r.concat([s.value]), o), delete i[s.value.outlet];
    }),
    Object.entries(i).forEach(([s, a]) => Ln(a, n.getContext(s), o)),
    o
  );
}
function GD(e, t, n, r, o = { canDeactivateChecks: [], canActivateChecks: [] }) {
  let i = e.value,
    s = t ? t.value : null,
    a = n ? n.getContext(e.value.outlet) : null;
  if (s && i.routeConfig === s.routeConfig) {
    let u = qD(s, i, i.routeConfig.runGuardsAndResolvers);
    u ? o.canActivateChecks.push(new ko(r)) : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
      i.component ? On(e, t, a ? a.children : null, r, o) : On(e, t, n, r, o),
      u && a && a.outlet && a.outlet.isActivated && o.canDeactivateChecks.push(new qt(a.outlet.component, s));
  } else
    s && Ln(t, a, o),
      o.canActivateChecks.push(new ko(r)),
      i.component ? On(e, null, a ? a.children : null, r, o) : On(e, null, n, r, o);
  return o;
}
function qD(e, t, n) {
  if (typeof n == 'function') return n(e, t);
  switch (n) {
    case 'pathParamsChange':
      return !pt(e.url, t.url);
    case 'pathParamsOrQueryParamsChange':
      return !pt(e.url, t.url) || !xe(e.queryParams, t.queryParams);
    case 'always':
      return !0;
    case 'paramsOrQueryParamsChange':
      return !Ea(e, t) || !xe(e.queryParams, t.queryParams);
    case 'paramsChange':
    default:
      return !Ea(e, t);
  }
}
function Ln(e, t, n) {
  let r = Wt(e),
    o = e.value;
  Object.entries(r).forEach(([i, s]) => {
    o.component ? (t ? Ln(s, t.children.getContext(i), n) : Ln(s, null, n)) : Ln(s, t, n);
  }),
    o.component
      ? t && t.outlet && t.outlet.isActivated
        ? n.canDeactivateChecks.push(new qt(t.outlet.component, o))
        : n.canDeactivateChecks.push(new qt(null, o))
      : n.canDeactivateChecks.push(new qt(null, o));
}
function Zn(e) {
  return typeof e == 'function';
}
function ZD(e) {
  return typeof e == 'boolean';
}
function YD(e) {
  return e && Zn(e.canLoad);
}
function QD(e) {
  return e && Zn(e.canActivate);
}
function KD(e) {
  return e && Zn(e.canActivateChild);
}
function JD(e) {
  return e && Zn(e.canDeactivate);
}
function XD(e) {
  return e && Zn(e.canMatch);
}
function Rf(e) {
  return e instanceof Ne || e?.name === 'EmptyError';
}
var Mo = Symbol('INITIAL_VALUE');
function Kt() {
  return J(e =>
    gr(e.map(t => t.pipe(Re(1), ci(Mo)))).pipe(
      R(t => {
        for (let n of t)
          if (n !== !0) {
            if (n === Mo) return Mo;
            if (n === !1 || n instanceof Qe) return n;
          }
        return !0;
      }),
      le(t => t !== Mo),
      Re(1)
    )
  );
}
function ew(e, t) {
  return B(n => {
    let {
      targetSnapshot: r,
      currentSnapshot: o,
      guards: { canActivateChecks: i, canDeactivateChecks: s },
    } = n;
    return s.length === 0 && i.length === 0
      ? m(V(g({}, n), { guardsResult: !0 }))
      : tw(s, r, o, e).pipe(
          B(a => (a && ZD(a) ? nw(r, i, e, t) : m(a))),
          R(a => V(g({}, n), { guardsResult: a }))
        );
  });
}
function tw(e, t, n, r) {
  return L(e).pipe(
    B(o => aw(o.component, o.route, n, t, r)),
    ve(o => o !== !0, !0)
  );
}
function nw(e, t, n, r) {
  return L(t).pipe(
    rt(o => Mt(ow(o.route.parent, r), rw(o.route, r), sw(e, o.path, n), iw(e, o.route, n))),
    ve(o => o !== !0, !0)
  );
}
function rw(e, t) {
  return e !== null && t && t(new va(e)), m(!0);
}
function ow(e, t) {
  return e !== null && t && t(new ga(e)), m(!0);
}
function iw(e, t, n) {
  let r = t.routeConfig ? t.routeConfig.canActivate : null;
  if (!r || r.length === 0) return m(!0);
  let o = r.map(i =>
    mr(() => {
      let s = qn(t) ?? n,
        a = Jt(i, s),
        u = QD(a) ? a.canActivate(t, e) : qe(s, () => a(t, e));
      return Je(u).pipe(ve());
    })
  );
  return m(o).pipe(Kt());
}
function sw(e, t, n) {
  let r = t[t.length - 1],
    i = t
      .slice(0, t.length - 1)
      .reverse()
      .map(s => WD(s))
      .filter(s => s !== null)
      .map(s =>
        mr(() => {
          let a = s.guards.map(u => {
            let c = qn(s.node) ?? n,
              l = Jt(u, c),
              d = KD(l) ? l.canActivateChild(r, e) : qe(c, () => l(r, e));
            return Je(d).pipe(ve());
          });
          return m(a).pipe(Kt());
        })
      );
  return m(i).pipe(Kt());
}
function aw(e, t, n, r, o) {
  let i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
  if (!i || i.length === 0) return m(!0);
  let s = i.map(a => {
    let u = qn(t) ?? o,
      c = Jt(a, u),
      l = JD(c) ? c.canDeactivate(e, t, n, r) : qe(u, () => c(e, t, n, r));
    return Je(l).pipe(ve());
  });
  return m(s).pipe(Kt());
}
function uw(e, t, n, r) {
  let o = t.canLoad;
  if (o === void 0 || o.length === 0) return m(!0);
  let i = o.map(s => {
    let a = Jt(s, e),
      u = YD(a) ? a.canLoad(t, n) : qe(e, () => a(t, n));
    return Je(u);
  });
  return m(i).pipe(Kt(), Of(r));
}
function Of(e) {
  return Qo(
    $(t => {
      if (Yt(t)) throw _f(e, t);
    }),
    R(t => t === !0)
  );
}
function cw(e, t, n, r) {
  let o = t.canMatch;
  if (!o || o.length === 0) return m(!0);
  let i = o.map(s => {
    let a = Jt(s, e),
      u = XD(a) ? a.canMatch(t, n) : qe(e, () => a(t, n));
    return Je(u);
  });
  return m(i).pipe(Kt(), Of(r));
}
var Wn = class {
    constructor(t) {
      this.segmentGroup = t || null;
    }
  },
  Lo = class extends Error {
    constructor(t) {
      super(), (this.urlTree = t);
    }
  };
function zt(e) {
  return bt(new Wn(e));
}
function lw(e) {
  return bt(new y(4e3, !1));
}
function dw(e) {
  return bt(Af(!1, 3));
}
var Ma = class {
    constructor(t, n) {
      (this.urlSerializer = t), (this.urlTree = n);
    }
    lineralizeSegments(t, n) {
      let r = [],
        o = n.root;
      for (;;) {
        if (((r = r.concat(o.segments)), o.numberOfChildren === 0)) return m(r);
        if (o.numberOfChildren > 1 || !o.children[E]) return lw(t.redirectTo);
        o = o.children[E];
      }
    }
    applyRedirectCommands(t, n, r) {
      let o = this.applyRedirectCreateUrlTree(n, this.urlSerializer.parse(n), t, r);
      if (n.startsWith('/')) throw new Lo(o);
      return o;
    }
    applyRedirectCreateUrlTree(t, n, r, o) {
      let i = this.createSegmentGroup(t, n.root, r, o);
      return new Qe(i, this.createQueryParams(n.queryParams, this.urlTree.queryParams), n.fragment);
    }
    createQueryParams(t, n) {
      let r = {};
      return (
        Object.entries(t).forEach(([o, i]) => {
          if (typeof i == 'string' && i.startsWith(':')) {
            let a = i.substring(1);
            r[o] = n[a];
          } else r[o] = i;
        }),
        r
      );
    }
    createSegmentGroup(t, n, r, o) {
      let i = this.createSegments(t, n.segments, r, o),
        s = {};
      return (
        Object.entries(n.children).forEach(([a, u]) => {
          s[a] = this.createSegmentGroup(t, u, r, o);
        }),
        new O(i, s)
      );
    }
    createSegments(t, n, r, o) {
      return n.map(i => (i.path.startsWith(':') ? this.findPosParam(t, i, o) : this.findOrReturn(i, r)));
    }
    findPosParam(t, n, r) {
      let o = r[n.path.substring(1)];
      if (!o) throw new y(4001, !1);
      return o;
    }
    findOrReturn(t, n) {
      let r = 0;
      for (let o of n) {
        if (o.path === t.path) return n.splice(r), o;
        r++;
      }
      return t;
    }
  },
  Sa = { matched: !1, consumedSegments: [], remainingSegments: [], parameters: {}, positionalParamSegments: {} };
function fw(e, t, n, r, o) {
  let i = Fa(e, t, n);
  return i.matched ? ((r = UD(t, r)), cw(r, t, n, o).pipe(R(s => (s === !0 ? i : g({}, Sa))))) : m(i);
}
function Fa(e, t, n) {
  if (t.path === '**') return hw(n);
  if (t.path === '')
    return t.pathMatch === 'full' && (e.hasChildren() || n.length > 0)
      ? g({}, Sa)
      : { matched: !0, consumedSegments: [], remainingSegments: n, parameters: {}, positionalParamSegments: {} };
  let o = (t.matcher || uD)(n, e, t);
  if (!o) return g({}, Sa);
  let i = {};
  Object.entries(o.posParams ?? {}).forEach(([a, u]) => {
    i[a] = u.path;
  });
  let s = o.consumed.length > 0 ? g(g({}, i), o.consumed[o.consumed.length - 1].parameters) : i;
  return {
    matched: !0,
    consumedSegments: o.consumed,
    remainingSegments: n.slice(o.consumed.length),
    parameters: s,
    positionalParamSegments: o.posParams ?? {},
  };
}
function hw(e) {
  return {
    matched: !0,
    parameters: e.length > 0 ? ff(e).parameters : {},
    consumedSegments: e,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function lf(e, t, n, r) {
  return n.length > 0 && mw(e, n, r)
    ? { segmentGroup: new O(t, gw(r, new O(n, e.children))), slicedSegments: [] }
    : n.length === 0 && vw(e, n, r)
      ? { segmentGroup: new O(e.segments, pw(e, t, n, r, e.children)), slicedSegments: n }
      : { segmentGroup: new O(e.segments, e.children), slicedSegments: n };
}
function pw(e, t, n, r, o) {
  let i = {};
  for (let s of r)
    if (Vo(e, n, s) && !o[_e(s)]) {
      let a = new O([], {});
      i[_e(s)] = a;
    }
  return g(g({}, o), i);
}
function gw(e, t) {
  let n = {};
  n[E] = t;
  for (let r of e)
    if (r.path === '' && _e(r) !== E) {
      let o = new O([], {});
      n[_e(r)] = o;
    }
  return n;
}
function mw(e, t, n) {
  return n.some(r => Vo(e, t, r) && _e(r) !== E);
}
function vw(e, t, n) {
  return n.some(r => Vo(e, t, r));
}
function Vo(e, t, n) {
  return (e.hasChildren() || t.length > 0) && n.pathMatch === 'full' ? !1 : n.path === '';
}
function yw(e, t, n, r) {
  return _e(e) !== r && (r === E || !Vo(t, n, e)) ? !1 : Fa(t, e, n).matched;
}
function Dw(e, t, n) {
  return t.length === 0 && !e.children[n];
}
var Ta = class {};
function ww(e, t, n, r, o, i, s = 'emptyOnly') {
  return new xa(e, t, n, r, o, s, i).recognize();
}
var Cw = 31,
  xa = class {
    constructor(t, n, r, o, i, s, a) {
      (this.injector = t),
        (this.configLoader = n),
        (this.rootComponentType = r),
        (this.config = o),
        (this.urlTree = i),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new Ma(this.urlSerializer, this.urlTree)),
        (this.absoluteRedirectCount = 0),
        (this.allowRedirects = !0);
    }
    noMatchError(t) {
      return new y(4002, `'${t.segmentGroup}'`);
    }
    recognize() {
      let t = lf(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(t).pipe(
        R(n => {
          let r = new Hn(
              [],
              Object.freeze({}),
              Object.freeze(g({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              E,
              this.rootComponentType,
              null,
              {}
            ),
            o = new ue(r, n),
            i = new Fo('', o),
            s = TD(r, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (i.url = this.urlSerializer.serialize(s)),
            this.inheritParamsAndData(i._root, null),
            { state: i, tree: s }
          );
        })
      );
    }
    match(t) {
      return this.processSegmentGroup(this.injector, this.config, t, E).pipe(
        Ve(r => {
          if (r instanceof Lo) return (this.urlTree = r.urlTree), this.match(r.urlTree.root);
          throw r instanceof Wn ? this.noMatchError(r) : r;
        })
      );
    }
    inheritParamsAndData(t, n) {
      let r = t.value,
        o = Na(r, n, this.paramsInheritanceStrategy);
      (r.params = Object.freeze(o.params)),
        (r.data = Object.freeze(o.data)),
        t.children.forEach(i => this.inheritParamsAndData(i, r));
    }
    processSegmentGroup(t, n, r, o) {
      return r.segments.length === 0 && r.hasChildren()
        ? this.processChildren(t, n, r)
        : this.processSegment(t, n, r, r.segments, o, !0).pipe(R(i => (i instanceof ue ? [i] : [])));
    }
    processChildren(t, n, r) {
      let o = [];
      for (let i of Object.keys(r.children)) i === 'primary' ? o.unshift(i) : o.push(i);
      return L(o).pipe(
        rt(i => {
          let s = r.children[i],
            a = BD(n, i);
          return this.processSegmentGroup(t, a, s, i);
        }),
        si((i, s) => (i.push(...s), i)),
        $e(null),
        ii(),
        B(i => {
          if (i === null) return zt(r);
          let s = Pf(i);
          return Ew(s), m(s);
        })
      );
    }
    processSegment(t, n, r, o, i, s) {
      return L(n).pipe(
        rt(a =>
          this.processSegmentAgainstRoute(a._injector ?? t, n, a, r, o, i, s).pipe(
            Ve(u => {
              if (u instanceof Wn) return m(null);
              throw u;
            })
          )
        ),
        ve(a => !!a),
        Ve(a => {
          if (Rf(a)) return Dw(r, o, i) ? m(new Ta()) : zt(r);
          throw a;
        })
      );
    }
    processSegmentAgainstRoute(t, n, r, o, i, s, a) {
      return yw(r, o, i, s)
        ? r.redirectTo === void 0
          ? this.matchSegmentAgainstRoute(t, o, r, i, s)
          : this.allowRedirects && a
            ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s)
            : zt(o)
        : zt(o);
    }
    expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
      let { matched: a, consumedSegments: u, positionalParamSegments: c, remainingSegments: l } = Fa(n, o, i);
      if (!a) return zt(n);
      o.redirectTo.startsWith('/') &&
        (this.absoluteRedirectCount++, this.absoluteRedirectCount > Cw && (this.allowRedirects = !1));
      let d = this.applyRedirects.applyRedirectCommands(u, o.redirectTo, c);
      return this.applyRedirects
        .lineralizeSegments(o, d)
        .pipe(B(f => this.processSegment(t, r, n, f.concat(l), s, !1)));
    }
    matchSegmentAgainstRoute(t, n, r, o, i) {
      let s = fw(n, r, o, t, this.urlSerializer);
      return (
        r.path === '**' && (n.children = {}),
        s.pipe(
          J(a =>
            a.matched
              ? ((t = r._injector ?? t),
                this.getChildConfig(t, r, o).pipe(
                  J(({ routes: u }) => {
                    let c = r._loadedInjector ?? t,
                      { consumedSegments: l, remainingSegments: d, parameters: f } = a,
                      h = new Hn(
                        l,
                        f,
                        Object.freeze(g({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        bw(r),
                        _e(r),
                        r.component ?? r._loadedComponent ?? null,
                        r,
                        Mw(r)
                      ),
                      { segmentGroup: v, slicedSegments: S } = lf(n, l, d, u);
                    if (S.length === 0 && v.hasChildren())
                      return this.processChildren(c, u, v).pipe(R(P => (P === null ? null : new ue(h, P))));
                    if (u.length === 0 && S.length === 0) return m(new ue(h, []));
                    let Y = _e(r) === i;
                    return this.processSegment(c, u, v, S, Y ? E : i, !0).pipe(
                      R(P => new ue(h, P instanceof ue ? [P] : []))
                    );
                  })
                ))
              : zt(n)
          )
        )
      );
    }
    getChildConfig(t, n, r) {
      return n.children
        ? m({ routes: n.children, injector: t })
        : n.loadChildren
          ? n._loadedRoutes !== void 0
            ? m({ routes: n._loadedRoutes, injector: n._loadedInjector })
            : uw(t, n, r, this.urlSerializer).pipe(
                B(o =>
                  o
                    ? this.configLoader.loadChildren(t, n).pipe(
                        $(i => {
                          (n._loadedRoutes = i.routes), (n._loadedInjector = i.injector);
                        })
                      )
                    : dw(n)
                )
              )
          : m({ routes: [], injector: t });
    }
  };
function Ew(e) {
  e.sort((t, n) =>
    t.value.outlet === E ? -1 : n.value.outlet === E ? 1 : t.value.outlet.localeCompare(n.value.outlet)
  );
}
function Iw(e) {
  let t = e.value.routeConfig;
  return t && t.path === '';
}
function Pf(e) {
  let t = [],
    n = new Set();
  for (let r of e) {
    if (!Iw(r)) {
      t.push(r);
      continue;
    }
    let o = t.find(i => r.value.routeConfig === i.value.routeConfig);
    o !== void 0 ? (o.children.push(...r.children), n.add(o)) : t.push(r);
  }
  for (let r of n) {
    let o = Pf(r.children);
    t.push(new ue(r.value, o));
  }
  return t.filter(r => !n.has(r));
}
function bw(e) {
  return e.data || {};
}
function Mw(e) {
  return e.resolve || {};
}
function Sw(e, t, n, r, o, i) {
  return B(s =>
    ww(e, t, n, r, s.extractedUrl, o, i).pipe(
      R(({ state: a, tree: u }) => V(g({}, s), { targetSnapshot: a, urlAfterRedirects: u }))
    )
  );
}
function Tw(e, t) {
  return B(n => {
    let {
      targetSnapshot: r,
      guards: { canActivateChecks: o },
    } = n;
    if (!o.length) return m(n);
    let i = new Set(o.map(u => u.route)),
      s = new Set();
    for (let u of i) if (!s.has(u)) for (let c of Ff(u)) s.add(c);
    let a = 0;
    return L(s).pipe(
      rt(u => (i.has(u) ? xw(u, r, e, t) : ((u.data = Na(u, u.parent, e).resolve), m(void 0)))),
      $(() => a++),
      Tt(1),
      B(u => (a === s.size ? m(n) : Q))
    );
  });
}
function Ff(e) {
  let t = e.children.map(n => Ff(n)).flat();
  return [e, ...t];
}
function xw(e, t, n, r) {
  let o = e.routeConfig,
    i = e._resolve;
  return (
    o?.title !== void 0 && !Tf(o) && (i[Gn] = o.title),
    _w(i, e, t, r).pipe(R(s => ((e._resolvedData = s), (e.data = Na(e, e.parent, n).resolve), null)))
  );
}
function _w(e, t, n, r) {
  let o = ia(e);
  if (o.length === 0) return m({});
  let i = {};
  return L(o).pipe(
    B(s =>
      Aw(e[s], t, n, r).pipe(
        ve(),
        $(a => {
          i[s] = a;
        })
      )
    ),
    Tt(1),
    ri(i),
    Ve(s => (Rf(s) ? Q : bt(s)))
  );
}
function Aw(e, t, n, r) {
  let o = qn(t) ?? r,
    i = Jt(e, o),
    s = i.resolve ? i.resolve(t, n) : qe(o, () => i(t, n));
  return Je(s);
}
function ra(e) {
  return J(t => {
    let n = e(t);
    return n ? L(n).pipe(R(() => t)) : m(t);
  });
}
var kf = (() => {
    let t = class t {
      buildTitle(r) {
        let o,
          i = r.root;
        for (; i !== void 0; ) (o = this.getResolvedTitleForRoute(i) ?? o), (i = i.children.find(s => s.outlet === E));
        return o;
      }
      getResolvedTitleForRoute(r) {
        return r.data[Gn];
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: () => (() => p(Nw))(), providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  Nw = (() => {
    let t = class t extends kf {
      constructor(r) {
        super(), (this.title = r);
      }
      updateTitle(r) {
        let o = this.buildTitle(r);
        o !== void 0 && this.title.setTitle(o);
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)(_(Xs));
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  ka = new I('', { providedIn: 'root', factory: () => ({}) }),
  La = new I('ROUTES'),
  Rw = (() => {
    let t = class t {
      constructor() {
        (this.componentLoaders = new WeakMap()), (this.childrenLoaders = new WeakMap()), (this.compiler = p(Vs));
      }
      loadComponent(r) {
        if (this.componentLoaders.get(r)) return this.componentLoaders.get(r);
        if (r._loadedComponent) return m(r._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(r);
        let o = Je(r.loadComponent()).pipe(
            R(Lf),
            $(s => {
              this.onLoadEndListener && this.onLoadEndListener(r), (r._loadedComponent = s);
            }),
            St(() => {
              this.componentLoaders.delete(r);
            })
          ),
          i = new It(o, () => new q()).pipe(Et());
        return this.componentLoaders.set(r, i), i;
      }
      loadChildren(r, o) {
        if (this.childrenLoaders.get(o)) return this.childrenLoaders.get(o);
        if (o._loadedRoutes) return m({ routes: o._loadedRoutes, injector: o._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(o);
        let s = Ow(o, this.compiler, r, this.onLoadEndListener).pipe(
            St(() => {
              this.childrenLoaders.delete(o);
            })
          ),
          a = new It(s, () => new q()).pipe(Et());
        return this.childrenLoaders.set(o, a), a;
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })();
function Ow(e, t, n, r) {
  return Je(e.loadChildren()).pipe(
    R(Lf),
    B(o => (o instanceof yn || Array.isArray(o) ? m(o) : L(t.compileModuleAsync(o)))),
    R(o => {
      r && r(e);
      let i,
        s,
        a = !1;
      return (
        Array.isArray(o)
          ? ((s = o), (a = !0))
          : ((i = o.create(n).injector), (s = i.get(La, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(Pa), injector: i }
      );
    })
  );
}
function Pw(e) {
  return e && typeof e == 'object' && 'default' in e;
}
function Lf(e) {
  return Pw(e) ? e.default : e;
}
var ja = (() => {
    let t = class t {};
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: () => (() => p(Fw))(), providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  Fw = (() => {
    let t = class t {
      shouldProcessUrl(r) {
        return !0;
      }
      extract(r) {
        return r;
      }
      merge(r, o) {
        return r;
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  kw = new I('');
var Lw = (() => {
  let t = class t {
    get hasRequestedNavigation() {
      return this.navigationId !== 0;
    }
    constructor() {
      (this.currentNavigation = null),
        (this.currentTransition = null),
        (this.lastSuccessfulNavigation = null),
        (this.events = new q()),
        (this.transitionAbortSubject = new q()),
        (this.configLoader = p(Rw)),
        (this.environmentInjector = p(pe)),
        (this.urlSerializer = p(Aa)),
        (this.rootContexts = p(jo)),
        (this.location = p(xn)),
        (this.inputBindingEnabled = p(Oa, { optional: !0 }) !== null),
        (this.titleStrategy = p(kf)),
        (this.options = p(ka, { optional: !0 }) || {}),
        (this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || 'emptyOnly'),
        (this.urlHandlingStrategy = p(ja)),
        (this.createViewTransition = p(kw, { optional: !0 })),
        (this.navigationId = 0),
        (this.afterPreactivation = () => m(void 0)),
        (this.rootComponentType = null);
      let r = i => this.events.next(new ha(i)),
        o = i => this.events.next(new pa(i));
      (this.configLoader.onLoadEndListener = o), (this.configLoader.onLoadStartListener = r);
    }
    complete() {
      this.transitions?.complete();
    }
    handleNavigationRequest(r) {
      let o = ++this.navigationId;
      this.transitions?.next(V(g(g({}, this.transitions.value), r), { id: o }));
    }
    setupNavigations(r, o, i) {
      return (
        (this.transitions = new W({
          id: 0,
          currentUrlTree: o,
          currentRawUrl: o,
          extractedUrl: this.urlHandlingStrategy.extract(o),
          urlAfterRedirects: this.urlHandlingStrategy.extract(o),
          rawUrl: o,
          extras: {},
          resolve: null,
          reject: null,
          promise: Promise.resolve(!0),
          source: kn,
          restoredState: null,
          currentSnapshot: i.snapshot,
          targetSnapshot: null,
          currentRouterState: i,
          targetRouterState: null,
          guards: { canActivateChecks: [], canDeactivateChecks: [] },
          guardsResult: null,
        })),
        this.transitions.pipe(
          le(s => s.id !== 0),
          R(s => V(g({}, s), { extractedUrl: this.urlHandlingStrategy.extract(s.rawUrl) })),
          J(s => {
            this.currentTransition = s;
            let a = !1,
              u = !1;
            return m(s).pipe(
              $(c => {
                this.currentNavigation = {
                  id: c.id,
                  initialUrl: c.rawUrl,
                  extractedUrl: c.extractedUrl,
                  trigger: c.source,
                  extras: c.extras,
                  previousNavigation: this.lastSuccessfulNavigation
                    ? V(g({}, this.lastSuccessfulNavigation), { previousNavigation: null })
                    : null,
                };
              }),
              J(c => {
                let l = !r.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl(),
                  d = c.extras.onSameUrlNavigation ?? r.onSameUrlNavigation;
                if (!l && d !== 'reload') {
                  let f = '';
                  return (
                    this.events.next(new mt(c.id, this.urlSerializer.serialize(c.rawUrl), f, 0)), c.resolve(null), Q
                  );
                }
                if (this.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))
                  return m(c).pipe(
                    J(f => {
                      let h = this.transitions?.getValue();
                      return (
                        this.events.next(
                          new Vn(f.id, this.urlSerializer.serialize(f.extractedUrl), f.source, f.restoredState)
                        ),
                        h !== this.transitions?.getValue() ? Q : Promise.resolve(f)
                      );
                    }),
                    Sw(
                      this.environmentInjector,
                      this.configLoader,
                      this.rootComponentType,
                      r.config,
                      this.urlSerializer,
                      this.paramsInheritanceStrategy
                    ),
                    $(f => {
                      (s.targetSnapshot = f.targetSnapshot),
                        (s.urlAfterRedirects = f.urlAfterRedirects),
                        (this.currentNavigation = V(g({}, this.currentNavigation), { finalUrl: f.urlAfterRedirects }));
                      let h = new Ro(
                        f.id,
                        this.urlSerializer.serialize(f.extractedUrl),
                        this.urlSerializer.serialize(f.urlAfterRedirects),
                        f.targetSnapshot
                      );
                      this.events.next(h);
                    })
                  );
                if (l && this.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)) {
                  let { id: f, extractedUrl: h, source: v, restoredState: S, extras: Y } = c,
                    P = new Vn(f, this.urlSerializer.serialize(h), v, S);
                  this.events.next(P);
                  let ce = Mf(h, this.rootComponentType).snapshot;
                  return (
                    (this.currentTransition = s =
                      V(g({}, c), {
                        targetSnapshot: ce,
                        urlAfterRedirects: h,
                        extras: V(g({}, Y), { skipLocationChange: !1, replaceUrl: !1 }),
                      })),
                    (this.currentNavigation.finalUrl = h),
                    m(s)
                  );
                } else {
                  let f = '';
                  return (
                    this.events.next(new mt(c.id, this.urlSerializer.serialize(c.extractedUrl), f, 1)),
                    c.resolve(null),
                    Q
                  );
                }
              }),
              $(c => {
                let l = new ca(
                  c.id,
                  this.urlSerializer.serialize(c.extractedUrl),
                  this.urlSerializer.serialize(c.urlAfterRedirects),
                  c.targetSnapshot
                );
                this.events.next(l);
              }),
              R(
                c => (
                  (this.currentTransition = s =
                    V(g({}, c), { guards: zD(c.targetSnapshot, c.currentSnapshot, this.rootContexts) })),
                  s
                )
              ),
              ew(this.environmentInjector, c => this.events.next(c)),
              $(c => {
                if (((s.guardsResult = c.guardsResult), Yt(c.guardsResult)))
                  throw _f(this.urlSerializer, c.guardsResult);
                let l = new la(
                  c.id,
                  this.urlSerializer.serialize(c.extractedUrl),
                  this.urlSerializer.serialize(c.urlAfterRedirects),
                  c.targetSnapshot,
                  !!c.guardsResult
                );
                this.events.next(l);
              }),
              le(c => (c.guardsResult ? !0 : (this.cancelNavigationTransition(c, '', 3), !1))),
              ra(c => {
                if (c.guards.canActivateChecks.length)
                  return m(c).pipe(
                    $(l => {
                      let d = new da(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        this.urlSerializer.serialize(l.urlAfterRedirects),
                        l.targetSnapshot
                      );
                      this.events.next(d);
                    }),
                    J(l => {
                      let d = !1;
                      return m(l).pipe(
                        Tw(this.paramsInheritanceStrategy, this.environmentInjector),
                        $({
                          next: () => (d = !0),
                          complete: () => {
                            d || this.cancelNavigationTransition(l, '', 2);
                          },
                        })
                      );
                    }),
                    $(l => {
                      let d = new fa(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        this.urlSerializer.serialize(l.urlAfterRedirects),
                        l.targetSnapshot
                      );
                      this.events.next(d);
                    })
                  );
              }),
              ra(c => {
                let l = d => {
                  let f = [];
                  d.routeConfig?.loadComponent &&
                    !d.routeConfig._loadedComponent &&
                    f.push(
                      this.configLoader.loadComponent(d.routeConfig).pipe(
                        $(h => {
                          d.component = h;
                        }),
                        R(() => {})
                      )
                    );
                  for (let h of d.children) f.push(...l(h));
                  return f;
                };
                return gr(l(c.targetSnapshot.root)).pipe($e(), Re(1));
              }),
              ra(() => this.afterPreactivation()),
              J(() => {
                let { currentSnapshot: c, targetSnapshot: l } = s,
                  d = this.createViewTransition?.(this.environmentInjector, c.root, l.root);
                return d ? L(d).pipe(R(() => s)) : m(s);
              }),
              R(c => {
                let l = kD(r.routeReuseStrategy, c.targetSnapshot, c.currentRouterState);
                return (
                  (this.currentTransition = s = V(g({}, c), { targetRouterState: l })),
                  (this.currentNavigation.targetRouterState = l),
                  s
                );
              }),
              $(() => {
                this.events.next(new Un());
              }),
              HD(this.rootContexts, r.routeReuseStrategy, c => this.events.next(c), this.inputBindingEnabled),
              Re(1),
              $({
                next: c => {
                  (a = !0),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    this.events.next(
                      new gt(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        this.urlSerializer.serialize(c.urlAfterRedirects)
                      )
                    ),
                    this.titleStrategy?.updateTitle(c.targetRouterState.snapshot),
                    c.resolve(!0);
                },
                complete: () => {
                  a = !0;
                },
              }),
              li(
                this.transitionAbortSubject.pipe(
                  $(c => {
                    throw c;
                  })
                )
              ),
              St(() => {
                if (!a && !u) {
                  let c = '';
                  this.cancelNavigationTransition(s, c, 1);
                }
                this.currentNavigation?.id === s.id && (this.currentNavigation = null);
              }),
              Ve(c => {
                if (((u = !0), Nf(c)))
                  this.events.next(
                    new Ke(s.id, this.urlSerializer.serialize(s.extractedUrl), c.message, c.cancellationCode)
                  ),
                    VD(c) ? this.events.next(new Bn(c.url)) : s.resolve(!1);
                else {
                  this.events.next(
                    new $n(s.id, this.urlSerializer.serialize(s.extractedUrl), c, s.targetSnapshot ?? void 0)
                  );
                  try {
                    s.resolve(r.errorHandler(c));
                  } catch (l) {
                    s.reject(l);
                  }
                }
                return Q;
              })
            );
          })
        )
      );
    }
    cancelNavigationTransition(r, o, i) {
      let s = new Ke(r.id, this.urlSerializer.serialize(r.extractedUrl), o, i);
      this.events.next(s), r.resolve(!1);
    }
    isUpdatingInternalState() {
      return this.currentTransition?.extractedUrl.toString() !== this.currentTransition?.currentUrlTree.toString();
    }
    isUpdatedBrowserUrl() {
      return (
        this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))).toString() !==
          this.currentTransition?.extractedUrl.toString() && !this.currentTransition?.extras.skipLocationChange
      );
    }
  };
  (t.ɵfac = function (o) {
    return new (o || t)();
  }),
    (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'root' }));
  let e = t;
  return e;
})();
function jw(e) {
  return e !== kn;
}
var Vw = (() => {
    let t = class t {};
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: () => (() => p($w))(), providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  _a = class {
    shouldDetach(t) {
      return !1;
    }
    store(t, n) {}
    shouldAttach(t) {
      return !1;
    }
    retrieve(t) {
      return null;
    }
    shouldReuseRoute(t, n) {
      return t.routeConfig === n.routeConfig;
    }
  },
  $w = (() => {
    let t = class t extends _a {};
    (t.ɵfac = (() => {
      let r;
      return function (i) {
        return (r || (r = gs(t)))(i || t);
      };
    })()),
      (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  jf = (() => {
    let t = class t {};
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: () => (() => p(Uw))(), providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  Uw = (() => {
    let t = class t extends jf {
      constructor() {
        super(...arguments),
          (this.location = p(xn)),
          (this.urlSerializer = p(Aa)),
          (this.options = p(ka, { optional: !0 }) || {}),
          (this.canceledNavigationResolution = this.options.canceledNavigationResolution || 'replace'),
          (this.urlHandlingStrategy = p(ja)),
          (this.urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred'),
          (this.currentUrlTree = new Qe()),
          (this.rawUrlTree = this.currentUrlTree),
          (this.currentPageId = 0),
          (this.lastSuccessfulId = -1),
          (this.routerState = Mf(this.currentUrlTree, null)),
          (this.stateMemento = this.createStateMemento());
      }
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== 'computed'
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      getRouterState() {
        return this.routerState;
      }
      createStateMemento() {
        return { rawUrlTree: this.rawUrlTree, currentUrlTree: this.currentUrlTree, routerState: this.routerState };
      }
      registerNonRouterCurrentEntryChangeListener(r) {
        return this.location.subscribe(o => {
          o.type === 'popstate' && r(o.url, o.state);
        });
      }
      handleRouterEvent(r, o) {
        if (r instanceof Vn) this.stateMemento = this.createStateMemento();
        else if (r instanceof mt) this.rawUrlTree = o.initialUrl;
        else if (r instanceof Ro) {
          if (this.urlUpdateStrategy === 'eager' && !o.extras.skipLocationChange) {
            let i = this.urlHandlingStrategy.merge(o.finalUrl, o.initialUrl);
            this.setBrowserUrl(i, o);
          }
        } else
          r instanceof Un
            ? ((this.currentUrlTree = o.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(o.finalUrl, o.initialUrl)),
              (this.routerState = o.targetRouterState),
              this.urlUpdateStrategy === 'deferred' &&
                (o.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, o)))
            : r instanceof Ke && (r.code === 3 || r.code === 2)
              ? this.restoreHistory(o)
              : r instanceof $n
                ? this.restoreHistory(o, !0)
                : r instanceof gt && ((this.lastSuccessfulId = r.id), (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(r, o) {
        let i = this.urlSerializer.serialize(r);
        if (this.location.isCurrentPathEqualTo(i) || o.extras.replaceUrl) {
          let s = this.browserPageId,
            a = g(g({}, o.extras.state), this.generateNgRouterState(o.id, s));
          this.location.replaceState(i, '', a);
        } else {
          let s = g(g({}, o.extras.state), this.generateNgRouterState(o.id, this.browserPageId + 1));
          this.location.go(i, '', s);
        }
      }
      restoreHistory(r, o = !1) {
        if (this.canceledNavigationResolution === 'computed') {
          let i = this.browserPageId,
            s = this.currentPageId - i;
          s !== 0
            ? this.location.historyGo(s)
            : this.currentUrlTree === r.finalUrl && s === 0 && (this.resetState(r), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === 'replace' && (o && this.resetState(r), this.resetUrlToCurrentUrlTree());
      }
      resetState(r) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, r.finalUrl ?? this.rawUrlTree));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          '',
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(r, o) {
        return this.canceledNavigationResolution === 'computed'
          ? { navigationId: r, ɵrouterPageId: o }
          : { navigationId: r };
      }
    };
    (t.ɵfac = (() => {
      let r;
      return function (i) {
        return (r || (r = gs(t)))(i || t);
      };
    })()),
      (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  Pn = (function (e) {
    return (
      (e[(e.COMPLETE = 0)] = 'COMPLETE'), (e[(e.FAILED = 1)] = 'FAILED'), (e[(e.REDIRECTING = 2)] = 'REDIRECTING'), e
    );
  })(Pn || {});
function Bw(e, t) {
  e.events
    .pipe(
      le(n => n instanceof gt || n instanceof Ke || n instanceof $n || n instanceof mt),
      R(n =>
        n instanceof gt || n instanceof mt
          ? Pn.COMPLETE
          : (n instanceof Ke ? n.code === 0 || n.code === 1 : !1)
            ? Pn.REDIRECTING
            : Pn.FAILED
      ),
      le(n => n !== Pn.REDIRECTING),
      Re(1)
    )
    .subscribe(() => {
      t();
    });
}
function Hw(e) {
  throw e;
}
var zw = { paths: 'exact', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'exact' },
  Ww = { paths: 'subset', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'subset' },
  Vf = (() => {
    let t = class t {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      constructor() {
        (this.disposed = !1),
          (this.isNgZoneEnabled = !1),
          (this.console = p(po)),
          (this.stateManager = p(jf)),
          (this.options = p(ka, { optional: !0 }) || {}),
          (this.pendingTasks = p(go)),
          (this.urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred'),
          (this.navigationTransitions = p(Lw)),
          (this.urlSerializer = p(Aa)),
          (this.location = p(xn)),
          (this.urlHandlingStrategy = p(ja)),
          (this._events = new q()),
          (this.errorHandler = this.options.errorHandler || Hw),
          (this.navigated = !1),
          (this.routeReuseStrategy = p(Vw)),
          (this.onSameUrlNavigation = this.options.onSameUrlNavigation || 'ignore'),
          (this.config = p(La, { optional: !0 })?.flat() ?? []),
          (this.componentInputBindingEnabled = !!p(Oa, { optional: !0 })),
          (this.eventsSubscription = new z()),
          (this.isNgZoneEnabled = p(j) instanceof j && j.isInAngularZone()),
          this.resetConfig(this.config),
          this.navigationTransitions.setupNavigations(this, this.currentUrlTree, this.routerState).subscribe({
            error: r => {
              this.console.warn(r);
            },
          }),
          this.subscribeToNavigationEvents();
      }
      subscribeToNavigationEvents() {
        let r = this.navigationTransitions.events.subscribe(o => {
          try {
            let i = this.navigationTransitions.currentTransition,
              s = this.navigationTransitions.currentNavigation;
            if (i !== null && s !== null) {
              if ((this.stateManager.handleRouterEvent(o, s), o instanceof Ke && o.code !== 0 && o.code !== 1))
                this.navigated = !0;
              else if (o instanceof gt) this.navigated = !0;
              else if (o instanceof Bn) {
                let a = this.urlHandlingStrategy.merge(o.url, i.currentRawUrl),
                  u = {
                    skipLocationChange: i.extras.skipLocationChange,
                    replaceUrl: this.urlUpdateStrategy === 'eager' || jw(i.source),
                  };
                this.scheduleNavigation(a, kn, null, u, { resolve: i.resolve, reject: i.reject, promise: i.promise });
              }
            }
            qw(o) && this._events.next(o);
          } catch (i) {
            this.navigationTransitions.transitionAbortSubject.next(i);
          }
        });
        this.eventsSubscription.add(r);
      }
      resetRootComponentType(r) {
        (this.routerState.root.component = r), (this.navigationTransitions.rootComponentType = r);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(this.location.path(!0), kn, this.stateManager.restoredState());
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ||
          (this.nonRouterCurrentEntryChangeSubscription = this.stateManager.registerNonRouterCurrentEntryChangeListener(
            (r, o) => {
              setTimeout(() => {
                this.navigateToSyncWithBrowser(r, 'popstate', o);
              }, 0);
            }
          ));
      }
      navigateToSyncWithBrowser(r, o, i) {
        let s = { replaceUrl: !0 },
          a = i?.navigationId ? i : null;
        if (i) {
          let c = g({}, i);
          delete c.navigationId, delete c.ɵrouterPageId, Object.keys(c).length !== 0 && (s.state = c);
        }
        let u = this.parseUrl(r);
        this.scheduleNavigation(u, o, a, s);
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return this.navigationTransitions.currentNavigation;
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(r) {
        (this.config = r.map(Pa)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(r, o = {}) {
        let { relativeTo: i, queryParams: s, fragment: a, queryParamsHandling: u, preserveFragment: c } = o,
          l = c ? this.currentUrlTree.fragment : a,
          d = null;
        switch (u) {
          case 'merge':
            d = g(g({}, this.currentUrlTree.queryParams), s);
            break;
          case 'preserve':
            d = this.currentUrlTree.queryParams;
            break;
          default:
            d = s || null;
        }
        d !== null && (d = this.removeEmptyProps(d));
        let f;
        try {
          let h = i ? i.snapshot : this.routerState.snapshot.root;
          f = Cf(h);
        } catch {
          (typeof r[0] != 'string' || !r[0].startsWith('/')) && (r = []), (f = this.currentUrlTree.root);
        }
        return Ef(f, r, d, l ?? null);
      }
      navigateByUrl(r, o = { skipLocationChange: !1 }) {
        let i = Yt(r) ? r : this.parseUrl(r),
          s = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
        return this.scheduleNavigation(s, kn, null, o);
      }
      navigate(r, o = { skipLocationChange: !1 }) {
        return Gw(r), this.navigateByUrl(this.createUrlTree(r, o), o);
      }
      serializeUrl(r) {
        return this.urlSerializer.serialize(r);
      }
      parseUrl(r) {
        try {
          return this.urlSerializer.parse(r);
        } catch {
          return this.urlSerializer.parse('/');
        }
      }
      isActive(r, o) {
        let i;
        if ((o === !0 ? (i = g({}, zw)) : o === !1 ? (i = g({}, Ww)) : (i = o), Yt(r)))
          return sf(this.currentUrlTree, r, i);
        let s = this.parseUrl(r);
        return sf(this.currentUrlTree, s, i);
      }
      removeEmptyProps(r) {
        return Object.keys(r).reduce((o, i) => {
          let s = r[i];
          return s != null && (o[i] = s), o;
        }, {});
      }
      scheduleNavigation(r, o, i, s, a) {
        if (this.disposed) return Promise.resolve(!1);
        let u, c, l;
        a
          ? ((u = a.resolve), (c = a.reject), (l = a.promise))
          : (l = new Promise((f, h) => {
              (u = f), (c = h);
            }));
        let d = this.pendingTasks.add();
        return (
          Bw(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(d));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: o,
            restoredState: i,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: r,
            extras: s,
            resolve: u,
            reject: c,
            promise: l,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          l.catch(f => Promise.reject(f))
        );
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = C({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })();
function Gw(e) {
  for (let t = 0; t < e.length; t++) if (e[t] == null) throw new y(4008, !1);
}
function qw(e) {
  return !(e instanceof Un) && !(e instanceof Bn);
}
var Zw = new I('');
function XT(e, ...t) {
  return lt([
    { provide: La, multi: !0, useValue: e },
    [],
    { provide: Qt, useFactory: Yw, deps: [Vf] },
    { provide: Bt, multi: !0, useFactory: Qw },
    t.map(n => n.ɵproviders),
  ]);
}
function Yw(e) {
  return e.routerState.root;
}
function Qw() {
  let e = p(Ze);
  return t => {
    let n = e.get(Ye);
    if (t !== n.components[0]) return;
    let r = e.get(Vf),
      o = e.get(Kw);
    e.get(Jw) === 1 && r.initialNavigation(),
      e.get(Xw, null, M.Optional)?.setUpPreloading(),
      e.get(Zw, null, M.Optional)?.init(),
      r.resetRootComponentType(n.componentTypes[0]),
      o.closed || (o.next(), o.complete(), o.unsubscribe());
  };
}
var Kw = new I('', { factory: () => new q() }),
  Jw = new I('', { providedIn: 'root', factory: () => 1 });
var Xw = new I('');
export {
  mc as a,
  rS as b,
  oS as c,
  iS as d,
  vv as e,
  sS as f,
  Id as g,
  bd as h,
  Ls as i,
  uS as j,
  cS as k,
  lS as l,
  xd as m,
  Ny as n,
  CT as o,
  ET as p,
  FD as q,
  XT as r,
};
