# Velociraptor Hunt: AI Browser Detection

## Hunt Overview

This hunt was created as part of the **AI Browser Threat Monitoring System** project to collect endpoint process evidence from the Windows endpoint.

The purpose of the hunt was to support the investigation of AI-assisted browser activity, browser-spawned processes and parent-child process relationships.

## Hunt Details

| Field | Value |
|---|---|
| Hunt Tag | `AI Browser Detection` |
| Hunt ID | `H.D821OPP02BHEK` |
| Creator | `analyst` |
| Creation Time | `2026-05-13T06:38:31.415Z` |
| Expiry Time | `2026-05-20T06:37:58.701Z` |
| State | `Scheduled` |
| Ops/Sec | Unlimited |
| CPU Limit | Unlimited |
| IOPS Limit | Unlimited |

## Artifacts Used

The hunt used the following Velociraptor artifacts:

```text
Windows.System.Pslist
Generic.System.Pstree
Windows.Attack.ParentProcess
```

## Purpose of Each Artifact

| Artifact | Purpose |
|---|---|
| `Windows.System.Pslist` | Collects running process information from the Windows endpoint |
| `Generic.System.Pstree` | Collects process-tree evidence and parent-child process relationships |
| `Windows.Attack.ParentProcess` | Checks for unusual parent-child process relationships based on expected process behaviour |

## Target Endpoint

The hunt was used against the Windows endpoint in the SOC lab.

| Field | Value |
|---|---|
| Hostname | `win-endpoint` |
| Role | Windows endpoint used for AI browser testing |
| Lab IP | `192.168.56.20` |

## Data Collected

The hunt supported the collection of the following process-related fields:

- Process name
- PID
- PPID
- Username
- Command line
- Executable path
- Process start time
- Parent-child process relationships
- Process call chain evidence

## Relevance to the Project

This hunt was important because the project did not only rely on Sysmon or network evidence. Velociraptor was also used to provide an additional endpoint investigation layer.

The hunt helped answer whether AI-assisted browser workflows created visible process evidence on the endpoint, including whether browsers spawned suspicious child processes such as:

- PowerShell
- CMD
- Python
- Node.js
- Unusual parent-child process combinations

## Splunk Forwarding

The results from Velociraptor collections were forwarded to Splunk using custom Velociraptor-to-Splunk HEC artifacts.

The relevant Splunk sourcetypes were:

```text
velociraptor:pslist
velociraptor:pstree
velociraptor:parentprocess
```

## Related Splunk Searches

This hunt supports the following Splunk searches:

| Search | Purpose |
|---|---|
| `T3_Velociraptor_Pslist.spl` | Displays Velociraptor process list evidence |
| `T4_Velociraptor_Pstree.spl` | Displays Velociraptor process-tree evidence |
| `T5_Browser_Suspicious_Activity.spl` | Searches for AI browser and suspicious process indicators |
| `T6_Correlation_View.spl` | Correlates endpoint, network and process evidence |

## Related Thesis Test Cases

| Test Case | Relationship |
|---|---|
| TC3 | Velociraptor process collection from the Windows endpoint |
| TC4 | Velociraptor process telemetry forwarding to Splunk |
| TC5 | Comet AI Browser process detection |
| TC9 | Browser-spawned process and suspicious activity search |
| TC10 | Splunk correlation of endpoint, network and process evidence |

## Result

The hunt provided endpoint process evidence for the Windows test machine. This evidence was used to support the investigation of AI browser activity and browser-related process relationships.

During testing, no suspicious direct browser-spawned PowerShell, CMD, Python, Node.js, MSHTA or Rundll32 process was observed. This was still a useful result because it showed the limits of process-level telemetry during normal AI-assisted browser interaction.

## Limitations

The hunt collected process and process-tree evidence only. It did not show:

- AI assistant internal reasoning
- Prompt context
- Page interpretation by the AI assistant
- Browser extension-level activity
- HTTPS content visibility

For this reason, the hunt was used as one part of a wider SOC correlation workflow with Sysmon, Suricata and Splunk.

## Safety Notes

This hunt was performed in a controlled academic SOC lab environment.

No real user data, credentials, payment information or production systems were involved.