"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var treetable_1 = require("./treetable");
var animations_1 = require("@angular/platform-browser/animations");
describe('TreeTable', function () {
    var treetable;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                treetable_1.TreeTable
            ]
        });
        fixture = testing_1.TestBed.createComponent(treetable_1.TreeTable);
        treetable = fixture.componentInstance;
    });
});
//# sourceMappingURL=treetable.spec.js.map