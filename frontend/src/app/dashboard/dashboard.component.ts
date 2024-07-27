import { jwtDecode } from 'jwt-decode';
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

  fetchUsers(): any {
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

  fetchComplaints(): any {
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
  }

  assignUser(complaintId: number, event: Event) {
    const target = event.target as HTMLSelectElement;
    const userId = target.value;
    if (userId) {
      this.complaintService.assignComplaint(complaintId, +userId).subscribe(
        (response) => {
          console.log('Complaint successfully assigned', response);
          // this.fetchComplaints(); // Refresh the complaints list to show the updated data
        },
        (error) => {
          console.error('Error assigning complaint', error);
        }
      );
    }
  }

  getAssigneeName(assigneeId: number): string | null {
    console.log(assigneeId, this.users);
    const user = this.users.find((u) => u.id === assigneeId);
    return user ? user.username : null;
  }

  ngOnInit(): void {
    const token = this.authService.getAccessToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    const decodedToken: any = jwtDecode(token);
    switch (decodedToken.role) {
      case 'admin':
        this.fetchUsers();
        this.fetchComplaints();
        break;
      case 'support':
        this.fetchComplaints();
        break;
      default:
        console.log('TBD');
    }
    this.usersLoading = false;
    this.complaintsLoading = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
