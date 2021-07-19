export interface UserRole {
    organizationId: number;
    organizationCode: number;
    personnelCode: string;
    units: Array<number>;
    roles: Array<number>;
}

export interface User {
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
    nationalCode: string;
    birthDate: string;
    id: number;
    status: string;
    userRoles: Array<UserRole>;
}

export interface Organization {
    name: string;
    dbHost: string;
    dbPort: string;
    dbUsername: string;
    dbPassword: string;
    dbName: string;
    logo: string;
    id: number;
    code: number;
}

export interface Units {
    id: number;
    name: string;
    parent: number;
    organization: number;
    deletedAt: string;
    children: Array<Units>;
    mappings: Array<{ childId: number; id: number; name: string }>;
}

export interface Roles {
    id: number;
    name: string;
    parent: number;
    organization: number;
    deletedAt: string;
}
