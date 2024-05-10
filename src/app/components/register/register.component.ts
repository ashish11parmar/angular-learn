import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, CommonModule, MatIconModule, MatCardModule, ReactiveFormsModule, FormsModule, MatSelectModule, MatRadioModule, MatButtonModule, MatDatepickerModule, MatStepperModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hide: boolean = true;
  chide: boolean = true
  matchPassword: boolean = true
  maxDate = new Date
  country: any
  cities: any
  citySelect: boolean = true
  public registerUser: FormGroup | any


  constructor(private _userservices: UserService) {

  }

  ngOnInit() {
    this.createForm();
    this.getAllCountry()
  }

  // CreatForm

  createForm() {
    this.registerUser = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]*$')]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]*$')]),
      middlename: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]*$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9_]{4,15}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/), Validators.minLength(8), Validators.maxLength(20)]),
      cpassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
      dob: new FormControl('', [Validators.required, this.minimumAgeValidator(18)]),
      gender: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]+$')]),
      status: new FormControl('', [Validators.required])
    })
  }



  //Toggle function for visible password and hide 
  toggleButton() {
    this.hide = !this.hide
  }

  //Toggle function for visible confirm password and hide 
  toggleButton1() {
    this.chide = !this.chide
  }


  // Custom validator for minimum age
  minimumAgeValidator(minAge: number) {
    return (control: any) => {

      if (!control.value) {
        return null;
      }
      // console.log("CONTROL::", control);
      const dob = new Date(control.value);
      // console.log("DOB::", dob);
      const today = new Date();
      const diff = today.getFullYear() - dob.getFullYear();
      // console.log("FUL YEAR::", diff)
      if (diff < minAge) {
        return { minimumAge: true };
      }
      return null;
    };
  }



  regsiter() {
    // Mark all fields as touched to trigger validation errors
    Object.keys(this.registerUser.controls).forEach(field => {
      const control = this.registerUser.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    // If form is invalid, stop here
    if (this.registerUser.invalid) {
      Swal.fire({
        toast: true,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        // icon: typeIcon,
        timerProgressBar: true,
        timer: 3000,
        title: 'Please fill all property'
      })
      return;
    } else {
      if (this.registerUser.value.password === this.registerUser.value.cpassword) {
        console.log(this.registerUser.value);
      } else {
        console.log("password not match");
      }
    }
  }

  getAllCountry() {
    this._userservices.getAllCountry().subscribe((res: any) => {
      this.country = res.data
    }, (error: any) => {
      console.log(error);
    })
  }

  getCity(event: any) {
    this.citySelect = true
    this._userservices.getAllCities(event.value).subscribe((res: any) => {
      this.cities = res.data
      this.citySelect = false
    }, (error: any) => {
      console.log("ERROR::", error);

    })

  }

}
