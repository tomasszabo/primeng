"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var terminal_1 = require("./terminal");
var animations_1 = require("@angular/platform-browser/animations");
describe('Terminal', function () {
    var terminal;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                terminal_1.Terminal
            ]
        });
        fixture = testing_1.TestBed.createComponent(terminal_1.Terminal);
        terminal = fixture.componentInstance;
    });
});
//# sourceMappingURL=terminal.spec.js.map