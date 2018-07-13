"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var codehighlighter_1 = require("./codehighlighter");
var animations_1 = require("@angular/platform-browser/animations");
describe('CodeHighlighter', function () {
    var codehighlighter;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                codehighlighter_1.CodeHighlighter
            ]
        });
        fixture = testing_1.TestBed.createComponent(codehighlighter_1.CodeHighlighter);
        codehighlighter = fixture.componentInstance;
    });
});
//# sourceMappingURL=codehighlighter.spec.js.map