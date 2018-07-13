"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var autocomplete_1 = require("./autocomplete");
var animations_1 = require("@angular/platform-browser/animations");
describe('AutoComplete', function () {
    var autocomplete;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                autocomplete_1.AutoComplete
            ]
        });
        fixture = testing_1.TestBed.createComponent(autocomplete_1.AutoComplete);
        autocomplete = fixture.componentInstance;
    });
});
//# sourceMappingURL=autocomplete.spec.js.map