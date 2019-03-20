import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetCollections } from '../../generated-types';
import { DataService } from '../../providers/data.service';

import { GET_COLLECTIONS } from './collections-menu.graphql';

@Component({
    selector: 'vsf-collections-menu',
    templateUrl: './collections-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionsMenuComponent implements OnInit {

    collectionTree$: Observable<RootNode<GetCollections.Items>>;
    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.collectionTree$ = this.dataService.query<GetCollections.Query, GetCollections.Variables>(GET_COLLECTIONS, {
            options: {},
        }).pipe(
            map(data => arrayToTree(data.collections.items)),
        );
    }

}

export type HasParent = { id: string; parent: { id: string } };
export type TreeNode<T extends HasParent> = T & { children: Array<TreeNode<T>> };
export type RootNode<T extends HasParent> = { id?: string; children: Array<TreeNode<T>> };

/**
 * Builds a tree from an array of nodes which have a parent.
 * Based on https://stackoverflow.com/a/31247960/772859, modified to preserve ordering.
 */
export function arrayToTree<T extends HasParent>(nodes: T[]): RootNode<T> {
    const topLevelNodes: Array<TreeNode<T>> = [];
    const mappedArr: { [id: string]: TreeNode<T> } = {};

    // First map the nodes of the array to an object -> create a hash table.
    for (const node of nodes) {
        mappedArr[node.id] = { ...(node as any), children: [] };
    }

    for (const id of nodes.map(n => n.id)) {
        if (mappedArr.hasOwnProperty(id)) {
            const mappedElem = mappedArr[id];
            // If the element is not at the root level, add it to its parent array of children.
            const parentIsRoot = !mappedArr[mappedElem.parent.id];
            if (!parentIsRoot) {
                if (mappedArr[mappedElem.parent.id]) {
                    mappedArr[mappedElem.parent.id].children.push(mappedElem);
                } else {
                    mappedArr[mappedElem.parent.id] = { children: [mappedElem] } as any;
                }
            } else {
                topLevelNodes.push(mappedElem);
            }
        }
    }
    const rootId = topLevelNodes.length ? topLevelNodes[0].parent.id : undefined;
    return { id: rootId, children: topLevelNodes };
}
