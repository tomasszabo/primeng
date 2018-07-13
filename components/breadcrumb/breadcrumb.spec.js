"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var breadcrumb_1 = require("./breadcrumb");
var animations_1 = require("@angular/platform-browser/animations");
describe('Breadcrumb', function () {
    var breadcrumb;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                breadcrumb_1.Breadcrumb
            ]
        });
        fixture = testing_1.TestBed.createComponent(breadcrumb_1.Breadcrumb);
        breadcrumb = fixture.componentInstance;
    });
});
//# sourceMappingURL=breadcrumb.spec.js.map