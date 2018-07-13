"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var listbox_1 = require("./listbox");
var animations_1 = require("@angular/platform-browser/animations");
describe('Listbox', function () {
    var listbox;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                listbox_1.Listbox
            ]
        });
        fixture = testing_1.TestBed.createComponent(listbox_1.Listbox);
        listbox = fixture.componentInstance;
    });
});
//# sourceMappingURL=listbox.spec.js.map