import {JSX} from "react";
import AdminRecap from "./AdminRecap";
import {AdminBookingDetails} from "../../@types/AdminBookingDetails";


const AdminBookingDetailsPage: ({}: {}) => JSX.Element = ({}) => {
    const booking: AdminBookingDetails = {
        userFirstName: "Alice",
        userLastName: "Durand",
        itineraryName: "Circuit Japon",
        itineraryPrice: 2100.75,
        reservation: {
            reservationId: 1,
            userId: 101,
            itineraryId: 202,
            status: "CONFIRMED",
            departureDate: "2025-06-01",
            returnDate: "2025-06-15",
            totalPrice: 2400.00,
            purchaseDate: "2025-05-10",
            numberOfAdults: 2,
            numberOfKids: 1,
            type: "Standard",
        },
        options: [
            {
                id: 1,
                name: "Assurance voyage",
                description: "Protection en cas d'annulation",
                price: 120.0,
                category: "Service"
            },
            {
                id: 2,
                name: "Transfert privé",
                description: "Navette de l'aéroport à l'hôtel",
                price: 80.0,
                category: "Transport"
            }
        ]
    };


    return (
        <div>
            <AdminRecap booking={booking}/>
        </div>
    );
};

export default AdminBookingDetailsPage;
