import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContractType } from '../../contract-type/contract-type.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '#services/alert.service';
import { ContractService } from '../contract.service';
import { ContractTypeService } from '../../contract-type/contract-type.service';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { FlowService } from '../../flow/flow.service';
import { Contract, Customer } from '../contract.model';
import { Flow } from '../../flow/flow.model';
import { StateType } from '#shared/state-type.enum';

@Component({
    selector: 'app-contract-dialog',
    templateUrl: './contract-dialog.component.html',
    styleUrls: ['./contract-dialog.component.scss'],
})
export class ContractDialogComponent implements OnInit {
    private activeOrganizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');
    public stateType: StateType = StateType.INIT;
    public isEditMode: boolean = false;
    public title: string = 'افزودن قرارداد';
    public contractTypes: Array<ContractType>;
    public customers: Array<Customer>;
    public flows: Array<Flow> = [];
    public contracts: Array<Contract>;
    public pagination = { skip: 0, limit: 100, total: 100 };
    public contractCategories: Array<{ name: string; id: number }> = [
        { name: 'قرارداد', id: 1 },
        { name: 'الحاقیه', id: 2 },
        { name: 'متمم', id: 3 },
    ];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ContractType,
        private fb: FormBuilder,
        private contractService: ContractService,
        private contractTypeService: ContractTypeService,
        private alertService: AlertService,
        private flowService: FlowService,
        public dialog: MatDialogRef<ContractDialogComponent>
    ) {}

    public form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        organization: [this.activeOrganizationCode, Validators.required],
        customer: [null, Validators.required],
        category: [1, Validators.required],
        code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
        parentId: [],
        contractType: [null, Validators.required],
        flow: ['', Validators.required],
    });

    ngOnInit(): void {
        this.checkForEditMode();
        this.getData().then(() => (this.stateType = StateType.PRESENT));
        this.form.get('contractType').valueChanges.subscribe(() => this.getFlows());
    }

    private async getData(): Promise<any> {
        this.getContractTypes();
        this.getCustomers();
        this.getContracts();
    }

    private checkForEditMode(): void {
        this.isEditMode = !!this.data;
        this.isEditMode ? (this.title = 'ویرایش قرارداد') : (this.title = 'افزودن قرارداد');
        if (this.isEditMode) this.setDataForEditMode();
    }

    private setDataForEditMode(): void {}

    private getContractTypes(): void {
        this.contractTypeService
            .getContractTypes({ ...this.pagination, organization: this.activeOrganizationCode })
            .subscribe((response) => (this.contractTypes = response.items));
    }

    private getContracts(): void {
        this.contractService.getContractsList().subscribe((response) => (this.contracts = response.items));
    }

    private getFlows(): void {
        this.flowService
            .getFlows({ ...this.pagination, organization: this.activeOrganizationCode, contractTypes: [this.form.get('contractType').value] })
            .subscribe(
                (response) => (this.flows = response.items),
                () => this.alertService.onError('مشکلی پیش آمده‌است')
            );
    }

    private getCustomers(): void {
        this.contractService.getCustomers().subscribe((response) => (this.customers = response.items));
    }

    public submitForm(): void {
        if (!this.isParentContractNecessary()) {
            this.form.removeControl('parentId');
        }
        this.contractService.createNewContract(this.form.value).subscribe(
            () => this.dialog.close(true),
            () => this.alertService.onError('مشکلی پیش آمده‌است')
        );
    }

    public isParentContractNecessary(): boolean {
        return this.form.get('category').value === 2 || this.form.get('category').value === 3;
    }
}
