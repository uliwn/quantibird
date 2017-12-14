import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'login', title: 'Login',  icon: 'input', class: '' },
    { path: 'logout', title: 'Logout',  icon: 'exit_to_app', class: '' },
    { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: 'account', title: 'Mein Profil',  icon: 'person', class: '' },
    // { path: 'table-list', title: 'Table List',  icon: 'content_paste', class: '' },
    // { path: 'typography', title: 'Typography',  icon: 'library_books', class: '' },
    // { path: 'icons', title: 'Icons',  icon: 'bubble_chart', class: '' },
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
    if (menuItem.path === 'login' && this.auth.loggedIn) {
      return false;
    } else if (menuItem.path === 'logout' && !this.auth.loggedIn) {
      return false;
    } else if (menuItem.path === 'account' && !this.auth.loggedIn) {
      return false;
    }
    return true;
  }

  isMobileMenu() {
      return $(window).width() <= 991;
  }
}
