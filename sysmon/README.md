# Sysmon Configuration

This folder contains the Sysmon configuration and setup notes used in the **AI Browser Threat Monitoring System** project.

Sysmon was installed on the Windows endpoint to collect endpoint telemetry, especially process creation events. These events were forwarded to Splunk and used to identify browser execution, command-line activity, parent-child process relationships and suspicious process indicators.

## Configuration Used

The Sysmon configuration used in this lab was based on the public SwiftOnSecurity Sysmon configuration.

```text
Source project: https://github.com/SwiftOnSecurity/sysmon-config
Source license: Creative Commons Attribution 4.0
```

The configuration file is stored as:

```text
sysmon-config.xml
```

## Purpose

Sysmon was used to provide endpoint visibility for the Windows test machine where the AI-assisted browser activity was performed.

The main focus was on:

- Process creation telemetry
- Browser execution evidence
- Parent process and child process relationships
- Command-line visibility
- Suspicious process indicators such as PowerShell, CMD, Python, Node.js and headless browser flags

## Main Event Type Used

| Sysmon Event ID | Description | Relevance |
|---|---|---|
| Event ID 1 | Process Creation | Used to detect browser execution and command-line activity |

## Windows Endpoint

| Field | Value |
|---|---|
| Hostname | `win-endpoint` |
| Lab IP | `192.168.56.20` |
| Role | Windows endpoint used for AI browser testing |

## Splunk Sourcetype

Sysmon events were ingested into Splunk using the following sourcetype:

```text
XmlWinEventLog:Microsoft-Windows-Sysmon/Operational
```

## Related Splunk Searches

Sysmon telemetry is used by the following saved searches:

| Search | Purpose |
|---|---|
| `T1_Sysmon_Process_Extraction.spl` | Extracts process creation fields from Sysmon XML events |
| `T5_Browser_Suspicious_Activity.spl` | Searches for AI browser and suspicious process indicators |
| `T6_Correlation_View.spl` | Correlates Sysmon endpoint evidence with Suricata and Velociraptor evidence |

## Related Thesis Test Cases

| Test Case | Use of Sysmon |
|---|---|
| TC1 | Validates Sysmon log ingestion into Splunk |
| TC5 | Detects Comet AI Browser process activity |
| TC6 | Supports Comet workflow and controlled download evidence |
| TC9 | Reviews browser-spawned process activity |
| TC10 | Supports endpoint, network and process correlation |

## Validation

Sysmon ingestion was validated by running simple test processes on the Windows endpoint, including:

```text
notepad.exe
whoami.exe
hostname.exe
```

These events were then searched in Splunk using the T1 Sysmon process extraction search.

## Safety Notice

This folder does not contain credentials, tokens or private keys.

The Sysmon configuration was used only in a controlled academic SOC lab environment.
