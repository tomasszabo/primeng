"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var sidebar_1 = require("./sidebar");
var animations_1 = require("@angular/platform-browser/animations");
describe('Sidebar', function () {
    var sidebar;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                sidebar_1.Sidebar
            ]
        });
        fixture = testing_1.TestBed.createComponent(sidebar_1.Sidebar);
        sidebar = fixture.componentInstance;
    });
});
//# sourceMappingURL=sidebar.spec.js.map