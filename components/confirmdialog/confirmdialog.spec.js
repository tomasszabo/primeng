"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var confirmdialog_1 = require("./confirmdialog");
var animations_1 = require("@angular/platform-browser/animations");
describe('ConfirmDialog', function () {
    var confirmdialog;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                confirmdialog_1.ConfirmDialog
            ]
        });
        fixture = testing_1.TestBed.createComponent(confirmdialog_1.ConfirmDialog);
        confirmdialog = fixture.componentInstance;
    });
});
//# sourceMappingURL=confirmdialog.spec.js.map