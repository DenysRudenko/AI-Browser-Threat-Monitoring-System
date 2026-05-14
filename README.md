# AI Browser Threat Monitoring System

This repository contains the practical artefacts for the final year project:

**AI Browser Threat Monitoring System: A SOC-Based Framework for Detection and Analysis of AI-Powered Browser Activity**

The project investigates what a Security Operations Centre (SOC) can observe when AI-assisted browsers perform user-like activity. The lab uses Splunk, Sysmon, Suricata and Velociraptor to collect and correlate endpoint, network and process telemetry.

## Project Aim

The aim of this project was to evaluate how standard SOC telemetry can be used to detect and analyse observable activity produced by AI-assisted browser workflows.

The project focuses on observable evidence such as:

- Browser process execution
- Endpoint process telemetry
- Parent-child process relationships
- Internal web traffic
- HTTP page requests
- Controlled download-related evidence
- Cross-source correlation in Splunk

The project does not attempt to exploit real systems or access the internal reasoning of AI assistants.

## Repository Structure

```text
AI-BROWSER-THREAT-MONITORING-SYSTEM/
│
├── docs/
│   └── Public GitHub Pages version of the SkyBridge Airways demo website
│
├── screenshots/
│   └── Selected implementation and testing screenshots
│
├── splunk-searches/
│   ├── saved-searches/
│   └── dashboards/
│
├── sysmon/
│   └── Sysmon configuration and installation notes
│
├── test-prompts/
│   └── Controlled AI browser test prompts
│
├── velociraptor-artifacts/
│   ├── Custom Velociraptor artifacts
│   └── Hunt documentation
│
├── web-target/
│   └── Internal Apache deployment notes for the SkyBridge web target
│
├── .gitignore
└── README.md
```

## Main Use Cases

| Use Case | Browser / Assistant | Summary |
|---|---|---|
| UC1 | Perplexity Comet | Internal SkyBridge booking workflow and controlled payment/download step |
| UC2 | Opera Neon | Public GitHub Pages navigation and form interaction test |
| UC3 | Microsoft Edge/Copilot | Controlled email-style summarisation influenced by visible instruction-style content |

## SOC Lab Environment

| System | Role | Lab IP |
|---|---|---|
| Splunk Server | SIEM and central search platform | `192.168.56.10` |
| Windows Endpoint | AI browser testing, Sysmon and Velociraptor agent | `192.168.56.20` |
| Suricata Sensor / Apache Server | Network monitoring and internal SkyBridge web target | `192.168.56.30` |
| Velociraptor Server | Endpoint collection and process investigation | `192.168.56.40` |

## Tools Used

| Tool | Purpose |
|---|---|
| Splunk | SIEM, searching, reporting, dashboarding and correlation |
| Sysmon | Windows endpoint process telemetry |
| Suricata | Network and HTTP telemetry |
| Velociraptor | Endpoint process collection and process-tree evidence |
| Apache | Internal hosting of the SkyBridge Airways web target |
| GitHub Pages | Public hosting for browser assistant testing |
| Perplexity Comet | AI-assisted browser workflow testing |
| Opera Neon | AI-assisted navigation and form interaction testing |
| Microsoft Edge/Copilot | Email-style page summarisation testing |

## Main Telemetry Sources

| Source | Splunk Sourcetype | Purpose |
|---|---|---|
| Sysmon | `XmlWinEventLog:Microsoft-Windows-Sysmon/Operational` | Endpoint process creation evidence |
| Suricata | `suricata:eve` | Network and HTTP visibility |
| Velociraptor Pslist | `velociraptor:pslist` | Process list evidence |
| Velociraptor Pstree | `velociraptor:pstree` | Process-tree evidence |
| Velociraptor ParentProcess | `velociraptor:parentprocess` | Parent-child process investigation |

## Splunk Searches and Dashboard

The `splunk-searches/` folder contains the saved SPL searches and dashboard files used in the project.

| Search | Purpose |
|---|---|
| `T1_Sysmon_Process_Extraction.spl` | Extracts Sysmon process creation evidence |
| `T2_Suricata_HTTP_Traffic.spl` | Shows Suricata HTTP traffic between the Windows endpoint and Apache web target |
| `T3_Velociraptor_Pslist.spl` | Displays Velociraptor process list evidence |
| `T4_Velociraptor_Pstree.spl` | Displays Velociraptor process-tree evidence |
| `T5_Browser_Suspicious_Activity.spl` | Searches for AI browser activity and suspicious process indicators |
| `T6_Correlation_View.spl` | Combines endpoint, network and process evidence into one investigation view |

The dashboard is stored as a Splunk Classic Dashboard XML file:

```text
splunk-searches/dashboards/AI_Browser_Threat_Monitoring_Overview.xml
```

A readable breakdown of the dashboard panel searches is also included:

```text
splunk-searches/dashboards/dashboard-panel-searches.md
```

## Velociraptor Artifacts

The `velociraptor-artifacts/` folder contains custom Velociraptor artifacts used to forward endpoint process evidence to Splunk through HTTP Event Collector.

The custom artifacts support:

- Manual process list upload
- Automatic `Windows.System.Pslist` forwarding
- Automatic `Generic.System.Pstree` forwarding
- Automatic `Windows.Attack.ParentProcess` forwarding

The folder also includes hunt documentation for the AI Browser Detection hunt, which used:

```text
Windows.System.Pslist
Generic.System.Pstree
Windows.Attack.ParentProcess
```

## Sysmon Configuration

The `sysmon/` folder contains the Sysmon configuration and installation notes used on the Windows endpoint.

Sysmon was used mainly for process creation evidence, including:

- Browser execution
- Command-line visibility
- Parent process information
- Suspicious process indicators

The Sysmon configuration used in the lab was based on the public SwiftOnSecurity Sysmon configuration.

## Web Target

The SkyBridge Airways website was created as a controlled web target for the project.

Two versions were used:

| Version | Purpose |
|---|---|
| Internal Apache version | Used for Comet testing and Suricata visibility |
| GitHub Pages version | Used for Opera Neon and Edge/Copilot testing |

The internal Apache version allowed the SOC lab to observe traffic from the Windows endpoint to the web target.

The public GitHub Pages website files are stored in the `docs/` folder.

## Test Prompts

The `test-prompts/` folder contains the controlled AI browser prompts used during testing.

These include:

- Comet booking workflow prompt
- Opera Neon navigation and form interaction prompt
- Edge/Copilot email-style summarisation prompt

All prompts used fake test data only.

## Safety Notice

This repository is for academic and defensive research purposes only.

The project used controlled test content and fake data only. It does not include:

- Real credentials
- Real payment information
- Real passenger data
- Real customer data
- Phishing infrastructure
- Malware
- Private keys
- Splunk HEC tokens
- API keys
- Velociraptor secrets

The EICAR test content used during local lab testing is not included in this public repository.

## Key Limitation

The SOC telemetry in this project can show observable consequences of AI-assisted browser activity, such as process execution, HTTP traffic and controlled download-related evidence.

It cannot show the internal reasoning, prompt context, page interpretation or decision-making process of the AI assistant.

## Author

Denys Rudenko  
BSc (Honours) in Computing in Digital Forensics and Cyber Security  
Technological University Dublin  
2026