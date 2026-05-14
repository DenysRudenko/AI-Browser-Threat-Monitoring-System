# Splunk Searches and Dashboard

This folder contains the Splunk search logic used in the **AI Browser Threat Monitoring System** project.

The searches were created to support SOC-style monitoring of AI-assisted browser activity using endpoint, network and process telemetry. They are used in the thesis to show what can be observed when AI-assisted browsers interact with controlled web content.

## Folder Structure

```text
splunk-searches/
│
├── saved-searches/
│   ├── T1_Sysmon_Process_Extraction.spl
│   ├── T2_Suricata_HTTP_Traffic.spl
│   ├── T3_Velociraptor_Pslist.spl
│   ├── T4_Velociraptor_Pstree.spl
│   ├── T5_Browser_Suspicious_Activity.spl
│   └── T6_Correlation_View.spl
│
├── dashboards/
│   ├── AI_Browser_Threat_Monitoring_Overview.xml
│   └── dashboard-panel-searches.md
│
└── README.md
```

## Purpose

The SPL searches are designed to collect and correlate evidence from the main telemetry sources used in the SOC lab:

- **Sysmon** for endpoint process creation evidence.
- **Suricata** for network and HTTP traffic visibility.
- **Velociraptor** for process list and process-tree evidence.
- **Splunk** as the central SIEM platform for searching, correlation and dashboarding.

The searches support the project’s main research question:

> To what extent can standard SOC telemetry from Sysmon, Suricata, Velociraptor and Splunk be used to detect and correlate observable activity produced by AI-assisted browser workflows?

## Lab Environment

The searches are based on the controlled lab environment used during testing.

| System | Role | Lab IP |
|---|---|---|
| Windows Endpoint | AI browser testing, Sysmon, Velociraptor agent | `192.168.56.20` |
| Suricata Sensor / Apache Server | Network monitoring and internal SkyBridge web target | `192.168.56.30` |
| Splunk Server | SIEM and central log analysis | `192.168.56.10` |
| Velociraptor Server | Endpoint process collection and forwarding | `192.168.56.40` |

## Main Sourcetypes

The following Splunk sourcetypes are used by the searches:

| Sourcetype | Description |
|---|---|
| `XmlWinEventLog:Microsoft-Windows-Sysmon/Operational` | Sysmon endpoint telemetry |
| `suricata:eve` | Suricata EVE JSON network events |
| `velociraptor:pslist` | Velociraptor process list evidence |
| `velociraptor:pstree` | Velociraptor process-tree evidence |

## Saved Searches

### T1: Sysmon Process Extraction

**File:** `saved-searches/T1_Sysmon_Process_Extraction.spl`

This search validates that Sysmon process creation events are being ingested into Splunk. It extracts important Sysmon fields from the raw XML event data, including:

- Event ID
- Computer name
- Image
- Parent image
- Command line
- Parent command line
- User

The search was initially tested using simple commands such as:

- `notepad.exe`
- `whoami.exe`
- `hostname.exe`

This search supports the basic endpoint telemetry validation stage of the project.

---

### T2: Suricata HTTP Traffic

**File:** `saved-searches/T2_Suricata_HTTP_Traffic.spl`

This search confirms that Suricata can observe HTTP traffic between the Windows endpoint and the internal Apache web target.

It focuses on traffic from:

```text
192.168.56.20 -> 192.168.56.30
```

The search displays useful HTTP fields such as:

- Source IP and port
- Destination IP and port
- Protocol
- HTTP hostname
- HTTP URL
- HTTP user agent

This search was important because it confirmed that the internal Apache/SkyBridge traffic was visible to Suricata and searchable in Splunk.

---

### T3: Velociraptor Pslist

**File:** `saved-searches/T3_Velociraptor_Pslist.spl`

This search displays process list evidence collected from the Windows endpoint using Velociraptor.

It shows fields such as:

- Process name
- PID
- PPID
- Username
- Command line
- Executable path

This search supports endpoint process validation and confirms that Velociraptor telemetry is being forwarded into Splunk.

---

### T4: Velociraptor Pstree

**File:** `saved-searches/T4_Velociraptor_Pstree.spl`

This search displays process-tree evidence collected from the Windows endpoint.

It is used to investigate parent-child process relationships and browser-spawned process activity. This is useful for checking whether AI-assisted browsers or browser workflows are associated with suspicious child processes such as:

