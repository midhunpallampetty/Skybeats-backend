"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTicketEmail = exports.sendResetEmail = exports.sendOtpEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'midhunpallampetty@gmail.com',
        pass: 'acjr jvev anap xhag '
    }
});
const sendOtpEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: 'midhunpallampetty@gmail.com',
        to: email,
        subject: 'Signup Verification',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #003366; padding: 20px; text-align: center; color: #fff;">
              <img src="https://res.cloudinary.com/dgnjzuwqu/image/upload/v1722757968/logo/lc5i8p9y2jp6mjmsz9nw.png" alt="Your Logo" style="max-width: 150px; margin-bottom: 10px;">
              <h2>Welcome to SkyBeats</h2>
            </div>
            <div style="padding: 20px; text-align: center;">
              <h2 style="color: #333;">Signup Verification</h2>
              <p>Thank you for signing up with SkyBeats!</p>
              <p>Your verification code:</p>
              <h1 style="color: #003366; margin-bottom: 30px;">${otp}</h1>
              <p style="color: #666;">This code will be valid for 30 minutes. Please keep it confidential.</p>
              <p>
                Didn't request this email? 
                <a href="https://yourwebsite.com/reset-password" style="color: #003366; text-decoration: none;">Reset your password</a> 
                or contact 
                <a href="https://yourwebsite.com/support" style="color: #003366; text-decoration: none;">customer support</a>.
              </p>
            </div>
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
              <p style="color: #888;">This is an automated message, please do not reply.</p>
              <div style="margin: 20px 0;">
                <a href="https://yourwebsite.com/anti-phishing" style="color: #003366; text-decoration: none;">Secure your account here</a>
              </div>
              <p style="font-size: 12px; color: #999;">
                Please be cautious with your account details and stay vigilant against phishing attacks. 
                <a href="https://yourwebsite.com/terms" style="color: #003366;">Terms of Use</a> | 
                <a href="https://yourwebsite.com/privacy-policy" style="color: #003366;">Privacy Policy</a>
              </p>
              <p style="font-size: 12px; color: #999;">
                © 2024 SkyBeats.com, All Rights Reserved. You received this email because you signed up on 
                <a href="https://yourwebsite.com" style="color: #003366;">SkyBeats.com</a>.
              </p>
            </div>
          </div>
        `,
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log("OTP email send successfully");
    }
    catch (error) {
        console.log('Error sending otp', error);
        throw new Error(`Error while sending otp's`);
    }
});
exports.sendOtpEmail = sendOtpEmail;
const sendResetEmail = (email, resetUrl) => __awaiter(void 0, void 0, void 0, function* () {
    yield transporter.sendMail({
        to: email,
        from: 'midhunpallampetty@gmail.com',
        subject: 'Password Reset Request',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
  <div style="background-color: #003366; padding: 20px; text-align: center; color: #fff;">
    <img src="https://res.cloudinary.com/dgnjzuwqu/image/upload/v1722757968/logo/lc5i8p9y2jp6mjmsz9nw.png" alt="Your Logo" style="max-width: 150px; margin-bottom: 10px;">
    <h2>Password Reset Request</h2>
  </div>
  <div style="padding: 20px; text-align: center;">
    <h2 style="color: #333;">Reset Your Password</h2>
    <p>We received a request to reset your password for your SkyBeats account.</p>
    <p>Please click the button below to reset your password:</p>
    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #003366; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p style="color: #666;">If you did not request a password reset, please ignore this email. This link will expire in 30 minutes.</p>
    <p>
      Need more help? Contact our <a href="https://yourwebsite.com/support" style="color: #003366; text-decoration: none;">customer support</a>.
    </p>
  </div>
  <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
    <p style="color: #888;">This is an automated message, please do not reply.</p>
    <div style="margin: 20px 0;">
      <a href="https://yourwebsite.com/anti-phishing" style="color: #003366; text-decoration: none;">Secure your account here</a>
    </div>
    <p style="font-size: 12px; color: #999;">
      Please be cautious with your account details and stay vigilant against phishing attacks. 
      <a href="https://yourwebsite.com/terms" style="color: #003366;">Terms of Use</a> | 
      <a href="https://yourwebsite.com/privacy-policy" style="color: #003366;">Privacy Policy</a>
    </p>
    <p style="font-size: 12px; color: #999;">
      © 2024 SkyBeats.com, All Rights Reserved. You received this email because you signed up on 
      <a href="https://yourwebsite.com" style="color: #003366;">SkyBeats.com</a>.
    </p>
  </div>
</div>

    `,
    });
});
exports.sendResetEmail = sendResetEmail;
const sendTicketEmail = (email, passengerName, flightNumber, departureAirport, arrivalAirport, departureTime, arrivalTime, FarePaid, ticketUrls) => __awaiter(void 0, void 0, void 0, function* () {
    const attachments = ticketUrls.map((url, index) => ({
        filename: `Ticket-${index + 1}.pdf`,
        path: url,
        contentType: 'application/pdf'
    }));
    const mailOptions = {
        to: email,
        from: 'midhunpallampetty@gmail.com',
        subject: 'Your Flight Ticket - Booking Confirmation',
        attachments: attachments,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #003366; padding: 20px; text-align: center; color: #fff;">
          <img src="https://res.cloudinary.com/dgnjzuwqu/image/upload/v1722757968/logo/lc5i8p9y2jp6mjmsz9nw.png" alt="Your Logo" style="max-width: 150px; margin-bottom: 10px;">
          <h2>Flight Booking Confirmation</h2>
        </div>
        <div style="padding: 20px;">
          <h3 style="color: #333;">Dear User,</h3>
          <p>Thank you for booking your flight with SkyBeats. Below are your flight details:</p>
          <div style="background-color: #f5f5f5; padding: 10px; margin: 20px 0; border-radius: 5px;">
            <h4 style="color: #003366; text-align: center;">Flight Details</h4>
            <p><strong>Flight Number:</strong> ${flightNumber}</p>
            <p><strong>Departure:</strong> ${departureAirport}</p>
            <p><strong>Arrival:</strong> ${arrivalAirport}</p>
            <p><strong>Departure Time:</strong> ${departureTime}</p>
            <p><strong>Arrival Time:</strong> ${arrivalTime}</p>
            <p><strong>Total Fare:</strong> ${FarePaid}</p>
          </div>
          <p>We wish you a pleasant flight! Please keep this email as your ticket and reference for your travel.</p>
          <div style="text-align: center; margin: 20px 0;">
            ${ticketUrls.map((url, index) => `<a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #003366; color: #fff; text-decoration: none; border-radius: 5px; margin: 10px;">Download E-Ticket ${index + 1}</a>`).join('')}
          </div>
          <p style="color: #666; text-align: center;">If you have any questions, please contact our <a href="https://yourwebsite.com/support" style="color: #003366; text-decoration: none;">customer support</a>.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
          <p style="color: #888;">This is an automated message, please do not reply.</p>
          <div style="margin: 20px 0;">
            <a href="https://yourwebsite.com/anti-phishing" style="color: #003366; text-decoration: none;">Secure your account here</a>
          </div>
          <p style="font-size: 12px; color: #999;">
            Please be cautious with your account details and stay vigilant against phishing attacks. 
            <a href="https://yourwebsite.com/terms" style="color: #003366;">Terms of Use</a> | 
            <a href="https://yourwebsite.com/privacy-policy" style="color: #003366;">Privacy Policy</a>
          </p>
          <p style="font-size: 12px; color: #999;">
            © 2024 SkyBeats.com, All Rights Reserved. You received this email because you booked a flight on 
            <a href="https://yourwebsite.com" style="color: #003366;">SkyBeats.com</a>.
          </p>
        </div>
      </div>
    `,
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log('Email with multiple tickets sent successfully');
    }
    catch (error) {
        console.log('Error while sending email with multiple tickets:', error);
    }
});
exports.sendTicketEmail = sendTicketEmail;
