"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var panelmenu_1 = require("./panelmenu");
var animations_1 = require("@angular/platform-browser/animations");
describe('PanelMenu', function () {
    var panelmenu;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                panelmenu_1.PanelMenu
            ]
        });
        fixture = testing_1.TestBed.createComponent(panelmenu_1.PanelMenu);
        panelmenu = fixture.componentInstance;
    });
});
//# sourceMappingURL=panelmenu.spec.js.map