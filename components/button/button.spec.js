"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var button_1 = require("./button");
var animations_1 = require("@angular/platform-browser/animations");
describe('Button', function () {
    var button;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                button_1.Button
            ]
        });
        fixture = testing_1.TestBed.createComponent(button_1.Button);
        button = fixture.componentInstance;
    });
});
//# sourceMappingURL=button.spec.js.map