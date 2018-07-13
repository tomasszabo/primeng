"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var tree_1 = require("./tree");
var animations_1 = require("@angular/platform-browser/animations");
describe('Tree', function () {
    var tree;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                tree_1.Tree
            ]
        });
        fixture = testing_1.TestBed.createComponent(tree_1.Tree);
        tree = fixture.componentInstance;
    });
});
//# sourceMappingURL=tree.spec.js.map