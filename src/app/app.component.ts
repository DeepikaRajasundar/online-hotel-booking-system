import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {}

  logout() {
    // Perform any logout logic here (e.g., clear session, navigate to login page)
    this.router.navigate(['/login']);
  }
}
