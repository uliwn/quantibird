import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    perm: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'login', title: 'Login',  icon: 'input', class: '', perm: 'none' },
    { path: 'logout', title: 'Logout',  icon: 'exit_to_app', class: '', perm: 'loggedIn' },
    { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', perm: 'none' },
    { path: 'account', title: 'Mein Profil',  icon: 'person', class: '', perm: 'loggedIn' },
    { path: 'surveys', title: 'Umfragen',  icon: 'content_paste', class: '', perm: 'loggedIn' },
    { path: 'survey/create', title: 'Umfrage erstellen',  icon: 'library_books', class: '', perm: 'loggedIn' }
    // { path: 'maps', title: 'Maps',  icon: 'location_on', class: '' },
    // { path: 'notifications', title: 'Notifications',  icon: 'notifications', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => {
      return menuItem;
    });
  }

  checkPermissions(menuItem) {
    if (!(menuItem.path === 'login' && this.auth.loggedIn)) {
      return !(menuItem.perm === 'loggedIn' && !this.auth.loggedIn);
    } else {
      return false;
    }
  }

  isMobileMenu() {
      return $(window).width() <= 991;
  }
}
