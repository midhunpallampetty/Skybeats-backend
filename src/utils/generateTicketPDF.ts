import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';

interface BookingData {
  passengerName: string;
  flightNumber: string;
  seatNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
}

const generateTicketPDF = (bookingData: BookingData): Buffer => {
  const doc = new PDFDocument();
  const buffers: Buffer[] = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    // This callback will be executed when the PDF document is finished
    console.log('PDF generation completed');
  });

  // Add content to the PDF
  doc.fontSize(20).text('Flight Ticket', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Passenger Name: ${bookingData.passengerName}`);
  doc.text(`Flight Number: ${bookingData.flightNumber}`);
  doc.text(`Seat Number: ${bookingData.seatNumber}`);
  doc.text(`Departure: ${bookingData.departureAirport}`);
  doc.text(`Arrival: ${bookingData.arrivalAirport}`);
  doc.text(`Departure Time: ${bookingData.departureTime}`);
  doc.text(`Arrival Time: ${bookingData.arrivalTime}`);

  doc.end();

  // Return the buffer containing the PDF data
  return Buffer.concat(buffers);
};

export default generateTicketPDF;