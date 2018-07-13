"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var fileupload_1 = require("./fileupload");
var animations_1 = require("@angular/platform-browser/animations");
describe('FileUpload', function () {
    var fileupload;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                fileupload_1.FileUpload
            ]
        });
        fixture = testing_1.TestBed.createComponent(fileupload_1.FileUpload);
        fileupload = fixture.componentInstance;
    });
});
//# sourceMappingURL=fileupload.spec.js.map