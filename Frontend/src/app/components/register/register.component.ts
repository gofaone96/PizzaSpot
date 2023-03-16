import { Component, OnInit } from "@angular/core";
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';
import { User } from "src/app/interfaces/user";
import { JwtService } from 'src/app/_services/jwt.service';
import { AuthusersService } from 'src/app/_services/authusers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
nextStep(arg0: FormGroup<{ email: FormControl<string|null>; name: FormControl<string|null>; surname: FormControl<string|null>; password: FormControl<string|null>; confirmPassword: FormControl<string|null>; gender: FormControl<string|null>; }>) {
}

  role: any;
  tsAccount = new RegExp("^[a-zA-Z ]{2,}$");
  tsName = new RegExp("^[a-zA-Z ]{2,}$");
  tsSurname = new RegExp("^[a-zA-Z ]{2,}$");



  submitted:any;
  user: User | null = {
    user_id: 0,
    name: '',
    surname: '',
    email: '',
  };
  jwt: any;
  registerForm1!: FormGroup<{ email: FormControl<string | null>; name: FormControl<string | null>; surname: FormControl<string | null>; password: FormControl<string | null>; confirmPassword: FormControl<string | null>; gender: FormControl<string | null>; }>;


  constructor( private auth: AuthusersService, private router: Router,private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    sessionStorage.setItem('state','No go...');
    if(this.jwt.isAuthenticated()){
      this.user = this.jwt.getData(sessionStorage.getItem('key'));

      sessionStorage.setItem('state','logged in');


    
  
  this.registerForm1 = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]$'),

    ]),

    surname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]$'),

    ]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });
}}}

