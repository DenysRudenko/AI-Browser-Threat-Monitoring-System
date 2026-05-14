# Sysmon Installation Notes

These notes summarise how Sysmon was used on the Windows endpoint in the SOC lab.

## Endpoint

```text
Windows endpoint: 192.168.56.20
Hostname: win-endpoint
```

## Installation Purpose

Sysmon was installed to collect endpoint process telemetry from the Windows test machine. This allowed Splunk to receive evidence of browser execution and process activity during the AI-assisted browser test cases.

## Example Installation Command

```powershell
Sysmon64.exe -accepteula -i sysmon-config.xml
```

## Example Configuration Update Command

```powershell
Sysmon64.exe -c sysmon-config.xml
```

## Example Active Configuration Export Command

```powershell
Sysmon64.exe -c
```

## Example Service Check

```powershell
Get-Service Sysmon64
```

## Event Log Location

Sysmon events were collected from:

```text
Applications and Services Logs/Microsoft/Windows/Sysmon/Operational
```

## Splunk Ingestion

Sysmon logs were forwarded to Splunk and appeared under the sourcetype:

```text
XmlWinEventLog:Microsoft-Windows-Sysmon/Operational
```

## Validation

Sysmon ingestion was validated by running simple test processes on the Windows endpoint, including:

```text
notepad.exe
whoami.exe
hostname.exe
```

These events were then searched in Splunk using the T1 Sysmon process extraction search.