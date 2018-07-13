"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var message_1 = require("./message");
var animations_1 = require("@angular/platform-browser/animations");
describe('UIMessage', function () {
    var message;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                message_1.UIMessage
            ]
        });
        fixture = testing_1.TestBed.createComponent(message_1.UIMessage);
        message = fixture.componentInstance;
    });
});
//# sourceMappingURL=message.spec.js.map