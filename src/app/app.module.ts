import { BrowserModule } from '@angular/platform-browser';
import { CdkDragDropNestedListsExample } from './app.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListItemComponent } from './shared/components/list-item/list-item.component';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [BrowserModule, CommonModule, DragDropModule, CardModule],
  entryComponents: [ListItemComponent, CdkDragDropNestedListsExample],
  declarations: [ListItemComponent, CdkDragDropNestedListsExample],
  bootstrap: [CdkDragDropNestedListsExample],
  providers: [],
})
export class AppModule {}
