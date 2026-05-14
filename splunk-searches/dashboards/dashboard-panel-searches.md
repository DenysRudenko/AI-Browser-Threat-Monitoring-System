# AI Browser Threat Monitoring Dashboard Panel Searches

This file documents the SPL searches used in the Splunk dashboard:

**AI Browser Threat Monitoring Overview**

The dashboard provides a high-level SOC view of telemetry collected from Sysmon, Suricata and Velociraptor during the AI-assisted browser test cases.

---

## Panel 1: Telemetry Source Summary

**Purpose:**  
Shows which sourcetypes are present in Splunk and how many events have been collected from each telemetry source.

```spl
index=main earliest=-7d
| stats count by sourcetype
| sort - count
```

---

## Panel 2: Evidence Source Distribution

**Purpose:**  
Groups raw Splunk sourcetypes into clearer evidence categories: Suricata network evidence, Sysmon endpoint evidence, Velociraptor process evidence and other events.

```spl
index=main earliest=-30d
| eval EvidenceSource=case(
    sourcetype="suricata:eve","Suricata network",
    like(sourcetype,"%Sysmon%"),"Sysmon endpoint",
    like(sourcetype,"velociraptor%"),"Velociraptor process",
    true(),"Other"
)
| stats count by EvidenceSource
| sort - count
```

---

## Panel 3: SkyBridge Internal Web Traffic

**Purpose:**  
Shows HTTP/network evidence from the controlled SkyBridge Airways web target. This is mainly used to confirm traffic between the Windows endpoint and the internal Apache server.

```spl
index=main sourcetype="suricata:eve"
(src_ip="192.168.56.20" OR dest_ip="192.168.56.20")
(src_ip="192.168.56.30" OR dest_ip="192.168.56.30" OR "ticket.html" OR "confirmation.html" OR "email-booking-alert.html" OR "flights.html" OR "inbox.html" OR "index.html" OR "soc-demo.html" OR "SkyBridge" OR "eicar")
| stats count latest(_time) as LastSeen by event_type src_ip dest_ip http.hostname http.url
| convert ctime(LastSeen)
| sort - count
```

---

## Panel 4: Controlled Download and EICAR Evidence

**Purpose:**  
Searches for evidence related to the controlled download test, including EICAR-related events and the SkyBridge payment verification file used in the lab.

```spl
index=main ("eicar" OR "EICAR" OR "/downloads/eicar.com" OR "downloads" OR "SkyBridge_Payment_Verification")
| eval EvidenceSource=case(
    sourcetype="suricata:eve","Suricata network",
    like(sourcetype,"%Sysmon%"),"Sysmon endpoint",
    like(sourcetype,"velociraptor%"),"Velociraptor process",
    true(),"Other"
)
| stats count latest(_time) as LastSeen by EvidenceSource sourcetype host src_ip dest_ip http.url fileinfo.filename
| convert ctime(LastSeen)
| sort - LastSeen
```

---

## Panel 5: AI Browser Process Activity

**Purpose:**  
Identifies process evidence related to the tested AI-assisted browsers: Perplexity Comet, Opera Neon and Microsoft Edge/Copilot.

```spl
index=main ("comet.exe" OR "Perplexity" OR "Opera Neon" OR "msedge.exe" OR "Copilot")
(sourcetype="XmlWinEventLog:Microsoft-Windows-Sysmon/Operational" OR sourcetype="velociraptor:pslist" OR sourcetype="velociraptor:pstree")
| eval Browser=case(
    match(lower(_raw),"comet.exe|perplexity"),"Perplexity Comet",
    match(lower(_raw),"opera neon"),"Opera Neon",
    match(lower(_raw),"msedge.exe|copilot"),"Microsoft Edge/Copilot",
    true(),"Other browser-related event"
)
| stats count by Browser
| sort - count
```

---

## Panel 6: Suspicious Browser-Related Indicators

**Purpose:**  
Searches for browser-related activity and suspicious automation or scripting indicators, including PowerShell, CMD, Python, Node.js, headless browser flags, Selenium, Playwright and Puppeteer.

