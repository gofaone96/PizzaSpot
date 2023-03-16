
      import { Component, OnInit } from '@angular/core';
      import { Router } from '@angular/router';
      import { JwtService } from 'src/app/_services/jwt.service';
      @Component({
        selector: 'app-landing',
        templateUrl: './landing.component.html',
        styleUrls: ['./landing.component.scss']
      })
      export class LandingComponent implements OnInit {
        user: any
          toast: any;

        constructor(private jwt: JwtService,private router:Router) { }

        ngOnInit(): void {
            //check if user is logged in
            sessionStorage.setItem('state','Goo...');
            if(this.jwt.isAuthenticated()){
                this.user = this.jwt.getData(sessionStorage.getItem('key'));
                this.toast.success('You\'re already logged in')
                sessionStorage.setItem('state','logged in');
            }}}