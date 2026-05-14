# SkyBridge Airways Web Target File List

This file documents the main pages and folders used by the SkyBridge Airways controlled web target.

The public website source files are stored in the `docs/` folder. The same content was also deployed to the internal Apache server during lab testing.

## Main Pages

| File | Purpose |
|---|---|
| `index.html` | SkyBridge Airways homepage |
| `flights.html` | Demo flights page |
| `ticket.html` | Booking form and fare selection page |
| `inbox.html` | Demo inbox page |
| `email-booking-alert.html` | Controlled email-style page used for the Edge/Copilot summarisation test |
| `soc-demo.html` | SOC demo/explanation page |
| `confirmation.html` | Payment or verification step used in the booking workflow |

## Supporting Folders

| Folder | Purpose |
|---|---|
| `assets/` | Website assets and supporting files |
| `css/` | Stylesheets used by the website |
| `js/` | JavaScript files used by the website |
| `images/` | Images used by the website |
| `downloads/` | Controlled download test folder |

## Controlled Download File

During local lab testing, the following path was used:

```text
/downloads/SkyBridge_Payment_Verification.pdf
```

This file was used only in the controlled internal Apache lab environment.

The actual EICAR test content is not included in this public repository to avoid antivirus or GitHub security alerts.

## Use Case Mapping

| Page / Path | Related Use Case |
|---|---|
| `index.html` | Comet, Opera Neon |
| `flights.html` | Opera Neon navigation |
| `ticket.html` | Comet booking workflow, Opera Neon form interaction |
| `inbox.html` | Opera Neon navigation |
| `email-booking-alert.html` | Microsoft Edge/Copilot summarisation test |
| `soc-demo.html` | Opera Neon navigation |
| `confirmation.html` | Comet payment/verification workflow |
| `/downloads/SkyBridge_Payment_Verification.pdf` | Controlled download-related test |