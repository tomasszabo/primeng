import { AfterContentInit, OnDestroy, EventEmitter, OnInit, QueryList, TemplateRef, ElementRef } from '@angular/core';
import { TreeNode } from '../common/treenode';
import { TreeDragDropService } from '../common/treedragdropservice';
import { Subscription } from 'rxjs';
import { BlockableUI } from '../common/blockableui';
export declare class UITreeNode implements OnInit {
    tree: Tree;
    static ICON_CLASS: string;
    node: TreeNode;
    parentNode: TreeNode;
    root: boolean;
    index: number;
    firstChild: boolean;
    lastChild: boolean;
    constructor(tree: Tree);
    draghoverPrev: boolean;
    draghoverNext: boolean;
    draghoverNode: boolean;
    ngOnInit(): void;
    getIcon(): string;
    isLeaf(): boolean;
    toggle(event: Event): void;
    onNodeClick(event: MouseEvent): void;
    onNodeTouchEnd(): void;
    onNodeRightClick(event: MouseEvent): void;
    isSelected(): boolean;
    onDropPoint(event: Event, position: number): void;
    onDropPointDragOver(event: any): void;
    onDropPointDragEnter(event: Event, position: number): void;
    onDropPointDragLeave(event: Event): void;
    onDragStart(event: any): void;
    onDragStop(event: any): void;
    onDropNodeDragOver(event: any): void;
    onDropNode(event: any): void;
    onDropNodeDragEnter(event: any): void;
    onDropNodeDragLeave(event: any): void;
}
export declare class Tree implements OnInit, AfterContentInit, OnDestroy, BlockableUI {
    el: ElementRef;
    dragDropService: TreeDragDropService;
    value: TreeNode[];
    selectionMode: string;
    selection: any;
    selectionChange: EventEmitter<any>;
    onNodeSelect: EventEmitter<any>;
    onNodeUnselect: EventEmitter<any>;
    onNodeExpand: EventEmitter<any>;
    onNodeCollapse: EventEmitter<any>;
    onNodeContextMenuSelect: EventEmitter<any>;
    onNodeDrop: EventEmitter<any>;
    style: any;
    styleClass: string;
    contextMenu: any;
    layout: string;
    draggableScope: any;
    droppableScope: any;
    draggableNodes: boolean;
    droppableNodes: boolean;
    metaKeySelection: boolean;
    propagateSelectionUp: boolean;
    propagateSelectionDown: boolean;
    loading: boolean;
    loadingIcon: string;
    emptyMessage: string;
    templates: QueryList<any>;
    templateMap: any;
    nodeTouched: boolean;
    dragNodeTree: Tree;
    dragNode: TreeNode;
    dragNodeSubNodes: TreeNode[];
    dragNodeIndex: number;
    dragNodeScope: any;
    dragHover: boolean;
    dragStartSubscription: Subscription;
    dragStopSubscription: Subscription;
    constructor(el: ElementRef, dragDropService: TreeDragDropService);
    ngOnInit(): void;
    readonly horizontal: boolean;
    ngAfterContentInit(): void;
    onNodeClick(event: MouseEvent, node: TreeNode): void;
    onNodeTouchEnd(): void;
    onNodeRightClick(event: MouseEvent, node: TreeNode): void;
    findIndexInSelection(node: TreeNode): number;
    propagateUp(node: TreeNode, select: boolean): void;
    propagateDown(node: TreeNode, select: boolean): void;
    isSelected(node: TreeNode): boolean;
    isSingleSelectionMode(): boolean;
    isMultipleSelectionMode(): boolean;
    isCheckboxSelectionMode(): boolean;
    getTemplateForNode(node: TreeNode): TemplateRef<any>;
    onDragOver(event: any): void;
    onDrop(event: any): void;
    onDragEnter(event: any): void;
    onDragLeave(event: any): void;
    allowDrop(dragNode: TreeNode, dropNode: TreeNode, dragNodeScope: any, dropType: DropType): boolean;
    isValidDragScope(dragScope: any): boolean;
    getBlockableElement(): HTMLElement;
    ngOnDestroy(): void;
}
export declare enum DropType {
    Both = 0,
    DropPoint = 1,
    Node = 2,
}
export declare class TreeModule {
}
