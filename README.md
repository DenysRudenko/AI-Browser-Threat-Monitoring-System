# AI Browser Threat Monitoring System

This repository contains supporting artefacts for my final-year project:

**AI Browser Threat Monitoring System: A SOC-Based Framework for Detection and Analysis of AI-Powered Browser Activity**

The project investigates what standard SOC telemetry can observe when an AI-assisted browser performs user-like activity in a controlled lab environment.

## Lab Overview

The lab uses:

- Splunk SIEM for central log analysis
- Sysmon for Windows endpoint process telemetry
- Suricata for network monitoring
- Velociraptor for endpoint process collection
- Apache for the controlled SkyBridge Airways web target
- Comet AI Browser as the AI-assisted browser test client

## Repository Contents

- `web-target/` - Controlled SkyBridge Airways HTML page
- `splunk-searches/` - SPL searches used for detection and correlation
- `velociraptor-artifacts/` - Notes and safe examples for Velociraptor artefacts
- `screenshots/` - Placeholder for non-sensitive screenshots

## Safety Notes

This project uses a controlled lab environment. No real payment details, real customer data, real credentials, or live external targets are used.

The EICAR antivirus test file was used only inside the lab environment and is not included in this repository.