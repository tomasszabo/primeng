"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var dragdrop_1 = require("./dragdrop");
var animations_1 = require("@angular/platform-browser/animations");
describe('Draggable', function () {
    var draggable;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                dragdrop_1.Draggable
            ]
        });
        fixture = testing_1.TestBed.createComponent(dragdrop_1.Draggable);
        draggable = fixture.componentInstance;
    });
});
//# sourceMappingURL=dragdrop.spec.js.map