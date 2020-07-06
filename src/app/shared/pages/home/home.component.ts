import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../modules/authentication/services/user.service';
import {User} from '../../../modules/authentication/model/classes/user';
import {AuthenticationService} from '../../../modules/authentication/services/authentication.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
  }
}
