import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CdkDrag } from '@angular/cdk/drag-drop/typings/directives/drag';
import { CdkDragStart } from '@angular/cdk/drag-drop/typings/drag-events';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.html',
  styleUrls: ['./list-item.scss'],
})
export class ListItemComponent {
  @Input() item: Item;
  @Input() parentItem?: Item;
  @Input() position: number;
  @Input() itemTemplate: TemplateRef<any>;

  @Input() showDropzone: boolean = true;
  @Input() sectionOrientation: 'row' | 'column' = 'column';
  @Input() sectionAsParentOnly: boolean = true;

  @Input() public set connectedDropListsIds(ids: string[]) {
    this.allDropListsIds = ids;
  }

  public get connectedDropListsIds(): string[] {
    return this.allDropListsIds.filter((id) => id !== this.item.uId);
  }

  public get allChildrenDropListsIds(): string[] {
    return this.item.children.map((i) => i.uId);
  }

  public allDropListsIds: string[];

  public get dragDisabled(): boolean {
    return !this.parentItem;
  }

  public get parentItemId(): string {
    return this.dragDisabled ? '' : this.parentItem.uId;
  }

  @Output() itemDrop: EventEmitter<CdkDragDrop<Item>>;

  constructor() {
    this.allDropListsIds = [];
    this.itemDrop = new EventEmitter();
  }

  // public onDragDropParent(event: CdkDragDrop<Item, Item>): void {
  //   console.log('onDragDropParent', event.currentIndex, event.previousIndex);

  //   if (!this.allowDrop(event)) return;

  //   this.itemDrop.emit(event);
  // }

  // public onDragDropChildren(event: CdkDragDrop<Item, Item>): void {
  //   console.log('onDragDropChildren', event.currentIndex, event.previousIndex);

  //   if (!this.allowDrop(event)) return;

  //   this.itemDrop.emit(event);
  // }

  public onDragDrop(event: CdkDragDrop<Item, Item>): void {
    console.log(
      'onDragDrop',
      event.currentIndex,
      event.previousIndex,
      this.item,
      this.parentItem
    );

    if (!this.allowDrop(event)) return;

    this.itemDrop.emit(event);
  }

  public onDragDropItem(event: CdkDragDrop<Item, Item>): void {
    console.log(
      'onDragDropItem',
      event.currentIndex,
      event.previousIndex,
      this.item,
      this.parentItem
    );
    if (!this.allowDrop(event)) return;
    this.itemDrop.emit(event);
  }

  checkDropPredicate(item: CdkDrag<Item>) {
    console.log('checkDropPredicate', item.data);
    return true;
  }

  startDrag(event: CdkDragStart) {
    console.log('startDrag', event.source.element);
  }

  get hasDropZone() {
    return (
      this.item.children.length > 0 ||
      this.item.type === 'SECTION' ||
      this.item.type === 'ROOT'
    );
  }

  private allowDrop(event: CdkDragDrop<Item>) {
    const movingItem = event.item.data;
    const toItem = event.container.data;
    console.log({ toItem, movingItem });

    if (
      this.sectionAsParentOnly &&
      toItem.type === 'ROOT' &&
      movingItem.type === 'CHILD'
    ) {
      return false;
    }

    if (toItem.type === movingItem.type) {
      return false;
    }

    return true;
  }
}
