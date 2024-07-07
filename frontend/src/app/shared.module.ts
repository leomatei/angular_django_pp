import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericFormComponent } from './generic-form/generic-form.component';

@NgModule({
  declarations: [GenericFormComponent],
  imports: [CommonModule, FormsModule],
  exports: [GenericFormComponent],
})
export class SharedModule {}
