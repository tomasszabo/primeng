"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var captcha_1 = require("./captcha");
var animations_1 = require("@angular/platform-browser/animations");
describe('Captcha', function () {
    var captcha;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                captcha_1.Captcha
            ]
        });
        fixture = testing_1.TestBed.createComponent(captcha_1.Captcha);
        captcha = fixture.componentInstance;
    });
});
//# sourceMappingURL=captcha.spec.js.map