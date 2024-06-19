import { Component } from '@angular/core';
import { ComplaintsService } from '../services/complaints.service';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.sass'],
})
export class ComplaintFormComponent {
  author: string = '';
  title: string = '';
  description: string = '';

  constructor(private complaintsService: ComplaintsService) {}

  onSubmit(): void {
    this.complaintsService
      .create(this.title, this.author, this.description)
      .subscribe(
        () => console.log('succes'),
        (e) => console.log(e)
      );
  }
}
