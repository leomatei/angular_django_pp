import { Component } from '@angular/core';
import { ComplaintsService } from '../services/complaints.service';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.scss'],
})
export class ComplaintFormComponent {
  formFields = [
    { name: 'author', label: 'Author', type: 'text', value: '' },
    { name: 'title', label: 'Title', type: 'text', value: '' },
    { name: 'description', label: 'Description', type: 'text', value: '' },
  ];

  constructor(private complaintsService: ComplaintsService) {}

  onFormSubmit(formData: any): void {
    const { title, author, description } = formData;
    this.complaintsService.create(title, author, description).subscribe(
      () => console.log('success'),
      (e) => console.log(e)
    );
  }
}
