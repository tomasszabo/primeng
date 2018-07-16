"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_1 = require("../common/shared");
var shared_2 = require("../common/shared");
var treedragdropservice_1 = require("../common/treedragdropservice");
var operators_1 = require("rxjs/operators");
var UITreeNode = /** @class */ (function () {
    function UITreeNode(tree) {
        this.tree = tree;
    }
    UITreeNode.prototype.ngOnInit = function () {
        this.node.parent = this.parentNode;
    };
    UITreeNode.prototype.getIcon = function () {
        var icon;
        if (this.node.icon)
            icon = this.node.icon;
        else
            icon = this.node.expanded && this.node.children && this.node.children.length ? this.node.expandedIcon : this.node.collapsedIcon;
        return UITreeNode.ICON_CLASS + ' ' + icon;
    };
    UITreeNode.prototype.isLeaf = function () {
        return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
    };
    UITreeNode.prototype.toggle = function (event) {
        if (this.node.expanded)
            this.tree.onNodeCollapse.emit({ originalEvent: event, node: this.node });
        else
            this.tree.onNodeExpand.emit({ originalEvent: event, node: this.node });
        this.node.expanded = !this.node.expanded;
    };
    UITreeNode.prototype.onNodeClick = function (event) {
        this.tree.onNodeClick(event, this.node);
    };
    UITreeNode.prototype.onNodeTouchEnd = function () {
        this.tree.onNodeTouchEnd();
    };
    UITreeNode.prototype.onNodeRightClick = function (event) {
        this.tree.onNodeRightClick(event, this.node);
    };
    UITreeNode.prototype.isSelected = function () {
        return this.tree.isSelected(this.node);
    };
    UITreeNode.prototype.onDropPoint = function (event, position) {
        var _this = this;
        event.preventDefault();
        var dragNode = this.tree.dragNode;
        var dragNodeIndex = this.tree.dragNodeIndex;
        var dragNodeScope = this.tree.dragNodeScope;
        var isValidDropPointIndex = this.tree.dragNodeTree === this.tree ? (position === 1 || dragNodeIndex !== this.index - 1) : true;
        if (this.tree.allowDrop(dragNode, this.node, dragNodeScope, DropType.DropPoint) && isValidDropPointIndex) {
            var newNodeList_1 = this.node.parent ? this.node.parent.children : this.tree.value;
            this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);
            var dropIndex_1 = this.index;
            this.tree.onNodeDrop.emit({
                originalEvent: event,
                dragNode: dragNode,
                dropNode: this.node,
                dropIndex: dropIndex_1
            });
            this.tree.onNodeDrop.pipe(operators_1.first()).subscribe(function (proceed) {
                if (proceed == null || proceed === true) {
                    if (position < 0) {
                        dropIndex_1 = (_this.tree.dragNodeSubNodes === newNodeList_1) ? ((_this.tree.dragNodeIndex > _this.index) ? _this.index : _this.index - 1) : _this.index;
                        newNodeList_1.splice(dropIndex_1, 0, dragNode);
                    }
                    else {
                        dropIndex_1 = newNodeList_1.length;
                        newNodeList_1.push(dragNode);
                    }
                }
                _this.tree.dragDropService.stopDrag({
                    node: dragNode,
                    subNodes: _this.node.parent ? _this.node.parent.children : _this.tree.value,
                    index: dragNodeIndex
                });
            });
        }
        this.draghoverPrev = false;
        this.draghoverNext = false;
    };
    UITreeNode.prototype.onDropPointDragOver = function (event) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
    };
    UITreeNode.prototype.onDropPointDragEnter = function (event, position) {
        if (this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope, DropType.DropPoint)) {
            if (position < 0)
                this.draghoverPrev = true;
            else
                this.draghoverNext = true;
        }
    };
    UITreeNode.prototype.onDropPointDragLeave = function (event) {
        this.draghoverPrev = false;
        this.draghoverNext = false;
    };
    UITreeNode.prototype.onDragStart = function (event) {
        if (this.tree.draggableNodes && this.node.draggable !== false) {
            event.dataTransfer.setData("text", "data");
            this.tree.dragDropService.startDrag({
                tree: this,
                node: this.node,
                subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                index: this.index,
                scope: this.tree.draggableScope
            });
        }
        else {
            event.preventDefault();
        }
    };
    UITreeNode.prototype.onDragStop = function (event) {
        this.tree.dragDropService.stopDrag({
            node: this.node,
            subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
            index: this.index
        });
    };
    UITreeNode.prototype.onDropNodeDragOver = function (event) {
        event.dataTransfer.dropEffect = 'move';
        if (this.tree.droppableNodes) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    UITreeNode.prototype.onDropNode = function (event) {
        var _this = this;
        if (this.tree.droppableNodes && this.node.droppable !== false) {
            event.preventDefault();
            event.stopPropagation();
            var dragNode_1 = this.tree.dragNode;
            if (this.tree.allowDrop(dragNode_1, this.node, this.tree.dragNodeScope, DropType.Node)) {
                var dragNodeIndex = this.tree.dragNodeIndex;
                this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode: dragNode_1,
                    dropNode: this.node,
                    index: this.index
                });
                this.tree.onNodeDrop.pipe(operators_1.first()).subscribe(function (proceed) {
                    if (proceed == null || proceed === true) {
                        if (_this.node.children)
                            _this.node.children.push(dragNode_1);
                        else
                            _this.node.children = [dragNode_1];
                    }
                    _this.tree.dragDropService.stopDrag({
                        node: dragNode_1,
                        subNodes: _this.node.parent ? _this.node.parent.children : _this.tree.value,
                        index: _this.tree.dragNodeIndex
                    });
                });
            }
        }
        this.draghoverNode = false;
    };
    UITreeNode.prototype.onDropNodeDragEnter = function (event) {
        if (this.tree.droppableNodes && this.node.droppable !== false && this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope, DropType.Node)) {
            this.draghoverNode = true;
        }
    };
    UITreeNode.prototype.onDropNodeDragLeave = function (event) {
        if (this.tree.droppableNodes) {
            var rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y >= Math.floor(rect.top + rect.height) || event.y < rect.top) {
                this.draghoverNode = false;
            }
        }
    };
    UITreeNode.ICON_CLASS = 'ui-treenode-icon ';
    UITreeNode.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-treeNode',
                    template: "\n        <ng-template [ngIf]=\"node\">\n            <li *ngIf=\"tree.droppableNodes\" class=\"ui-treenode-droppoint\" [ngClass]=\"{'ui-treenode-droppoint-active ui-state-highlight':draghoverPrev}\"\n            (drop)=\"onDropPoint($event,-1)\" (dragover)=\"onDropPointDragOver($event)\" (dragenter)=\"onDropPointDragEnter($event,-1)\" (dragleave)=\"onDropPointDragLeave($event)\"></li>\n            <li *ngIf=\"!tree.horizontal\" [ngClass]=\"['ui-treenode',node.styleClass||'', isLeaf() ? 'ui-treenode-leaf': '']\">\n                <div class=\"ui-treenode-content\" (click)=\"onNodeClick($event)\" (contextmenu)=\"onNodeRightClick($event)\" (touchend)=\"onNodeTouchEnd()\"\n                    (drop)=\"onDropNode($event)\" (dragover)=\"onDropNodeDragOver($event)\" (dragenter)=\"onDropNodeDragEnter($event)\" (dragleave)=\"onDropNodeDragLeave($event)\"\n                    [ngClass]=\"{'ui-treenode-selectable':tree.selectionMode && node.selectable !== false,'ui-treenode-dragover':draghoverNode, 'ui-treenode-content-selected':isSelected()}\" [draggable]=\"tree.draggableNodes\" (dragstart)=\"onDragStart($event)\" (dragend)=\"onDragStop($event)\">\n                    <span class=\"ui-tree-toggler pi pi-fw\" [ngClass]=\"{'pi-caret-right':!node.expanded,'pi-caret-down':node.expanded}\"\n                            (click)=\"toggle($event)\"></span\n                    ><div class=\"ui-chkbox\" *ngIf=\"tree.selectionMode == 'checkbox' && node.selectable !== false\"><div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\">\n                        <span class=\"ui-chkbox-icon ui-clickable pi\"\n                            [ngClass]=\"{'pi-check':isSelected(),'pi-minus':node.partialSelected}\"></span></div></div\n                    ><span [class]=\"getIcon()\" *ngIf=\"node.icon||node.expandedIcon||node.collapsedIcon\"></span\n                    ><span class=\"ui-treenode-label ui-corner-all\"\n                        [ngClass]=\"{'ui-state-highlight':isSelected()}\">\n                            <span *ngIf=\"!tree.getTemplateForNode(node)\">{{node.label}}</span>\n                            <span *ngIf=\"tree.getTemplateForNode(node)\">\n                                <ng-container *ngTemplateOutlet=\"tree.getTemplateForNode(node); context: {$implicit: node}\"></ng-container>\n                            </span>\n                    </span>\n                </div>\n                <ul class=\"ui-treenode-children\" style=\"display: none;\" *ngIf=\"node.children && node.expanded\" [style.display]=\"node.expanded ? 'block' : 'none'\">\n                    <p-treeNode *ngFor=\"let childNode of node.children;let firstChild=first;let lastChild=last; let index=index\" [node]=\"childNode\" [parentNode]=\"node\"\n                        [firstChild]=\"firstChild\" [lastChild]=\"lastChild\" [index]=\"index\"></p-treeNode>\n                </ul>\n            </li>\n            <li *ngIf=\"tree.droppableNodes&&lastChild\" class=\"ui-treenode-droppoint\" [ngClass]=\"{'ui-treenode-droppoint-active ui-state-highlight':draghoverNext}\"\n            (drop)=\"onDropPoint($event,1)\" (dragover)=\"onDropPointDragOver($event)\" (dragenter)=\"onDropPointDragEnter($event,1)\" (dragleave)=\"onDropPointDragLeave($event)\"></li>\n            <table *ngIf=\"tree.horizontal\" [class]=\"node.styleClass\">\n                <tbody>\n                    <tr>\n                        <td class=\"ui-treenode-connector\" *ngIf=\"!root\">\n                            <table class=\"ui-treenode-connector-table\">\n                                <tbody>\n                                    <tr>\n                                        <td [ngClass]=\"{'ui-treenode-connector-line':!firstChild}\"></td>\n                                    </tr>\n                                    <tr>\n                                        <td [ngClass]=\"{'ui-treenode-connector-line':!lastChild}\"></td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </td>\n                        <td class=\"ui-treenode\" [ngClass]=\"{'ui-treenode-collapsed':!node.expanded}\">\n                            <div class=\"ui-treenode-content ui-state-default ui-corner-all\"\n                                [ngClass]=\"{'ui-treenode-selectable':tree.selectionMode,'ui-state-highlight':isSelected()}\" (click)=\"onNodeClick($event)\" (contextmenu)=\"onNodeRightClick($event)\"\n                                (touchend)=\"onNodeTouchEnd()\">\n                                <span class=\"ui-tree-toggler pi pi-fw\" [ngClass]=\"{'pi-plus':!node.expanded,'pi-minus':node.expanded}\" *ngIf=\"!isLeaf()\"\n                                        (click)=\"toggle($event)\"></span\n                                ><span [class]=\"getIcon()\" *ngIf=\"node.icon||node.expandedIcon||node.collapsedIcon\"></span\n                                ><span class=\"ui-treenode-label ui-corner-all\">\n                                        <span *ngIf=\"!tree.getTemplateForNode(node)\">{{node.label}}</span>\n                                        <span *ngIf=\"tree.getTemplateForNode(node)\">\n                                        <ng-container *ngTemplateOutlet=\"tree.getTemplateForNode(node); context: {$implicit: node}\"></ng-container>\n                                        </span>\n                                </span>\n                            </div>\n                        </td>\n                        <td class=\"ui-treenode-children-container\" *ngIf=\"node.children && node.expanded\" [style.display]=\"node.expanded ? 'table-cell' : 'none'\">\n                            <div class=\"ui-treenode-children\">\n                                <p-treeNode *ngFor=\"let childNode of node.children;let firstChild=first;let lastChild=last;\" [node]=\"childNode\"\n                                        [firstChild]=\"firstChild\" [lastChild]=\"lastChild\"></p-treeNode>\n                            </div>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    UITreeNode.ctorParameters = function () { return [
        { type: Tree, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return Tree; }),] }] }
    ]; };
    UITreeNode.propDecorators = {
        node: [{ type: core_1.Input }],
        parentNode: [{ type: core_1.Input }],
        root: [{ type: core_1.Input }],
        index: [{ type: core_1.Input }],
        firstChild: [{ type: core_1.Input }],
        lastChild: [{ type: core_1.Input }]
    };
    return UITreeNode;
}());
exports.UITreeNode = UITreeNode;
var Tree = /** @class */ (function () {
    function Tree(el, dragDropService) {
        this.el = el;
        this.dragDropService = dragDropService;
        this.selectionChange = new core_1.EventEmitter();
        this.onNodeSelect = new core_1.EventEmitter();
        this.onNodeUnselect = new core_1.EventEmitter();
        this.onNodeExpand = new core_1.EventEmitter();
        this.onNodeCollapse = new core_1.EventEmitter();
        this.onNodeContextMenuSelect = new core_1.EventEmitter();
        this.onNodeDrop = new core_1.EventEmitter();
        this.layout = 'vertical';
        this.metaKeySelection = true;
        this.propagateSelectionUp = true;
        this.propagateSelectionDown = true;
        this.loadingIcon = 'pi pi-spinner';
        this.emptyMessage = 'No records found';
    }
    Tree.prototype.ngOnInit = function () {
        var _this = this;
        if (this.droppableNodes) {
            this.dragStartSubscription = this.dragDropService.dragStart$.subscribe(function (event) {
                _this.dragNodeTree = event.tree;
                _this.dragNode = event.node;
                _this.dragNodeSubNodes = event.subNodes;
                _this.dragNodeIndex = event.index;
                _this.dragNodeScope = event.scope;
            });
            this.dragStopSubscription = this.dragDropService.dragStop$.subscribe(function (event) {
                _this.dragNodeTree = null;
                _this.dragNode = null;
                _this.dragNodeSubNodes = null;
                _this.dragNodeIndex = null;
                _this.dragNodeScope = null;
                _this.dragHover = false;
            });
        }
    };
    Object.defineProperty(Tree.prototype, "horizontal", {
        get: function () {
            return this.layout == 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.templates.length) {
            this.templateMap = {};
        }
        this.templates.forEach(function (item) {
            _this.templateMap[item.name] = item.template;
        });
    };
    Tree.prototype.onNodeClick = function (event, node) {
        var eventTarget = event.target;
        if (eventTarget.className && eventTarget.className.indexOf('ui-tree-toggler') === 0) {
            return;
        }
        else if (this.selectionMode) {
            if (node.selectable === false) {
                return;
            }
            var index_1 = this.findIndexInSelection(node);
            var selected = (index_1 >= 0);
            if (this.isCheckboxSelectionMode()) {
                if (selected) {
                    if (this.propagateSelectionDown)
                        this.propagateDown(node, false);
                    else
                        this.selection = this.selection.filter(function (val, i) { return i != index_1; });
                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, false);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    if (this.propagateSelectionDown)
                        this.propagateDown(node, true);
                    else
                        this.selection = (this.selection || []).concat([node]);
                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, true);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            else {
                var metaSelection = this.nodeTouched ? false : this.metaKeySelection;
                if (metaSelection) {
                    var metaKey = (event.metaKey || event.ctrlKey);
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(null);
                        }
                        else {
                            this.selection = this.selection.filter(function (val, i) { return i != index_1; });
                            this.selectionChange.emit(this.selection);
                        }
                        this.onNodeUnselect.emit({ originalEvent: event, node: node });
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(node);
                        }
                        else if (this.isMultipleSelectionMode()) {
                            this.selection = (!metaKey) ? [] : this.selection || [];
                            this.selection = this.selection.concat([node]);
                            this.selectionChange.emit(this.selection);
                        }
                        this.onNodeSelect.emit({ originalEvent: event, node: node });
                    }
                }
                else {
                    if (this.isSingleSelectionMode()) {
                        if (selected) {
                            this.selection = null;
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        }
                        else {
                            this.selection = node;
                            this.onNodeSelect.emit({ originalEvent: event, node: node });
                        }
                    }
                    else {
                        if (selected) {
                            this.selection = this.selection.filter(function (val, i) { return i != index_1; });
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        }
                        else {
                            this.selection = (this.selection || []).concat([node]);
                            this.onNodeSelect.emit({ originalEvent: event, node: node });
                        }
                    }
                    this.selectionChange.emit(this.selection);
                }
            }
        }
        this.nodeTouched = false;
    };
    Tree.prototype.onNodeTouchEnd = function () {
        this.nodeTouched = true;
    };
    Tree.prototype.onNodeRightClick = function (event, node) {
        if (this.contextMenu) {
            var eventTarget = event.target;
            if (eventTarget.className && eventTarget.className.indexOf('ui-tree-toggler') === 0) {
                return;
            }
            else {
                var index = this.findIndexInSelection(node);
                var selected = (index >= 0);
                if (!selected) {
                    if (this.isSingleSelectionMode())
                        this.selectionChange.emit(node);
                    else
                        this.selectionChange.emit([node]);
                }
                this.contextMenu.show(event);
                this.onNodeContextMenuSelect.emit({ originalEvent: event, node: node });
            }
        }
    };
    Tree.prototype.findIndexInSelection = function (node) {
        var index = -1;
        if (this.selectionMode && this.selection) {
            if (this.isSingleSelectionMode()) {
                index = (this.selection == node) ? 0 : -1;
            }
            else {
                for (var i = 0; i < this.selection.length; i++) {
                    if (this.selection[i] == node) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    };
    Tree.prototype.propagateUp = function (node, select) {
        if (node.children && node.children.length) {
            var selectedCount = 0;
            var childPartialSelected = false;
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (this.isSelected(child)) {
                    selectedCount++;
                }
                else if (child.partialSelected) {
                    childPartialSelected = true;
                }
            }
            if (select && selectedCount == node.children.length) {
                this.selection = (this.selection || []).concat([node]);
                node.partialSelected = false;
            }
            else {
                if (!select) {
                    var index_2 = this.findIndexInSelection(node);
                    if (index_2 >= 0) {
                        this.selection = this.selection.filter(function (val, i) { return i != index_2; });
                    }
                }
                if (childPartialSelected || selectedCount > 0 && selectedCount != node.children.length)
                    node.partialSelected = true;
                else
                    node.partialSelected = false;
            }
        }
        var parent = node.parent;
        if (parent) {
            this.propagateUp(parent, select);
        }
    };
    Tree.prototype.propagateDown = function (node, select) {
        var index = this.findIndexInSelection(node);
        if (select && index == -1) {
            this.selection = (this.selection || []).concat([node]);
        }
        else if (!select && index > -1) {
            this.selection = this.selection.filter(function (val, i) { return i != index; });
        }
        node.partialSelected = false;
        if (node.children && node.children.length) {
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                this.propagateDown(child, select);
            }
        }
    };
    Tree.prototype.isSelected = function (node) {
        return this.findIndexInSelection(node) != -1;
    };
    Tree.prototype.isSingleSelectionMode = function () {
        return this.selectionMode && this.selectionMode == 'single';
    };
    Tree.prototype.isMultipleSelectionMode = function () {
        return this.selectionMode && this.selectionMode == 'multiple';
    };
    Tree.prototype.isCheckboxSelectionMode = function () {
        return this.selectionMode && this.selectionMode == 'checkbox';
    };
    Tree.prototype.getTemplateForNode = function (node) {
        if (this.templateMap)
            return node.type ? (this.templateMap[node.type] ? this.templateMap[node.type] : this.templateMap['default']) : this.templateMap['default'];
        else
            return null;
    };
    Tree.prototype.onDragOver = function (event) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.dataTransfer.dropEffect = 'move';
            event.preventDefault();
        }
    };
    Tree.prototype.onDrop = function (event) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.preventDefault();
            var dragNode = this.dragNode;
            if (this.allowDrop(dragNode, null, this.dragNodeScope, DropType.Both)) {
                var dragNodeIndex = this.dragNodeIndex;
                this.dragNodeSubNodes.splice(dragNodeIndex, 1);
                this.value = this.value || [];
                this.value.push(dragNode);
                this.dragDropService.stopDrag({
                    node: dragNode
                });
            }
        }
    };
    Tree.prototype.onDragEnter = function (event) {
        if (this.droppableNodes && this.allowDrop(this.dragNode, null, this.dragNodeScope, DropType.Both)) {
            this.dragHover = true;
        }
    };
    Tree.prototype.onDragLeave = function (event) {
        if (this.droppableNodes) {
            var rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y > rect.top + rect.height || event.y < rect.top) {
                this.dragHover = false;
            }
        }
    };
    Tree.prototype.allowDrop = function (dragNode, dropNode, dragNodeScope, dropType) {
        if (!dragNode) {
            //prevent random html elements to be dragged
            return false;
        }
        else if (this.isValidDragScope(dragNodeScope)) {
            var allow_1 = true;
            if (dropNode) {
                if (dragNode === dropNode) {
                    allow_1 = false;
                }
                else {
                    var parent_1 = dropNode.parent;
                    while (parent_1 != null) {
                        if (parent_1 === dragNode) {
                            allow_1 = false;
                            break;
                        }
                        parent_1 = parent_1.parent;
                    }
                    if (allow_1) {
                        var evaluateDropScope = function (dropScope, dragScope) {
                            if (typeof dropScope === 'string') {
                                if (typeof dragScope === 'string')
                                    allow_1 = dropScope === dragScope;
                                else if (dragScope instanceof Array)
                                    allow_1 = dragScope.indexOf(dropScope) != -1;
                            }
                            else if (dropScope instanceof Array) {
                                if (typeof dragScope === 'string') {
                                    allow_1 = dropScope.indexOf(dragScope) != -1;
                                }
                                else if (dragScope instanceof Array) {
                                    for (var _i = 0, dropScope_1 = dropScope; _i < dropScope_1.length; _i++) {
                                        var s = dropScope_1[_i];
                                        for (var _a = 0, dragScope_1 = dragScope; _a < dragScope_1.length; _a++) {
                                            var ds = dragScope_1[_a];
                                            if (s === ds) {
                                                allow_1 = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        };
                        if (dropType === DropType.Node) {
                            evaluateDropScope(dropNode.dropScope, dragNode.dragScope);
                        }
                        else if (dropType === DropType.DropPoint) {
                            evaluateDropScope(dropNode.dropPointScope, dragNode.dragScope);
                        }
                        else if (dropType === DropType.Both) {
                            evaluateDropScope(dropNode.dropScope, dragNode.dragScope);
                            evaluateDropScope(dropNode.dropPointScope, dragNode.dragScope);
                        }
                    }
                }
            }
            return allow_1;
        }
        else {
            return false;
        }
    };
    Tree.prototype.isValidDragScope = function (dragScope) {
        var dropScope = this.droppableScope;
        if (dropScope) {
            if (typeof dropScope === 'string') {
                if (typeof dragScope === 'string')
                    return dropScope === dragScope;
                else if (dragScope instanceof Array)
                    return dragScope.indexOf(dropScope) != -1;
            }
            else if (dropScope instanceof Array) {
                if (typeof dragScope === 'string') {
                    return dropScope.indexOf(dragScope) != -1;
                }
                else if (dragScope instanceof Array) {
                    for (var _i = 0, dropScope_2 = dropScope; _i < dropScope_2.length; _i++) {
                        var s = dropScope_2[_i];
                        for (var _a = 0, dragScope_2 = dragScope; _a < dragScope_2.length; _a++) {
                            var ds = dragScope_2[_a];
                            if (s === ds) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }
        else {
            return true;
        }
    };
    Tree.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Tree.prototype.ngOnDestroy = function () {
        if (this.dragStartSubscription) {
            this.dragStartSubscription.unsubscribe();
        }
        if (this.dragStopSubscription) {
            this.dragStopSubscription.unsubscribe();
        }
    };
    Tree.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-tree',
                    template: "\n        <div [ngClass]=\"{'ui-tree ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode,'ui-treenode-dragover':dragHover,'ui-tree-loading': loading}\" [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"!horizontal\"\n            (drop)=\"onDrop($event)\" (dragover)=\"onDragOver($event)\" (dragenter)=\"onDragEnter($event)\" (dragleave)=\"onDragLeave($event)\">\n            <div class=\"ui-tree-loading-mask ui-widget-overlay\" *ngIf=\"loading\"></div>\n            <div class=\"ui-tree-loading-content\" *ngIf=\"loading\">\n                <i [class]=\"'ui-tree-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <ul class=\"ui-tree-container\" *ngIf=\"value\">\n                <p-treeNode *ngFor=\"let node of value;let firstChild=first;let lastChild=last; let index=index\" [node]=\"node\"\n                [firstChild]=\"firstChild\" [lastChild]=\"lastChild\" [index]=\"index\"></p-treeNode>\n            </ul>\n            <div class=\"ui-tree-empty-message\" *ngIf=\"!loading && !value\">{{emptyMessage}}</div>\n        </div>\n        <div [ngClass]=\"{'ui-tree ui-tree-horizontal ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode}\"  [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"horizontal\">\n            <div class=\"ui-tree-loading ui-widget-overlay\" *ngIf=\"loading\"></div>\n            <div class=\"ui-tree-loading-content\" *ngIf=\"loading\">\n                <i [class]=\"'ui-tree-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <table *ngIf=\"value&&value[0]\">\n                <p-treeNode [node]=\"value[0]\" [root]=\"true\"></p-treeNode>\n            </table>\n            <div class=\"ui-tree-empty-message\" *ngIf=\"!loading && !value\">{{emptyMessage}}</div>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    Tree.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: treedragdropservice_1.TreeDragDropService, decorators: [{ type: core_2.Optional }] }
    ]; };
    Tree.propDecorators = {
        value: [{ type: core_1.Input }],
        selectionMode: [{ type: core_1.Input }],
        selection: [{ type: core_1.Input }],
        selectionChange: [{ type: core_1.Output }],
        onNodeSelect: [{ type: core_1.Output }],
        onNodeUnselect: [{ type: core_1.Output }],
        onNodeExpand: [{ type: core_1.Output }],
        onNodeCollapse: [{ type: core_1.Output }],
        onNodeContextMenuSelect: [{ type: core_1.Output }],
        onNodeDrop: [{ type: core_1.Output }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }],
        contextMenu: [{ type: core_1.Input }],
        layout: [{ type: core_1.Input }],
        draggableScope: [{ type: core_1.Input }],
        droppableScope: [{ type: core_1.Input }],
        draggableNodes: [{ type: core_1.Input }],
        droppableNodes: [{ type: core_1.Input }],
        metaKeySelection: [{ type: core_1.Input }],
        propagateSelectionUp: [{ type: core_1.Input }],
        propagateSelectionDown: [{ type: core_1.Input }],
        loading: [{ type: core_1.Input }],
        loadingIcon: [{ type: core_1.Input }],
        emptyMessage: [{ type: core_1.Input }],
        templates: [{ type: core_1.ContentChildren, args: [shared_2.PrimeTemplate,] }]
    };
    return Tree;
}());
exports.Tree = Tree;
var DropType;
(function (DropType) {
    DropType[DropType["Both"] = 0] = "Both";
    DropType[DropType["DropPoint"] = 1] = "DropPoint";
    DropType[DropType["Node"] = 2] = "Node";
})(DropType = exports.DropType || (exports.DropType = {}));
var TreeModule = /** @class */ (function () {
    function TreeModule() {
    }
    TreeModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [Tree, shared_1.SharedModule],
                    declarations: [Tree, UITreeNode]
                },] },
    ];
    return TreeModule;
}());
exports.TreeModule = TreeModule;
//# sourceMappingURL=tree.js.map