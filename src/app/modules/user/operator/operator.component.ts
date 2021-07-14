import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { ResponseOperatorItemDto } from 'app/services/API/models';
import { OperatorManagementService } from 'app/services/App/user/operator-management.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AddOperatorComponent } from './add-operator/add-operator.component';
import { Column } from '#shared/components/table/table.model';

@Component({
    selector: 'app-operator',
    templateUrl: './operator.component.html',
    styleUrls: ['./operator.component.scss'],
    animations: fuseAnimations,
})
export class OperatorComponent implements OnInit, AfterViewInit {
    operators: ResponseOperatorItemDto[] = [];
    searchInput: FormControl;
    dialogRef: any;
    loading = false;
    dataSource: Array<ResponseOperatorItemDto>;
    column: Array<Column>;
    @ViewChild('status') statusRef: TemplateRef<any>;

    constructor(private operatorService: OperatorManagementService, private _matDialog: MatDialog) {
        this.searchInput = new FormControl('');
    }

    ngOnInit(): void {
        this.operatorService.operators
            .pipe(
                map((response) => {
                    return response.map((operator) => {
                        return { ...operator, status: operator.mobileNumber };
                    });
                })
            )
            .subscribe((res) => {
                this.operators = res;
                this.dataSource = res;
            });

        this.operatorService.getOperators(this.searchInput.value).subscribe(() => {
            // loading
        });

        this.searchInput.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe((searchText) => this.operatorService.getOperators(searchText).subscribe(() => {}));
    }

    initColumns(): void {
        this.column = [
            { id: 'index', type: 'index' },
            {
                id: 'firstName',
                name: 'نام',
                type: 'string',
            },
            {
                id: 'lastName',
                name: 'نام خانوادگی',
                type: 'string',
            },
            {
                id: 'email',
                name: 'پست الکترونیک',
                type: 'string',
            },
            {
                id: 'mobileNumber',
                name: 'تلفن همراه',
                type: 'string',
            },
            {
                id: 'userName',
                name: 'نام کاربری',
                type: 'string',
            },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    { name: 'ویرایش', icon: 'template', content: this.statusRef, color: 'accent' },
                    { name: 'ویرایش', icon: 'create', color: 'accent', operation: ({ row }: any) => this.editOperator(row) },
                ],
            },
        ];
    }

    ngAfterViewInit(): void {
        document.getElementById('table-container').addEventListener('scroll', this.scroll.bind(this), true);
        // document.addEventListener('scroll', this.scroll, true); //third parameter
        this.initColumns();
    }

    scroll(): void {
        const table = document.getElementById('table-container');
        const scrollPosition = table.scrollHeight - (table.scrollTop + table.clientHeight);

        if (!this.loading) {
            if (scrollPosition < 50) {
                this.loading = true;
                this.operatorService.getOperators(this.searchInput.value).subscribe(() => (this.loading = false));
            }
        } else return;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * New operator
     */
    newOperator(): void {
        this.dialogRef = this._matDialog.open(AddOperatorComponent, { data: { action: 'new' } });

        // this.dialogRef.afterClosed().subscribe((response) => {});
    }

    /**
     * Edit operator
     *
     * @param operator
     */
    editOperator(operator): void {
        this.dialogRef = this._matDialog.open(AddOperatorComponent, { data: { operator: operator, action: 'edit' } });

        // this.dialogRef.afterClosed().subscribe(response => {});
    }
}
