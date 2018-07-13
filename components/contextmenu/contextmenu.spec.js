"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var contextmenu_1 = require("./contextmenu");
var animations_1 = require("@angular/platform-browser/animations");
describe('Accordion', function () {
    var contextmenu;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                contextmenu_1.ContextMenu
            ]
        });
        fixture = testing_1.TestBed.createComponent(contextmenu_1.ContextMenu);
        contextmenu = fixture.componentInstance;
    });
});
//# sourceMappingURL=contextmenu.spec.js.map