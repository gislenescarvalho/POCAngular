import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from './../../model/user';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private location: Location) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(hero => this.user = hero);
  }

  back() {
    this.location.back();
  }

}
