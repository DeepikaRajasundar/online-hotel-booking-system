// book.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  bookingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      customerName: ['', Validators.required],
      roomType: ['', Validators.required],
      paymentType: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  submitBookingForm() {
    if (this.bookingForm.valid) {
      this.http.post<any>('http://localhost:5000/book', this.bookingForm.value).subscribe(
        (response) => {
          console.log('Booking created successfully', response);
          this.router.navigate(['/cart'], {
            queryParams: {
              customerName: this.bookingForm.value.customerName,
              checkInDate: this.bookingForm.value.checkInDate,
              roomType: this.bookingForm.value.roomType,
              paymentType: this.bookingForm.value.paymentType,
              checkOutDate: this.bookingForm.value.checkOutDate,
              address: this.bookingForm.value.address,
              phoneNumber: this.bookingForm.value.phoneNumber
            }
          });
        },
        (error) => {
          console.error('Error creating booking', error);
          // Handle error as needed
        }
      );
    }
  }
}
