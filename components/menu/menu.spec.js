"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var menu_1 = require("./menu");
var animations_1 = require("@angular/platform-browser/animations");
describe('Menu', function () {
    var menu;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                menu_1.Menu
            ]
        });
        fixture = testing_1.TestBed.createComponent(menu_1.Menu);
        menu = fixture.componentInstance;
    });
});
//# sourceMappingURL=menu.spec.js.map