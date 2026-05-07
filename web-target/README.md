# SkyBridge Airways Controlled Web Target

This folder contains a small controlled demo website used for the AI Browser Threat Monitoring System project.

## Use cases

1. **Booking form completion**  
   `ticket.html` allows an AI-assisted browser to select a fare and fill fake passenger details.

2. **Multi-page navigation**  
   `index.html` -> `flights.html` -> `ticket.html` allows the browser assistant to move through several pages.

3. **Fake email action flow**  
   `inbox.html` -> `email-booking-alert.html` -> `ticket.html` simulates a safe message-to-browser workflow.

## Safety

This is a controlled lab website. It does not process real bookings, real payments, real credentials or personal data.

The actual EICAR test file is **not** included in this repository. It should only be created on the internal Apache server during controlled lab testing.
