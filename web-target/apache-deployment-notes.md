# Apache Deployment Notes

These notes describe how the SkyBridge Airways demo website was deployed on the internal Apache server during the AI Browser Threat Monitoring System project.

## Server Details

```text
Hostname: suricata-sensor
Lab IP: 192.168.56.30
Role: Suricata sensor and internal Apache web target
Web root: /var/www/html
```

## Purpose

The internal Apache deployment was used to provide a controlled web target inside the SOC lab.

This was important because early external browsing tests were not fully visible to Suricata due to NAT routing. Hosting the SkyBridge website internally ensured that browser traffic from the Windows endpoint passed through the monitored lab network.

## Main Traffic Path

```text
Windows endpoint: 192.168.56.20
Apache / Suricata sensor: 192.168.56.30
```

## Apache Service Checks

Example commands used to check Apache status:

```bash
sudo systemctl status apache2
```

```bash
sudo systemctl restart apache2
```

```bash
sudo systemctl enable apache2
```

## Web Root

The website files were hosted from:

```text
/var/www/html
```

Example file listing command:

```bash
ls -lah /var/www/html
```

## Access Test from Windows Endpoint

The internal site was accessed from the Windows endpoint using:

```text
http://192.168.56.30
```

This generated HTTP traffic that could be observed by Suricata and searched in Splunk.

## Splunk Validation

The main Suricata validation search looked for HTTP traffic from the Windows endpoint to the internal Apache server:

```spl
index=main sourcetype="suricata:eve"
| spath
| search event_type="http" src_ip="192.168.56.20" dest_ip="192.168.56.30"
| table _time event_type src_ip src_port dest_ip dest_port proto http.hostname http.url http.http_user_agent
| sort - _time
```

## Controlled Download Note

During testing, a controlled file path was used for the payment/verification download scenario:

```text
/downloads/SkyBridge_Payment_Verification.pdf
```

This was not a real PDF and was used only as part of a controlled lab test.

The EICAR test content used locally is not included in this public repository.