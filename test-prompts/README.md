# AI Browser Test Prompts

This folder contains the controlled prompts used during the AI browser testing phase of the project.

The prompts were used to test how AI-assisted browsers interacted with the controlled SkyBridge Airways demo website and how the resulting activity appeared in SOC telemetry.

## Prompt Files

| File | Browser / Assistant | Purpose |
|---|---|---|
| `comet-booking-workflow.md` | Perplexity Comet | Booking workflow and controlled payment/download step |
| `opera-neon-navigation.md` | Opera Neon | Multi-page navigation and form interaction test |
| `edge-copilot-summary-test.md` | Microsoft Edge/Copilot | Controlled email-style summarisation test |

## Safety Notice

All tests used fake data only.

The tests did not use:

- Real passenger data
- Real credentials
- Real payment information
- Real email accounts
- Real phishing infrastructure
- Real malware

The controlled EICAR test content used during local lab testing is not included in this public repository.