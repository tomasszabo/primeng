"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var rating_1 = require("./rating");
var animations_1 = require("@angular/platform-browser/animations");
describe('Rating', function () {
    var rating;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                rating_1.Rating
            ]
        });
        fixture = testing_1.TestBed.createComponent(rating_1.Rating);
        rating = fixture.componentInstance;
    });
});
//# sourceMappingURL=rating.spec.js.map