export interface Trip {
    id: number;
    name: string;
    description: string;
    shortDescription: string;
    price: number;
    totalDuration: number;
    status?: string;
    purchaseDate?: string;
    themeName?: string;
}