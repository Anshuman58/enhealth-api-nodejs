export interface Address {
    addressLine1: string;
    addressLine2?: string;
    landmark?: string;
    city: string;
    state: string;
    pinCode: string;
    coordinates?: Array<number>;
}
