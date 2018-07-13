"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var galleria_1 = require("./galleria");
var animations_1 = require("@angular/platform-browser/animations");
describe('Galleria', function () {
    var galleria;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                galleria_1.Galleria
            ]
        });
        fixture = testing_1.TestBed.createComponent(galleria_1.Galleria);
        galleria = fixture.componentInstance;
    });
});
//# sourceMappingURL=galleria.spec.js.map