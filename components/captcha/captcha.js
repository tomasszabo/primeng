"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var Captcha = /** @class */ (function () {
    function Captcha(el, _zone) {
        this.el = el;
        this._zone = _zone;
        this.siteKey = null;
        this.theme = 'light';
        this.type = 'image';
        this.size = 'normal';
        this.tabindex = 0;
        this.language = null;
        this.initCallback = "initRecaptcha";
        this.onResponse = new core_1.EventEmitter();
        this.onExpire = new core_1.EventEmitter();
        this._instance = null;
    }
    Captcha.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (window.grecaptcha) {
            this.init();
        }
        else {
            window[this.initCallback] = function () {
                _this.init();
            };
        }
    };
    Captcha.prototype.init = function () {
        var _this = this;
        this._instance = window.grecaptcha.render(this.el.nativeElement.children[0], {
            'sitekey': this.siteKey,
            'theme': this.theme,
            'type': this.type,
            'size': this.size,
            'tabindex': this.tabindex,
            'hl': this.language,
            'callback': function (response) { _this._zone.run(function () { return _this.recaptchaCallback(response); }); },
            'expired-callback': function () { _this._zone.run(function () { return _this.recaptchaExpiredCallback(); }); }
        });
    };
    Captcha.prototype.reset = function () {
        if (this._instance === null)
            return;
        window.grecaptcha.reset(this._instance);
    };
    Captcha.prototype.getResponse = function () {
        if (this._instance === null)
            return null;
        return window.grecaptcha.getResponse(this._instance);
    };
    Captcha.prototype.recaptchaCallback = function (response) {
        this.onResponse.emit({
            response: response
        });
    };
    Captcha.prototype.recaptchaExpiredCallback = function () {
        this.onExpire.emit();
    };
    Captcha.prototype.ngOnDestroy = function () {
        if (this._instance != null) {
            window.grecaptcha.reset(this._instance);
        }
    };
    Captcha.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-captcha',
                    template: "<div></div>"
                },] },
    ];
    /** @nocollapse */
    Captcha.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.NgZone }
    ]; };
    Captcha.propDecorators = {
        siteKey: [{ type: core_1.Input }],
        theme: [{ type: core_1.Input }],
        type: [{ type: core_1.Input }],
        size: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        language: [{ type: core_1.Input }],
        initCallback: [{ type: core_1.Input }],
        onResponse: [{ type: core_1.Output }],
        onExpire: [{ type: core_1.Output }]
    };
    return Captcha;
}());
exports.Captcha = Captcha;
var CaptchaModule = /** @class */ (function () {
    function CaptchaModule() {
    }
    CaptchaModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [Captcha],
                    declarations: [Captcha]
                },] },
    ];
    return CaptchaModule;
}());
exports.CaptchaModule = CaptchaModule;
//# sourceMappingURL=captcha.js.map