"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var carousel_1 = require("./carousel");
var animations_1 = require("@angular/platform-browser/animations");
describe('Carousel', function () {
    var carousel;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                carousel_1.Carousel
            ]
        });
        fixture = testing_1.TestBed.createComponent(carousel_1.Carousel);
        carousel = fixture.componentInstance;
    });
});
//# sourceMappingURL=carousel.spec.js.map