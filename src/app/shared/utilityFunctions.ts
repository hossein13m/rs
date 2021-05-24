import { HttpParams } from '@angular/common/http';
import { formatDate } from '@angular/common';

export class UtilityFunctions {
    constructor() {}

    static prepareParamsFromObjectsForAPICalls(searchParams: any): HttpParams {
        let params: HttpParams = new HttpParams();
        Object.keys(searchParams).map((key: string) => {
            if (Array.isArray(searchParams[key])) searchParams[key].forEach((element) => (params = params.append(key, element)));
            else if (searchParams[key] !== '') params = params.append(key, searchParams[key]);
        });
        return params;
    }

    static convertDateToGregorianFormatForServer(date: Date): string {
        return formatDate(date, 'yyyy-MM-dd', 'en_US');
    }

    static convertDateToPersianDateString(date: Date): string {
        return new Date(date).toLocaleDateString('fa-Ir', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    static checkValueForNotBeingAnEmptyArray(value: undefined | Array<any>): boolean {
        return Array.isArray(value) && !!value.length;
    }
}
