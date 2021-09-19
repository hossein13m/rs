export interface ContractForm {
    name: string;
    sections: Array<any>;
    organization: number;
}

export interface ContractFormList {
    name: string;
    sections: Array<any>;
    organization: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
}
