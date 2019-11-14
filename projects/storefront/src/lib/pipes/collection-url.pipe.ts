import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'collectionUrl',
})
export class CollectionUrlPipe implements PipeTransform {

    transform(value: { id: string; name: string; }): string {
        const { id, name } = value;
        return name.replace(/\s+/g, '-').toLowerCase() + '_' + id;
    }

}
