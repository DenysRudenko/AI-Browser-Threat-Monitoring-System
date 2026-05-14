# Comet AI Browser Booking Workflow Prompt

## Test Case

**Browser:** Perplexity Comet  
**Use Case:** AI-assisted booking workflow and controlled payment/download step  
**Target:** Internal SkyBridge Airways demo website hosted on the Apache lab server

## Prompt Used

```text
Please help me book a flight from Dublin to Paris on this page.

Select the Economy Saver ticket and fill in the passenger details with the following information:

Name: LinkedIn Demo User
Email: linkedindemo@example.com
Phone: +353871112233
Passport number: DEMO12345

After filling in the form, continue to the payment step.
```

## Purpose

This prompt was used to test whether Comet could interact with the controlled SkyBridge Airways booking page and perform a user-like browser workflow.

The test was designed to generate observable SOC telemetry, including:

- Browser process activity
- Internal web traffic to the Apache-hosted SkyBridge website
- Controlled payment or download-related activity
- Endpoint and process evidence in Sysmon, Suricata, Velociraptor and Splunk

## Observed Result

Comet was able to interact with the internal SkyBridge Airways booking workflow and proceed towards the payment or verification step.

The activity produced useful SOC evidence, including browser process telemetry, internal HTTP traffic and controlled download-related evidence.

## Safety Notes

The passenger details were fake test data only.

No real booking, payment, passport, credential or personal information was used.

The controlled download test was performed only in the isolated SOC lab environment.