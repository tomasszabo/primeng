"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var password_1 = require("./password");
var animations_1 = require("@angular/platform-browser/animations");
describe('Password', function () {
    var password;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                password_1.Password
            ]
        });
        fixture = testing_1.TestBed.createComponent(password_1.Password);
        password = fixture.componentInstance;
    });
});
//# sourceMappingURL=password.spec.js.map