import { isDevMode } from '@angular/core';
import * as uuid from 'uuid';

export class Item {
  name: string;
  uId: string;
  children: Item[];
  type: 'CHILD' | 'SECTION' | 'ROOT';
  copy?: boolean;
  icon: string;

  constructor(options: {
    name: string;
    children?: Item[];
    type: 'CHILD' | 'SECTION' | 'ROOT';
    copy?: boolean;
    icon?: string;
  }) {
    this.name = options.name;
    this.uId = uuid.v4();
    this.children = options.children || [];
    this.type = options.type;
    this.copy = options.copy;
    this.icon = options.icon;
  }

  public deepCopy() {
    const copied = JSON.parse(JSON.stringify(this));
    const instance = new Item({
      name: copied.name,
      children: copied.children,
      type: copied.type,
    });

    instance.uId = uuid.v4();
    return instance;
  }
  public get hasDropZone() {
    return (
      this.children.length > 0 ||
      this.type === 'SECTION' ||
      this.type === 'ROOT'
    );
  }
}
