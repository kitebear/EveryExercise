Array.apply(null, {length: 10}).map(Number.call, Number);

Number.prototype[".."] = function (r, e) {
    e = e || 1;
    var u = [];
    if (this.valueOf() < r)for (var f = this.valueOf(); r >= f; f += e)u.push(f); else for (var f = this.valueOf(); f >= r; f -= e)u.push(f);
    return u
};

Array.prototype.range = function () {
    var t = [], r = 1, h = "", i = !1, n = function (t) {
        return i ? t.charCodeAt(0) : t
    }, s = function (t) {
        return i ? String.fromCharCode(t) : t
    };
    if (this.length > 1) {
        if (3 === this.length && (r = this[1]), h = 3 === this.length ? this[2] : this[1], "string" == typeof this[0] && (i = !0), n(this[0]) <= n(h))for (var e = n(this[0]); e <= n(h); e += r)t.push(s(e)); else for (var e = n(this[0]); e >= n(h); e -= r)t.push(s(e));
        return t
    }
    return this
};

[1,9].range();

(1)['..'](8);

function func(n){
    return (n/2)*(n+1);
}
func(100);

Array.from(Array(5)).map((_, i) => i + 1)

Array(10).fill().map((_, i) => i + 1);

var i = 10;
Math.pow(2, i).toString(2).split('').map((i,j) => j);
//[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]