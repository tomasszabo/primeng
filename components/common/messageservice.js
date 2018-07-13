"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var MessageService = /** @class */ (function () {
    function MessageService() {
        this.messageSource = new rxjs_1.Subject();
        this.messageObserver = this.messageSource.asObservable();
    }
    MessageService.prototype.add = function (message) {
        if (message) {
            this.messageSource.next(message);
        }
    };
    MessageService.prototype.addAll = function (messages) {
        if (messages && messages.length) {
            this.messageSource.next(messages);
        }
    };
    MessageService.prototype.clear = function () {
        this.messageSource.next(null);
    };
    MessageService.decorators = [
        { type: core_1.Injectable },
    ];
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=messageservice.js.map