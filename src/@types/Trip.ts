export interface Trip {
    id: number;
    name: string;
    description: string;
    shortDescription: string;
    price: number;
    duration: number;
    status?: string;
    purchaseDate?: string;
}