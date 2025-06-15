export interface Booking {
    userId: number;
    itineraryId: number;
    status: string;
    departureDate: string;
    returnDate: string;
    numberOfAdults: number
    numberOfKids: number;
    optionIds: number[];
    excludedCountries: string[];

    lastName: string;
    firstName: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    address: string;
    addressDetails: string;
    postalCode: string;
    city: string;
    country: string;
    agreedToTerms: boolean;
}

