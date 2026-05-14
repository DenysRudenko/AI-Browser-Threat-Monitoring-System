# Velociraptor Artifacts

This folder contains the custom Velociraptor artifacts used in the **AI Browser Threat Monitoring System** project.

The artifacts were used to collect endpoint process evidence from the Windows endpoint and forward selected results to Splunk using HTTP Event Collector (HEC).

## Artifact Files

| File | Type | Purpose |
|---|---|---|
| `Custom.Splunk.Pslist.Upload.yaml` | Server | Manually uploads local `pslist()` output to Splunk HEC |
| `Custom.Splunk.Auto.Pslist.yaml` | Server event | Automatically uploads `Windows.System.Pslist` collection results to Splunk |
| `Custom.Splunk.Auto.Pstree.yaml` | Server event | Automatically uploads `Generic.System.Pstree` collection results to Splunk |
| `Custom.Splunk.Auto.ParentProcess.yaml` | Server event | Automatically uploads `Windows.Attack.ParentProcess` results to Splunk |

## Hunt Files

| File | Type | Purpose |
|---|---|---|
| `hunts/ai-browser-detection-hunt.md` | Hunt documentation | Documents the AI Browser Detection hunt using `Windows.System.Pslist`, `Generic.System.Pstree` and `Windows.Attack.ParentProcess` |

## Purpose

These artifacts support the thesis by allowing Velociraptor process evidence to be forwarded into Splunk. This makes it possible to correlate endpoint process telemetry with Sysmon and Suricata evidence.

The forwarded Velociraptor sourcetypes used in Splunk were:

```text
velociraptor:pslist
velociraptor:pstree
velociraptor:parentprocess
```

## Lab Configuration

| Component | Value |
|---|---|
| Splunk HEC URL | `http://192.168.56.10:8088/services/collector` |
| Splunk Index | `main` |
| Velociraptor Server | `192.168.56.40` |
| Windows Endpoint | `win-endpoint` |

## Security Notice

The public versions of these artifacts do not include real Splunk HEC tokens.

Before importing or running these artifacts, replace:

```text
<SPLUNK_HEC_TOKEN>
```

with a valid Splunk HEC token in your own lab environment.

Do not commit real HEC tokens, passwords, private keys, certificates, API keys or credentials to GitHub.

## Relationship to Thesis Testing

These artifacts support the following test cases:

| Artifact | Related Test Case |
|---|---|
| `Custom.Splunk.Pslist.Upload.yaml` | Velociraptor-to-Splunk forwarding validation |
| `Custom.Splunk.Auto.Pslist.yaml` | TC3, TC4, TC5, TC9 |
| `Custom.Splunk.Auto.Pstree.yaml` | TC3, TC4, TC9 |
| `Custom.Splunk.Auto.ParentProcess.yaml` | Browser-spawned process investigation |

## Limitation

These artifacts provide process and process-tree evidence only. They do not reveal the internal reasoning, prompt context or decision-making process of AI assistants.