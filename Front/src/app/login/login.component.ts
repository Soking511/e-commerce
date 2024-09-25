import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  invalidLogin: string= '';

  loginForm = new FormGroup({
    email:  new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  });

  constructor(private _AuthService:AuthService, private _Router:Router){ }

  login(formData:FormGroup){
    this._AuthService.login(formData.value).subscribe({
      next:(res) => {
        localStorage.setItem('user', res.token );
        // console.log(localStorage.getItem('user'));
        this._AuthService.saveCurrentUser();
        this._Router.navigate(['/home']);
      },
      // error:(err) => {
      //   this.invalidLogin = err.error.message;
      // }
    })
  }
  ngOnInit(): void {

  }
}
