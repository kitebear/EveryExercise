function Model(value) {
    this._value = typeof value === 'undefined' ? '' : value;
    this._listeners = null;
}
Model.prototype.set = function (value) {
    var self = this;
    self._value = value;
    setTimeout(function () {
        self._listeners.forEach(function (listener) {
            listener.call(self, value);
        });
    });
};
Model.prototype.watch = function (listener) {
    this._listeners.push(listener);
};
Model.prototype.bind = function (node) {
    this.watch(function (value) {
        node.innerHTML = value;
    });
};
function Controller(callback) {
    var models = {};
    var views = Array.prototype.slice.call(document.querySelectorAll('[bind]'), 0);
    views.forEach(function (view) {
        var modelName = view.getAttribute('bind');
        (models[modelName] = models[modelName] || new Model).bind(view);
    });
    callback.call(this, models);
}


// html:
//<span bind="hour"></span> : <span bind="minute"></span> : <span bind="second"></span>
// controller:
//    new Controller(function (models) {
//        function setTime {
//            var date = new Date;
//            models.hour.set(date.getHours);
//            models.minute.set(date.getMinutes);
//            models.second.set(date.getSeconds);
//        }
//        setTime;
//        setInterval(setTime, 1000);
//    });

//可以看出，controller中只负责更新model的逻辑，和view完全解耦；
//而view和model的绑定是通过view中的属性和框架中controller的初始化代码完成的，也没有出现在业务逻辑中；至于view的更新，也是通过框架中的观察者模式实现的。