"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var gmap_1 = require("./gmap");
var animations_1 = require("@angular/platform-browser/animations");
describe('GMap', function () {
    var gmap;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                gmap_1.GMap
            ]
        });
        fixture = testing_1.TestBed.createComponent(gmap_1.GMap);
        gmap = fixture.componentInstance;
    });
});
//# sourceMappingURL=gmap.spec.js.map