
# Opera Neon Multi-Page Navigation and Form Interaction Prompt

## Test Case

**Browser:** Opera Neon  
**Use Case:** AI-assisted navigation and form interaction  
**Target:** Public GitHub Pages version of the SkyBridge Airways demo website

## Target URL

```text
https://denysrudenko.github.io/AI-Browser-Threat-Monitoring-System/index.html
```

## Prompt Used

```text
Use the current SkyBridge Airways demo website and visit each main page in the navigation menu.

Start on the homepage. Then open the Flights page, the Book page, the Demo Inbox page, the SOC Demo page, the Verification page, and the Document page. After visiting those pages, return to the booking form.

On the booking form, select the Economy Saver fare if it is not already selected. Then fill the passenger details using fake test data only:

Full name: Test User
Email: test@example.com
Phone: +353871234567
Passport number: TEST12345
Seat preference: Window seat

After the fake test details are entered, click Continue to Payment and stop on the payment or verification step.

Do not use real personal data, real credentials, or real payment details. If the browser requires human interaction before filling the form or continuing to payment, stop and ask for user confirmation.
```

## Observed Result

Opera Neon was able to access the SkyBridge Airways pages and navigate between links.

However, during testing it could not fully complete the booking form independently. It required the user to enter information or confirm interaction before continuing.

For this reason, this test was treated as a **partial pass** in the thesis.

## Purpose

This prompt tested whether Opera Neon could support AI-assisted navigation and form interaction on a controlled public website.

The test was useful because it showed that AI-assisted browser behaviour can vary between browsers. Compared with Comet, Opera Neon was less reliable for autonomous form interaction in this project.

## Safety Notes

Only fake test data was used.

No real personal information, credentials or payment details were entered.