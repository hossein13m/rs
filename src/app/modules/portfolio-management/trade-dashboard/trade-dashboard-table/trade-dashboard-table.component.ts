import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TradeDashboardTableService } from './trade-dashboard-table.service';
import { StateType } from '#shared/state-type.enum';

@Component({
    selector: 'app-trade-dashboard-table',
    templateUrl: 'trade-dashboard-table.component.html',
    styleUrls: ['./trade-dashboard-table.component.scss'],
    providers: [TradeDashboardTableService],
})
export class TradeDashboardTableComponent implements OnInit, OnChanges {
    @Input() date: Date;
    data: Array<any>;
    columns: Array<any>;
    form: FormGroup;
    stateType: StateType = StateType.LOADING;

    constructor(private tradeDashboardTableService: TradeDashboardTableService) {}

    ngOnInit(): void {
        this.initializeTableColumns();
        this.getTradeDashboardTable();
    }

    private initializeTableColumns() {
        this.columns = [
            { name: 'ارزش دارایی‌های تمدن', id: 'totalAssets', type: 'price', headerAlign: 'center', dataAlign: 'center' },
            { name: 'سهام', id: 'stock', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'صکوک', id: 'sukuk', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'سلف', id: 'forward', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'مشارکت', id: 'bond', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'شاخص آتی', id: 'indexFuture', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'ETF', id: 'etf', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'حق تقدم', id: 'right', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'اسناد خزانه', id: 'treasury', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'وجه نقد', id: 'cash', type: 'number', headerAlign: 'center', dataAlign: 'center' },
        ];
    }

    ngOnChanges() {
        this.getTradeDashboardTable();
    }

    getTradeDashboardTable(): void {
        this.stateType = StateType.LOADING;
        this.data = null;
        this.tradeDashboardTableService.getTradeDashboardTable(formatDate(new Date(this.date), 'yyyy-MM-dd', 'en_US')).subscribe(
            (response) => {
                this.data = [response];
                this.stateType = StateType.PRESENT;
            },
            () => (this.stateType = StateType.FAIL)
        );
    }
}
