import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ComplaintsService } from '../services/complaints.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  complaints: any[] = [];
  users: any[] = [];
  complaintsLoading: boolean = true;
  usersLoading: boolean = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private complaintService: ComplaintsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.complaintService.getComplaints().subscribe(
      (data) => {
        this.complaints = data;
        this.complaintsLoading = false;
      },
      (error) => {
        console.error('Error fetching complaints', error);
        this.complaintsLoading = false;
      }
    );
    this.usersService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.usersLoading = false;
      },
      (error) => {
        console.log('Error fetching users', error);
        this.usersLoading = false;
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