```spl
index=main ("powershell.exe" OR "cmd.exe" OR "python.exe" OR "node.exe" OR "--headless" OR "selenium" OR "playwright" OR "puppeteer" OR "comet.exe" OR "Perplexity" OR "Opera Neon" OR "msedge.exe" OR "Copilot")
| eval Indicator=case(
    match(lower(_raw),"powershell.exe"),"PowerShell",
    match(lower(_raw),"cmd.exe"),"CMD",
    match(lower(_raw),"python.exe"),"Python",
    match(lower(_raw),"node.exe"),"Node.js",
    match(lower(_raw),"--headless"),"Headless browser flag",
    match(lower(_raw),"selenium"),"Selenium",
    match(lower(_raw),"playwright"),"Playwright",
    match(lower(_raw),"puppeteer"),"Puppeteer",
    match(lower(_raw),"comet.exe|perplexity"),"Perplexity Comet",
    match(lower(_raw),"opera neon"),"Opera Neon",
    match(lower(_raw),"msedge.exe|copilot"),"Microsoft Edge/Copilot",
    true(),"Other browser-related indicator"
)
| stats count by Indicator
| sort - count
```

---

## Panel 7: Velociraptor Process Evidence

**Purpose:**  
Displays endpoint process evidence collected through Velociraptor, including process names, PIDs, PPIDs, usernames and executable paths.

```spl
index=main (sourcetype="velociraptor:pslist" OR sourcetype="velociraptor:pstree")
| stats count latest(_time) as LastSeen by sourcetype host hostname Name Pid Ppid Username Exe
| convert ctime(LastSeen)
| sort - LastSeen
| head 15
```

---

## Panel 8: Correlation Timeline

**Purpose:**  
Combines Suricata, Sysmon and Velociraptor evidence into a single investigative timeline. This panel is used to support correlation between browser execution, internal web traffic, controlled download evidence and endpoint process activity.

```spl
index=main (
    (sourcetype="suricata:eve" ("192.168.56.20" OR "192.168.56.30" OR "ticket.html" OR "confirmation.html" OR "email-booking-alert.html" OR "flights.html" OR "inbox.html" OR "index.html" OR "soc-demo.html" OR "/downloads/eicar.com" OR "eicar" OR "SkyBridge"))
    OR
    (sourcetype="XmlWinEventLog:Microsoft-Windows-Sysmon/Operational" ("comet.exe" OR "Perplexity" OR "Opera Neon" OR "msedge.exe" OR "Copilot" OR "eicar"))
    OR
    (sourcetype="velociraptor:pslist" OR sourcetype="velociraptor:pstree")
)
| eval EvidenceSource=case(
    sourcetype="suricata:eve","Suricata network",
    like(sourcetype,"%Sysmon%"),"Sysmon endpoint",
    like(sourcetype,"velociraptor%"),"Velociraptor process",
    true(),"Other"
)
| rex field=_raw "<Data Name=[\"']Image[\"']>(?<Image>[^<]+)</Data>"
| rex field=_raw "<Data Name=[\"']ParentImage[\"']>(?<ParentImage>[^<]+)</Data>"
| rex field=_raw "<Data Name=[\"']CommandLine[\"']>(?<CommandLine>[^<]+)</Data>"
| sort 0 - _time
| streamstats count as SourceRow by EvidenceSource
| where SourceRow<=10
| table _time EvidenceSource sourcetype host hostname src_ip dest_ip http.url event_type Name Image ParentImage CommandLine Exe
| sort EvidenceSource - _time
```

---

## Notes

- The dashboard is designed for the controlled SOC lab environment.
- The private lab IP addresses are used only for the internal test network:
  - `192.168.56.20` - Windows endpoint
  - `192.168.56.30` - Suricata sensor and Apache web target
- The dashboard supports the thesis testing phase by showing observable evidence from endpoint, network and process telemetry.
- The dashboard does not show the internal reasoning or prompt context of AI assistants. It only shows the observable consequences of AI-assisted browser activity.