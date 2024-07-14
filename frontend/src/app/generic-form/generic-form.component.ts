import { Component, Input, Output, EventEmitter } from '@angular/core';

interface FormField {
  name: string;
  label: string;
  type: string;
  value: any;
}

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
})
export class GenericFormComponent {
  @Input() fields: FormField[] = [];
  @Input() title: string = '';
  @Output() formSubmit = new EventEmitter<any>();

  onSubmit(): void {
    const formData = this.fields.reduce(
      (acc: { [key: string]: any }, field) => {
        acc[field.name] = field.value;
        return acc;
      },
      {}
    );
    this.formSubmit.emit(formData);
  }
}
