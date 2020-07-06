import {Component, HostListener, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../modules/authentication/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  toggleBurgerMenu(): void {
    const nav = document.querySelector('.nav-links');
    const burger = document.querySelector('.toggle-button');
    nav.classList.toggle('active');
    burger.classList.toggle('active');

    nav.addEventListener('click', () => {
      nav.classList.remove('active');
      burger.classList.remove('active');
    });
  }
}
