import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './../../model/login';
import { username, password } from './../../utils/constants';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  account: Login = new Login();
  errorMessage: string;
  closeResult: string;

  constructor(private router: Router, private modalService: NgbModal) {

  }

  ngOnInit() {
  }

  doLogin() {

    if (this.account.username === `${username}` && this.account.password === `${password}`) {
      console.log('OK');
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Error :  Username or password are invalids!!!';
      console.log(this.errorMessage);
    }
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
