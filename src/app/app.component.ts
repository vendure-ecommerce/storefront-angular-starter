import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'sf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    cartDrawerVisible = false;
    isHomePage$: Observable<boolean>;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.isHomePage$ = this.router.events.pipe(
            filter<any>(event => event instanceof RouterEvent),
            map((event: RouterEvent) => event.url === '/'),
        );
    }
}
