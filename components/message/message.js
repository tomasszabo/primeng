"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var UIMessage = /** @class */ (function () {
    function UIMessage() {
    }
    Object.defineProperty(UIMessage.prototype, "icon", {
        get: function () {
            var icon = null;
            if (this.severity) {
                switch (this.severity) {
                    case 'success':
                        icon = 'pi pi-check';
                        break;
                    case 'info':
                        icon = 'pi pi-info-circle';
                        break;
                    case 'error':
                        icon = 'pi pi-times';
                        break;
                    case 'warn':
                        icon = 'pi pi-ex';
                        break;
                    default:
                        icon = 'pi pi-info-circle';
                        break;
                }
            }
            return icon;
        },
        enumerable: true,
        configurable: true
    });
    UIMessage.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-message',
                    template: "\n        <div aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all\" *ngIf=\"severity\"\n        [ngClass]=\"{'ui-messages-info': (severity === 'info'),\n                'ui-messages-warn': (severity === 'warn'),\n                'ui-messages-error': (severity === 'error'),\n                'ui-messages-success': (severity === 'success')}\">\n            <span class=\"ui-message-icon\" [ngClass]=\"icon\"></span>\n            <span class=\"ui-message-text\">{{text}}</span>\n        </div>\n    "
                },] },
    ];
    UIMessage.propDecorators = {
        severity: [{ type: core_1.Input }],
        text: [{ type: core_1.Input }]
    };
    return UIMessage;
}());
exports.UIMessage = UIMessage;
var MessageModule = /** @class */ (function () {
    function MessageModule() {
    }
    MessageModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [UIMessage],
                    declarations: [UIMessage]
                },] },
    ];
    return MessageModule;
}());
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.js.map