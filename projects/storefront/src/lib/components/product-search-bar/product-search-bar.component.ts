import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'vsf-product-search-bar',
    templateUrl: './product-search-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSearchBarComponent implements OnInit, OnDestroy {
    /** If true, searches as you type */
    @Input() autoSearch = false;

    searchTerm = new FormControl('');
    private subscription: Subscription;
    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        if (this.autoSearch) {
            this.subscription = this.searchTerm.valueChanges.pipe(
                debounceTime(250),
            ).subscribe(term => this.doSearch(term));
        }
        this.searchTerm.setValue(this.route.snapshot.paramMap.get('search') || '');
    }

    doSearch(term: string) {
        this.router.navigate(['./', {search: term}], {relativeTo: this.route});
    }

    clearSearch() {
        this.searchTerm.setValue('');
        this.doSearch('');
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
