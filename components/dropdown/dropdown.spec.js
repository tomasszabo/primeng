"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var dropdown_1 = require("./dropdown");
var animations_1 = require("@angular/platform-browser/animations");
describe('Dropdown', function () {
    var dropdown;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                dropdown_1.Dropdown
            ]
        });
        fixture = testing_1.TestBed.createComponent(dropdown_1.Dropdown);
        dropdown = fixture.componentInstance;
    });
});
//# sourceMappingURL=dropdown.spec.js.map