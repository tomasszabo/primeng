"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var editor_1 = require("./editor");
var animations_1 = require("@angular/platform-browser/animations");
describe('Editor', function () {
    var editor;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                editor_1.Editor
            ]
        });
        fixture = testing_1.TestBed.createComponent(editor_1.Editor);
        editor = fixture.componentInstance;
    });
});
//# sourceMappingURL=editor.spec.js.map