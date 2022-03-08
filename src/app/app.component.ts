import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragExit,
  moveItemInArray,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Item } from './shared/models/item';

@Component({
  selector: 'cdk-drag-drop-nested-lists-example',
  templateUrl: 'app.html',
  styleUrls: ['app.scss'],
})
export class CdkDragDropNestedListsExample implements OnInit {
  public parentItem: Item = new Item({ name: 'Form Builder', type: 'ROOT' });

  layoutOptions = new Item({
    name: 'Layout',
    type: 'ROOT',
    children: [
      new Item({
        name: 'Section',
        type: 'SECTION',
        copy: true,
        icon: 'view_column',
      }),
    ],
  });

  basicComponents = new Item({
    name: 'Common Fields',
    type: 'ROOT',
    children: [
      new Item({
        name: 'Text',
        type: 'CHILD',
        copy: true,
        icon: 'title',
      }),
      new Item({
        name: 'Number',
        type: 'CHILD',
        copy: true,
        icon: 'numbers',
      }),
      new Item({
        name: 'Text Area',
        type: 'CHILD',
        copy: true,
        icon: 'short_text',
      }),
      new Item({
        name: 'Select Boxes',
        type: 'CHILD',
        copy: true,
        icon: 'checklist',
      }),
      new Item({
        name: 'Select Options ',
        type: 'CHILD',
        copy: true,
        icon: 'list',
      }),
      new Item({
        name: 'Yes/No',
        type: 'CHILD',
        copy: true,
        icon: 'check_box',
      }),
      new Item({
        name: 'Password',
        type: 'CHILD',
        copy: true,
        icon: 'password',
      }),
    ],
  });

  specialComponents = new Item({
    name: 'Special Fields',
    type: 'ROOT',
    children: [
      new Item({
        name: 'Email',
        type: 'CHILD',
        copy: true,
        icon: 'email',
      }),
      new Item({
        name: 'Phone Number',
        type: 'CHILD',
        copy: true,
        icon: 'phone',
      }),
      new Item({
        name: 'Address',
        type: 'CHILD',
        copy: true,
        icon: 'contact_mail',
      }),
      new Item({
        name: 'Date / Time',
        type: 'CHILD',
        copy: true,
        icon: 'event',
      }),
      new Item({
        name: 'File',
        type: 'CHILD',
        copy: true,
        icon: 'file_upload',
      }),
      new Item({
        name: 'Signature',
        type: 'CHILD',
        copy: true,
        icon: 'draw',
      }),
    ],
  });

  constructor() {}

  public ngOnInit() {}

  public get connectedDropListsIds(): string[] {
    // We reverse ids here to respect items nesting hierarchy
    const ids = this.getIdsRecursive(this.parentItem).reverse();
    // console.log('connectedDropListsIds', ids);
    return ids;
  }

  public onDragDrop(event: CdkDragDrop<Item>) {
    event.container.element.nativeElement.classList.remove('active');

    if (this.canBeDropped(event)) {
      console.log('canbedropped');
      const item: Item = event.item.data;
      const copiedItem = item.copy ? item.deepCopy() : item;
      event.container.data.children.push(copiedItem);

      event.previousContainer.data.children =
        event.previousContainer.data.children.filter(
          (child) => child.uId !== copiedItem.uId
        );
    } else {
      console.log('moveItemInArray');
      moveItemInArray(
        event.container.data.children,
        event.previousIndex,
        event.currentIndex
      );
    }

    console.log(event.container.data);
  }

  private getIdsRecursive(item: Item): string[] {
    let ids = [item.uId];
    item.children.forEach((childItem) => {
      ids = ids.concat(this.getIdsRecursive(childItem));
    });
    return ids;
  }

  private canBeDropped(event: CdkDragDrop<Item, Item>): boolean {
    const movingItem: Item = event.item.data;

    return (
      event.previousContainer.id !== event.container.id &&
      this.isNotSelfDrop(event) &&
      !this.hasChild(movingItem, event.container.data)
    );
  }

  private isNotSelfDrop(
    event: CdkDragDrop<Item> | CdkDragEnter<Item> | CdkDragExit<Item>
  ): boolean {
    return event.container.data.uId !== event.item.data.uId;
  }

  private hasChild(parentItem: Item, childItem: Item): boolean {
    const hasChild = parentItem.children.some(
      (item) => item.uId === childItem.uId
    );
    return hasChild
      ? true
      : parentItem.children.some((item) => this.hasChild(item, childItem));
  }
}
