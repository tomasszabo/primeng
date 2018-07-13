"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var multiselect_1 = require("./multiselect");
var animations_1 = require("@angular/platform-browser/animations");
describe('MultiSelect', function () {
    var multiselect;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                multiselect_1.MultiSelect
            ]
        });
        fixture = testing_1.TestBed.createComponent(multiselect_1.MultiSelect);
        multiselect = fixture.componentInstance;
    });
});
//# sourceMappingURL=multiselect.spec.js.map