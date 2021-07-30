import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthService
  ) { }

  ngOnInit(): void {
  }

  processLogin() {
    this.service.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .subscribe(
        data => this.router.navigate(['/products']),
        error => alert("Login failed!")
        );
  }

}
