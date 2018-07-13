"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var TerminalService = /** @class */ (function () {
    function TerminalService() {
        this.commandSource = new rxjs_1.Subject();
        this.responseSource = new rxjs_1.Subject();
        this.commandHandler = this.commandSource.asObservable();
        this.responseHandler = this.responseSource.asObservable();
    }
    TerminalService.prototype.sendCommand = function (command) {
        if (command) {
            this.commandSource.next(command);
        }
    };
    TerminalService.prototype.sendResponse = function (response) {
        if (response) {
            this.responseSource.next(response);
        }
    };
    TerminalService.decorators = [
        { type: core_1.Injectable },
    ];
    return TerminalService;
}());
exports.TerminalService = TerminalService;
//# sourceMappingURL=terminalservice.js.map