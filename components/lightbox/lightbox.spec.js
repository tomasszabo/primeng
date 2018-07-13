"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var lightbox_1 = require("./lightbox");
var animations_1 = require("@angular/platform-browser/animations");
describe('Lightbox', function () {
    var lightbox;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                lightbox_1.Lightbox
            ]
        });
        fixture = testing_1.TestBed.createComponent(lightbox_1.Lightbox);
        lightbox = fixture.componentInstance;
    });
});
//# sourceMappingURL=lightbox.spec.js.map