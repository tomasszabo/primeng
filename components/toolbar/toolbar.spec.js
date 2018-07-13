"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var toolbar_1 = require("./toolbar");
var animations_1 = require("@angular/platform-browser/animations");
describe('Toolbar', function () {
    var toolbar;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                toolbar_1.Toolbar
            ]
        });
        fixture = testing_1.TestBed.createComponent(toolbar_1.Toolbar);
        toolbar = fixture.componentInstance;
    });
});
//# sourceMappingURL=toolbar.spec.js.map