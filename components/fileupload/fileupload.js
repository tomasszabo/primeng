"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var button_1 = require("../button/button");
var messages_1 = require("../messages/messages");
var progressbar_1 = require("../progressbar/progressbar");
var domhandler_1 = require("../dom/domhandler");
var shared_1 = require("../common/shared");
var FileUpload = /** @class */ (function () {
    function FileUpload(el, domHandler, sanitizer, zone) {
        this.el = el;
        this.domHandler = domHandler;
        this.sanitizer = sanitizer;
        this.zone = zone;
        this.method = 'POST';
        this.invalidFileSizeMessageSummary = '{0}: Invalid file size, ';
        this.invalidFileSizeMessageDetail = 'maximum upload size is {0}.';
        this.invalidFileTypeMessageSummary = '{0}: Invalid file type, ';
        this.invalidFileTypeMessageDetail = 'allowed file types: {0}.';
        this.previewWidth = 50;
        this.chooseLabel = 'Choose';
        this.uploadLabel = 'Upload';
        this.cancelLabel = 'Cancel';
        this.showUploadButton = true;
        this.showCancelButton = true;
        this.mode = 'advanced';
        this.onBeforeUpload = new core_1.EventEmitter();
        this.onBeforeSend = new core_1.EventEmitter();
        this.onUpload = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.onClear = new core_1.EventEmitter();
        this.onRemove = new core_1.EventEmitter();
        this.onSelect = new core_1.EventEmitter();
        this.onProgress = new core_1.EventEmitter();
        this.uploadHandler = new core_1.EventEmitter();
        this.progress = 0;
    }
    FileUpload.prototype.ngOnInit = function () {
        this.files = [];
    };
    FileUpload.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'file':
                    _this.fileTemplate = item.template;
                    break;
                case 'content':
                    _this.contentTemplate = item.template;
                    break;
                case 'toolbar':
                    _this.toolbarTemplate = item.template;
                    break;
                default:
                    _this.fileTemplate = item.template;
                    break;
            }
        });
    };
    FileUpload.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.mode === 'advanced') {
            this.zone.runOutsideAngular(function () {
                _this.content.nativeElement.addEventListener('dragover', _this.onDragOver.bind(_this));
            });
        }
    };
    FileUpload.prototype.onFileSelect = function (event) {
        if (event.type !== 'drop' && this.isIE11() && this.duplicateIEEvent) {
            this.duplicateIEEvent = false;
            return;
        }
        this.msgs = [];
        if (!this.multiple) {
            this.files = [];
        }
        var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!this.isFileSelected(file)) {
                if (this.validate(file)) {
                    if (this.isImage(file)) {
                        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                    }
                    this.files.push(files[i]);
                }
            }
        }
        this.onSelect.emit({ originalEvent: event, files: files });
        if (this.hasFiles() && this.auto) {
            this.upload();
        }
        if (event.type !== 'drop' && this.isIE11()) {
            this.clearIEInput();
        }
        else {
            this.clearInputElement();
        }
    };
    FileUpload.prototype.isFileSelected = function (file) {
        for (var _i = 0, _a = this.files; _i < _a.length; _i++) {
            var sFile = _a[_i];
            if ((sFile.name + sFile.type + sFile.size) === (file.name + file.type + file.size)) {
                return true;
            }
        }
        return false;
    };
    FileUpload.prototype.isIE11 = function () {
        return !!window['MSInputMethodContext'] && !!document['documentMode'];
    };
    FileUpload.prototype.validate = function (file) {
        if (this.accept && !this.isFileTypeValid(file)) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileTypeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileTypeMessageDetail.replace('{0}', this.accept)
            });
            return false;
        }
        if (this.maxFileSize && file.size > this.maxFileSize) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))
            });
            return false;
        }
        return true;
    };
    FileUpload.prototype.isFileTypeValid = function (file) {
        var acceptableTypes = this.accept.split(',');
        for (var _i = 0, acceptableTypes_1 = acceptableTypes; _i < acceptableTypes_1.length; _i++) {
            var type = acceptableTypes_1[_i];
            var acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type)
                : file.type == type || this.getFileExtension(file) === type;
            if (acceptable) {
                return true;
            }
        }
        return false;
    };
    FileUpload.prototype.getTypeClass = function (fileType) {
        return fileType.substring(0, fileType.indexOf('/'));
    };
    FileUpload.prototype.isWildcard = function (fileType) {
        return fileType.indexOf('*') !== -1;
    };
    FileUpload.prototype.getFileExtension = function (file) {
        return '.' + file.name.split('.').pop();
    };
    FileUpload.prototype.isImage = function (file) {
        return /^image\//.test(file.type);
    };
    FileUpload.prototype.onImageLoad = function (img) {
        window.URL.revokeObjectURL(img.src);
    };
    FileUpload.prototype.upload = function () {
        var _this = this;
        if (this.customUpload) {
            this.uploadHandler.emit({
                files: this.files
            });
        }
        else {
            this.msgs = [];
            var xhr_1 = new XMLHttpRequest(), formData = new FormData();
            this.onBeforeUpload.emit({
                'xhr': xhr_1,
                'formData': formData
            });
            for (var i = 0; i < this.files.length; i++) {
                formData.append(this.name, this.files[i], this.files[i].name);
            }
            xhr_1.upload.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                    _this.progress = Math.round((e.loaded * 100) / e.total);
                }
                _this.onProgress.emit({ originalEvent: e, progress: _this.progress });
            }, false);
            xhr_1.onreadystatechange = function () {
                if (xhr_1.readyState == 4) {
                    _this.progress = 0;
                    if (xhr_1.status >= 200 && xhr_1.status < 300)
                        _this.onUpload.emit({ xhr: xhr_1, files: _this.files });
                    else
                        _this.onError.emit({ xhr: xhr_1, files: _this.files });
                    _this.clear();
                }
            };
            xhr_1.open(this.method, this.url, true);
            this.onBeforeSend.emit({
                'xhr': xhr_1,
                'formData': formData
            });
            xhr_1.withCredentials = this.withCredentials;
            xhr_1.send(formData);
        }
    };
    FileUpload.prototype.clear = function () {
        this.files = [];
        this.onClear.emit();
        this.clearInputElement();
    };
    FileUpload.prototype.remove = function (event, index) {
        this.clearInputElement();
        this.onRemove.emit({ originalEvent: event, file: this.files[index] });
        this.files.splice(index, 1);
    };
    FileUpload.prototype.clearInputElement = function () {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.advancedFileInput.nativeElement.value = '';
        }
        if (this.basicFileInput && this.basicFileInput.nativeElement) {
            this.basicFileInput.nativeElement.value = '';
        }
    };
    FileUpload.prototype.clearIEInput = function () {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.duplicateIEEvent = true; //IE11 fix to prevent onFileChange trigger again
            this.advancedFileInput.nativeElement.value = '';
        }
    };
    FileUpload.prototype.hasFiles = function () {
        return this.files && this.files.length > 0;
    };
    FileUpload.prototype.onDragEnter = function (e) {
        if (!this.disabled) {
            e.stopPropagation();
            e.preventDefault();
        }
    };
    FileUpload.prototype.onDragOver = function (e) {
        if (!this.disabled) {
            this.domHandler.addClass(this.content.nativeElement, 'ui-fileupload-highlight');
            this.dragHighlight = true;
            e.stopPropagation();
            e.preventDefault();
        }
    };
    FileUpload.prototype.onDragLeave = function (event) {
        if (!this.disabled) {
            this.domHandler.removeClass(this.content.nativeElement, 'ui-fileupload-highlight');
        }
    };
    FileUpload.prototype.onDrop = function (event) {
        if (!this.disabled) {
            this.domHandler.removeClass(this.content.nativeElement, 'ui-fileupload-highlight');
            event.stopPropagation();
            event.preventDefault();
            var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
            var allowDrop = this.multiple || (files && files.length === 1);
            if (allowDrop) {
                this.onFileSelect(event);
            }
        }
    };
    FileUpload.prototype.onFocus = function () {
        this.focus = true;
    };
    FileUpload.prototype.onBlur = function () {
        this.focus = false;
    };
    FileUpload.prototype.formatSize = function (bytes) {
        if (bytes == 0) {
            return '0 B';
        }
        var k = 1000, dm = 3, sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
    FileUpload.prototype.onSimpleUploaderClick = function (event) {
        if (this.hasFiles()) {
            this.upload();
        }
    };
    FileUpload.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    FileUpload.prototype.ngOnDestroy = function () {
        if (this.content && this.content.nativeElement) {
            this.content.nativeElement.removeEventListener('dragover', this.onDragOver);
        }
    };
    FileUpload.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-fileUpload',
                    template: "\n        <div [ngClass]=\"'ui-fileupload ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"mode === 'advanced'\">\n            <div class=\"ui-fileupload-buttonbar ui-widget-header ui-corner-top\">\n                <span class=\"ui-fileupload-choose\" [label]=\"chooseLabel\" icon=\"pi pi-plus\" pButton [ngClass]=\"{'ui-state-focus': focus, 'ui-state-disabled':disabled}\"> \n                    <input #advancedfileinput type=\"file\" (change)=\"onFileSelect($event)\" [multiple]=\"multiple\" [accept]=\"accept\" [disabled]=\"disabled\" (focus)=\"onFocus()\" (blur)=\"onBlur()\">\n                </span>\n\n                <button *ngIf=\"!auto&&showUploadButton\" type=\"button\" [label]=\"uploadLabel\" icon=\"pi pi-upload\" pButton (click)=\"upload()\" [disabled]=\"!hasFiles()\"></button>\n                <button *ngIf=\"!auto&&showCancelButton\" type=\"button\" [label]=\"cancelLabel\" icon=\"pi pi-times\" pButton (click)=\"clear()\" [disabled]=\"!hasFiles()\"></button>\n            \n                <ng-container *ngTemplateOutlet=\"toolbarTemplate\"></ng-container>\n            </div>\n            <div #content [ngClass]=\"{'ui-fileupload-content ui-widget-content ui-corner-bottom':true}\" \n                (dragenter)=\"onDragEnter($event)\" (dragleave)=\"onDragLeave($event)\" (drop)=\"onDrop($event)\">\n                <p-progressBar [value]=\"progress\" [showValue]=\"false\" *ngIf=\"hasFiles()\"></p-progressBar>\n                \n                <p-messages [value]=\"msgs\" [enableService]=\"false\"></p-messages>\n                \n                <div class=\"ui-fileupload-files\" *ngIf=\"hasFiles()\">\n                    <div *ngIf=\"!fileTemplate\">\n                        <div class=\"ui-fileupload-row\" *ngFor=\"let file of files; let i = index;\">\n                            <div><img [src]=\"file.objectURL\" *ngIf=\"isImage(file)\" [width]=\"previewWidth\" /></div>\n                            <div>{{file.name}}</div>\n                            <div>{{formatSize(file.size)}}</div>\n                            <div><button type=\"button\" icon=\"pi pi-times\" pButton (click)=\"remove($event,i)\"></button></div>\n                        </div>\n                    </div>\n                    <div *ngIf=\"fileTemplate\">\n                        <ng-template ngFor [ngForOf]=\"files\" [ngForTemplate]=\"fileTemplate\"></ng-template>\n                    </div>\n                </div>\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </div>\n        </div>\n        <span *ngIf=\"mode === 'basic'\" [ngClass]=\"{'ui-button ui-fileupload-choose ui-widget ui-state-default ui-corner-all ui-button-text-icon-left': true, \n                'ui-fileupload-choose-selected': hasFiles(),'ui-state-focus': focus, 'ui-state-disabled':disabled}\"\n                [ngStyle]=\"style\" [class]=\"styleClass\" (mouseup)=\"onSimpleUploaderClick($event)\">\n            <span class=\"ui-button-icon-left pi\" [ngClass]=\"{'pi-plus': !hasFiles()||auto, 'pi-upload': hasFiles()&&!auto}\"></span>\n            <span class=\"ui-button-text ui-clickable\">{{auto ? chooseLabel : hasFiles() ? files[0].name : chooseLabel}}</span>\n            <input #basicfileinput type=\"file\" [accept]=\"accept\" [multiple]=\"multiple\" [disabled]=\"disabled\"\n                (change)=\"onFileSelect($event)\" *ngIf=\"!hasFiles()\" (focus)=\"onFocus()\" (blur)=\"onBlur()\">\n        </span>\n    ",
                    providers: [domhandler_1.DomHandler]
                },] },
    ];
    /** @nocollapse */
    FileUpload.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: domhandler_1.DomHandler },
        { type: platform_browser_1.DomSanitizer },
        { type: core_1.NgZone }
    ]; };
    FileUpload.propDecorators = {
        name: [{ type: core_1.Input }],
        url: [{ type: core_1.Input }],
        method: [{ type: core_1.Input }],
        multiple: [{ type: core_1.Input }],
        accept: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        auto: [{ type: core_1.Input }],
        withCredentials: [{ type: core_1.Input }],
        maxFileSize: [{ type: core_1.Input }],
        invalidFileSizeMessageSummary: [{ type: core_1.Input }],
        invalidFileSizeMessageDetail: [{ type: core_1.Input }],
        invalidFileTypeMessageSummary: [{ type: core_1.Input }],
        invalidFileTypeMessageDetail: [{ type: core_1.Input }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }],
        previewWidth: [{ type: core_1.Input }],
        chooseLabel: [{ type: core_1.Input }],
        uploadLabel: [{ type: core_1.Input }],
        cancelLabel: [{ type: core_1.Input }],
        showUploadButton: [{ type: core_1.Input }],
        showCancelButton: [{ type: core_1.Input }],
        mode: [{ type: core_1.Input }],
        customUpload: [{ type: core_1.Input }],
        onBeforeUpload: [{ type: core_1.Output }],
        onBeforeSend: [{ type: core_1.Output }],
        onUpload: [{ type: core_1.Output }],
        onError: [{ type: core_1.Output }],
        onClear: [{ type: core_1.Output }],
        onRemove: [{ type: core_1.Output }],
        onSelect: [{ type: core_1.Output }],
        onProgress: [{ type: core_1.Output }],
        uploadHandler: [{ type: core_1.Output }],
        templates: [{ type: core_1.ContentChildren, args: [shared_1.PrimeTemplate,] }],
        advancedFileInput: [{ type: core_1.ViewChild, args: ['advancedfileinput',] }],
        basicFileInput: [{ type: core_1.ViewChild, args: ['basicfileinput',] }],
        content: [{ type: core_1.ViewChild, args: ['content',] }],
        files: [{ type: core_1.Input }]
    };
    return FileUpload;
}());
exports.FileUpload = FileUpload;
var FileUploadModule = /** @class */ (function () {
    function FileUploadModule() {
    }
    FileUploadModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, shared_1.SharedModule, button_1.ButtonModule, progressbar_1.ProgressBarModule, messages_1.MessagesModule],
                    exports: [FileUpload, shared_1.SharedModule, button_1.ButtonModule, progressbar_1.ProgressBarModule, messages_1.MessagesModule],
                    declarations: [FileUpload]
                },] },
    ];
    return FileUploadModule;
}());
exports.FileUploadModule = FileUploadModule;
//# sourceMappingURL=fileupload.js.map