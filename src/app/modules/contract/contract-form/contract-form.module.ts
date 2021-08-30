import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgFormBuilderModule } from 'ag-form-builder';
import { ContractFormComponent } from './contract-form.component';
import { ContractFormDialogComponent } from './contract-form-dialog/contract-form-dialog.component';
import { ContractFormService } from './contract-form.service';
import { LayoutModule } from '../../../layout/layout.module';
import { ShareModule } from '#shared/share.module';

const routes: Routes = [{ path: '', pathMatch: 'full', component: ContractFormComponent }];

@NgModule({
    declarations: [ContractFormComponent, ContractFormDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MatButtonModule, MatIconModule, AgFormBuilderModule, ShareModule],
    entryComponents: [ContractFormDialogComponent],
    providers: [ContractFormService],
})
export class ContractFormModule {}
