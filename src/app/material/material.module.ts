import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

const MATERIAL_MODULES = [
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatRadioModule,
    MatExpansionModule,
];

@NgModule({
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES,
})
export class MaterialModule {}
