"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var blockui_1 = require("./blockui");
var animations_1 = require("@angular/platform-browser/animations");
describe('BlockUI', function () {
    var blockui;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                blockui_1.BlockUI
            ]
        });
        fixture = testing_1.TestBed.createComponent(blockui_1.BlockUI);
        blockui = fixture.componentInstance;
    });
});
//# sourceMappingURL=blockui.spec.js.map