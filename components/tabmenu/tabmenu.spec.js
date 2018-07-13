"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var tabmenu_1 = require("./tabmenu");
var animations_1 = require("@angular/platform-browser/animations");
describe('TabMenu', function () {
    var tabmenu;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                tabmenu_1.TabMenu
            ]
        });
        fixture = testing_1.TestBed.createComponent(tabmenu_1.TabMenu);
        tabmenu = fixture.componentInstance;
    });
});
//# sourceMappingURL=tabmenu.spec.js.map