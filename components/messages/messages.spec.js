"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var messages_1 = require("./messages");
var animations_1 = require("@angular/platform-browser/animations");
describe('Messages', function () {
    var messages;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                messages_1.Messages
            ]
        });
        fixture = testing_1.TestBed.createComponent(messages_1.Messages);
        messages = fixture.componentInstance;
    });
});
//# sourceMappingURL=messages.spec.js.map