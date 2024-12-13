"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfkit_1 = __importDefault(require("pdfkit"));
const buffer_1 = require("buffer");
const generateTicketPDF = (bookingData) => {
    const doc = new pdfkit_1.default();
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        console.log('PDF generation completed');
    });
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
    return buffer_1.Buffer.concat(buffers);
};
exports.default = generateTicketPDF;
