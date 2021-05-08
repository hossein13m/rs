import { MaterialModule } from '#shared/material.module';
import { ShareModule } from '#shared/share.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import { GlChangesComponent } from './gl-changes.component';
import { GlChangesService } from './gl-changes.service';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: GlChangesComponent,
    },
];

@NgModule({
    declarations: [GlChangesComponent],
    imports: [CommonModule, MaterialModule, ShareModule, MatTooltipModule, LayoutModule, RouterModule.forChild(routes)],
    providers: [GlChangesService],
})
export class GlChangesModule {}
