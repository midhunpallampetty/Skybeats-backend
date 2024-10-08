export interface BookingInput {
    passengerName: string;
    email: string;
    phoneNumber: string;
    departureAirport: string;
    arrivalAirport: string;
    stop: string;
    flightNumber: string;
    flightDuration: string;
    departureTime: string;
    arrivalTime: string;
    totalPassengers: number;
    FarePaid: number;
    ticketUrl:string;
    seatNumber:string;
    flightModel:string;
  }