"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var paginator_1 = require("./paginator");
var animations_1 = require("@angular/platform-browser/animations");
describe('Paginator', function () {
    var paginator;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                paginator_1.Paginator
            ]
        });
        fixture = testing_1.TestBed.createComponent(paginator_1.Paginator);
        paginator = fixture.componentInstance;
    });
});
//# sourceMappingURL=paginator.spec.js.map