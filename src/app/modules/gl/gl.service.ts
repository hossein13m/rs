import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModelApi, GlListServerResponse, TreeOrderType } from './gl.model';
import * as _ from 'lodash';

@Injectable()
export class GlService {
    constructor(private http: HttpClient) {}
    public glHierarchy: Array<TreeOrderType> = [
        TreeOrderType.Category,
        TreeOrderType.Group,
        TreeOrderType.General,
        TreeOrderType.Subsidiary,
        TreeOrderType.Detail,
    ];

    public getGLLevels(code, type: TreeOrderType): Observable<any> {
        const params: any = {};
        switch (type) {
            case TreeOrderType.Category:
                break;
            case TreeOrderType.Detail:
                params.ubsidiaryLedgerCode = code;
                break;
            case TreeOrderType.General:
                params.groupLedgerCode = code;
                break;
            case TreeOrderType.Group:
                params.categoryLedgerCode = code;
                break;
            case TreeOrderType.Subsidiary:
                params.generalLedgerCode = code;
                break;
        }

        return this.http.get(`/api/v1/gl/level`, { params });
    }

    public getGlGridData(params): Observable<GlListServerResponse> {
        return this.http.get<GlListServerResponse>(`/api/v1/gl/list`, { params });
    }

    public getGLChangesHistory(params): Observable<any> {
        return this.http.get<any>(`/api/v1/gl/change`, { params });
    }

    public getSuperior(gl: TreeOrderType): TreeOrderType {
        return this.glHierarchy[_.findIndex(this.glHierarchy, (order) => order.toLowerCase() === gl.toLowerCase()) - 1];
    }

    public getInferior(gl: TreeOrderType): TreeOrderType {
        return this.glHierarchy[_.findIndex(this.glHierarchy, (order) => order.toLowerCase() === gl.toLowerCase()) + 1];
    }

    public getCategoryApi(): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(`/api/v1/gl/category`);
    }

    public getGroupByCategory(categoryLedgerCode): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(`/api/v1/gl/group`, { params: { categoryLedgerCode } });
    }

    public getGeneralByGroup(groupLedgerCode): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(`/api/v1/gl/general`, { params: { groupLedgerCode } });
    }

    public getSubsidiaryByGeneral(generalLedgerCode): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(`/api/v1/gl/subsidiary`, { params: { generalLedgerCode } });
    }

    public getDetailBySubsidiary(subsidiaryLedgerCode): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(`/api/v1/gl/detail`, { params: { subsidiaryLedgerCode } });
    }

    public getChartApi(params): Observable<any> {
        return this.http.get(`/api/v1/gl/chart`, { params });
    }
}
