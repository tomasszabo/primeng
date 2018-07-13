"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var orderlist_1 = require("./orderlist");
var animations_1 = require("@angular/platform-browser/animations");
describe('OrderList', function () {
    var orderlist;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                orderlist_1.OrderList
            ]
        });
        fixture = testing_1.TestBed.createComponent(orderlist_1.OrderList);
        orderlist = fixture.componentInstance;
    });
});
//# sourceMappingURL=orderlist.spec.js.map