- PowerShell
- CMD
- Python
- Node.js

This search supports the browser-spawned process investigation section of the thesis.

---

### T5: Browser Suspicious Activity

**File:** `saved-searches/T5_Browser_Suspicious_Activity.spl`

This is the main broad detection and investigation search for browser-related activity.

It searches across multiple telemetry sources for indicators related to:

- Comet AI Browser
- Perplexity
- Opera Neon
- Microsoft Edge
- Chrome
- Headless browser flags
- Browser automation frameworks
- PowerShell
- CMD
- Python
- Node.js
- SkyBridge web traffic
- GitHub Pages workflow activity
- Controlled download evidence

The search classifies results into evidence categories such as:

- Sysmon
- Suricata
- Velociraptor Pslist
- Velociraptor Pstree
- Other

It also labels events using the `BrowserOrIndicator` field, for example:

- `Comet AI Browser`
- `Opera Neon`
- `Microsoft Edge`
- `Headless Browser Indicator`
- `Browser Automation Indicator`
- `PowerShell Indicator`
- `SkyBridge Web Traffic`
- `GitHub Pages Browser Workflow`

This search is used heavily in the testing and evaluation chapter because it gives a single view of browser-related and suspicious activity across the lab telemetry.

---

### T6: Correlation View

**File:** `saved-searches/T6_Correlation_View.spl`

This search combines evidence from multiple sources into one correlation view.

It uses:

- Sysmon endpoint process telemetry
- Suricata network traffic
- Velociraptor process-tree evidence

The search is designed to support investigation rather than prove direct causality. It helps place related endpoint, network and process events into a single timeline.

This is useful for answering questions such as:

- Was browser-related process activity visible on the endpoint?
- Was there HTTP traffic from the Windows endpoint to the SkyBridge web target?
- Was process-tree evidence available from Velociraptor?
- Could the different telemetry sources be reviewed together in Splunk?

## Dashboard

The dashboard is stored in:

```text
dashboards/AI_Browser_Threat_Monitoring_Overview.xml
```

This is a Splunk Classic Dashboard XML file.

A readable breakdown of the dashboard panel searches is stored in:

```text
dashboards/dashboard-panel-searches.md
```

The dashboard provides a high-level SOC view of:

- Telemetry source summary
- Evidence source distribution
- SkyBridge internal web traffic
- Controlled download and EICAR evidence
- AI browser process activity
- Suspicious browser-related indicators
- Velociraptor process evidence
- Correlation timeline

The dashboard is used as a demonstration and presentation layer. The main technical work is still represented by the saved SPL searches and the underlying telemetry pipeline.

## Relationship to Thesis Test Cases

| Search | Main Purpose | Related Test Cases |
|---|---|---|
| T1 | Validate Sysmon process ingestion | TC1 |
| T2 | Validate Suricata HTTP visibility | TC2 |
| T3 | Validate Velociraptor process collection | TC3, TC4 |
| T4 | Validate process-tree evidence | TC3, TC4, TC9 |
| T5 | Detect browser-related and suspicious indicators | TC5, TC6, TC7, TC8, TC9 |
| T6 | Correlate endpoint, network and process evidence | TC10 |

## How to Use

The searches can be copied directly into Splunk Search.

Recommended process:

1. Open Splunk Search.
2. Paste the SPL query from the relevant `.spl` file.
3. Adjust the time range if required.
4. Run the search.
5. Save it as a report using the same T1-T6 naming convention.

Example naming convention:

```text
T1_Sysmon_Process_Extraction
T2_Suricata_HTTP_Traffic
T3_Velociraptor_Pslist
T4_Velociraptor_Pstree
T5_Browser_Suspicious_Activity
T6_Correlation_View
```

## Safety and Limitations

These searches were created for a controlled academic SOC lab. They are not production-ready detection rules.

Important limitations:

- The searches use lab-specific IP addresses.
- The searches depend on the sourcetypes used in this project.
- Some Sysmon fields are extracted from raw XML using `rex`.
- The searches show observable activity only.
- They do not reveal the internal reasoning, prompt context or decision-making process of AI assistants.
- Correlation in Splunk should be treated as investigative correlation, not proof of causality.

## Safety Notice

This repository does not include real malware, real credentials, payment data, customer data or phishing infrastructure.

The EICAR test content used during the controlled download test was hosted only in the local lab environment and is not included in this public repository.