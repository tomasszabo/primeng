"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
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
    __decorate([
        core_1.Input()
    ], Captcha.prototype, "siteKey");
    __decorate([
        core_1.Input()
    ], Captcha.prototype, "theme");
    __decorate([
        core_1.Input()
    ], Captcha.prototype, "type");
    __decorate([
        core_1.Input()
    ], Captcha.prototype, "size");
    __decorate([
        core_1.Input()
    ], Captcha.prototype, "tabindex");
    __decorate([
        core_1.Input()
    ], Captcha.prototype, "language");
    __decorate([
        core_1.Input()
    ], Captcha.prototype, "initCallback");
    __decorate([
        core_1.Output()
    ], Captcha.prototype, "onResponse");
    __decorate([
        core_1.Output()
    ], Captcha.prototype, "onExpire");
    Captcha = __decorate([
        core_1.Component({
            selector: 'p-captcha',
            template: "<div></div>"
        })
    ], Captcha);
    return Captcha;
}());
exports.Captcha = Captcha;
var CaptchaModule = /** @class */ (function () {
    function CaptchaModule() {
    }
    CaptchaModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [Captcha],
            declarations: [Captcha]
        })
    ], CaptchaModule);
    return CaptchaModule;
}());
exports.CaptchaModule = CaptchaModule;
