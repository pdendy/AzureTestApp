export interface Plan {
    id?: string;
    accountId: string;
    name: string;
    deviceCount?: number;
    deviceLimit: number;
    price: number;
}
