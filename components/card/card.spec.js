"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var card_1 = require("./card");
var animations_1 = require("@angular/platform-browser/animations");
describe('Card', function () {
    var card;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                card_1.Card
            ]
        });
        fixture = testing_1.TestBed.createComponent(card_1.Card);
        card = fixture.componentInstance;
    });
});
//# sourceMappingURL=card.spec.js.map