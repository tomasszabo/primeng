"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var picklist_1 = require("./picklist");
var animations_1 = require("@angular/platform-browser/animations");
describe('PickList', function () {
    var picklist;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                picklist_1.PickList
            ]
        });
        fixture = testing_1.TestBed.createComponent(picklist_1.PickList);
        picklist = fixture.componentInstance;
    });
});
//# sourceMappingURL=picklist.spec.js.map