import { useState } from 'react';
import './ha-config.scss';

export default function HaConfig() {
  const [name, setName] = useState('neato-vacuum');
  const [comment, setComment] = useState('');
  const [infoInterval, setInfoInterval] = useState('2sec');
  const [chargerInterval, setChargerInterval] = useState('2min');
  const [otaPassword, setOtaPassword] = useState('!secret neato_vacuum_ota');

  const [useHa, setUseHa] = useState(true);
  const [wifiSsid, setWifiSsid] = useState('!secret wifi_ssid');
  const [wifiPassword, setWifiPassword] = useState('!secret wifi_password');
  const [haEncryptionKey, setHaEncryptionKey] = useState('!secret neato_vacuum_api');

  const [useCustomUart, setUseCustomUart] = useState(false);
  const [uartTx, setUartTx] = useState('17');
  const [uartRx, setUartRx] = useState('16');

  const [useDomainInfo, setUseDomainInfo] = useState(false);
  const [domain, setDomain] = useState('.lan');
  const [useAddress, setUseAddress] = useState('192.168.205.199');

  const [boardType, setBoardType] = useState('esp32s2.yaml');
  const [neatoGen, setNeatoGen] = useState('gen3.yaml');

  const generateYaml = () => {
    let yaml = `    substitutions:
    name: ${name}
    comment: "${comment}"
    infointerval: ${infoInterval}
    chargerinterval: ${chargerInterval}
    ota_password: ${otaPassword}

`;

    if (useHa) {
      yaml += `
  ### If you are using ha:
  wifi_ssid: ${wifiSsid}
  wifi_password: ${wifiPassword}
  ha_encryption_key: ${haEncryptionKey}
`;
    } else {
      yaml += `
  ### If you are using ha:
  # wifi_ssid: !secret wifi_ssid
  # wifi_password: !secret wifi_password
  # ha_encryption_key: !secret neato_vacuum_api
`;
    }

    if (useCustomUart) {
      yaml += `
  ### If you want to change the UART Pins
  uart_tx: ${uartTx}
  uart_rx: ${uartRx}
`;
    } else {
      yaml += `
  ### If you want to change the UART Pins
  # uart_tx: 17
  # uart_rx: 16
`;
    }

    yaml += `

wifi:
`;
    if (useDomainInfo) {
      yaml += `  ### If your router sets another TLD for local devices, specify that here
  domain: ${domain}
  ### If you are having issues with the dns or are 100% this will be the ip, you can spesify that here
  use_address: ${useAddress}
`;
    } else {
      yaml += `  ### If your router sets another TLD for local devices, specify that here
  # domain: .lan
  ### If you are having issues with the dns or are 100% this will be the ip, you can spesify that here
  # use_address: 192.168.205.199
`;
    }

    yaml += `

packages:
  remote_package_files:
    url: https://github.com/philip2809/neato-brainslug
    files:
`;
    const boards = ['esp32.yaml', 'esp32c3.yaml', 'esp32s3.yaml', 'esp32s2.yaml'];
    for (const b of boards) {
      yaml += b === boardType ? `      - config/boards/${b}\n` : `      # - config/boards/${b}\n`;
    }

    yaml += `\n`;

    if (useHa) {
      yaml += `      - config/ha.yaml             # Remember to set wifi credentials and ha_encryption_key in the substitutions if you are using this
      # - config/no-ha.yaml
`;
    } else {
      yaml += `      # - config/ha.yaml
      - config/no-ha.yaml
`;
    }

    yaml += `\n      - config/webserver.yaml\n`;

    if (neatoGen === 'gen3.yaml') {
      yaml += `      - config/gen3.yaml
      # - config/gen2.yaml\n`;
    } else {
      yaml += `      # - config/gen3.yaml
      - config/gen2.yaml\n`;
    }

    yaml += `    ref: main
`;

    return yaml;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateYaml());
  };

  return (
    <div className="ha-config-container card">
      <p className="success">HA Config Generator</p>
      <p>Configure your ESPHome YAML file easily.</p>

      <div className="config-layout">
        <div className="config-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Comment</label>
            <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Info Interval</label>
            <input type="text" value={infoInterval} onChange={e => setInfoInterval(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Charger Interval</label>
            <input type="text" value={chargerInterval} onChange={e => setChargerInterval(e.target.value)} />
          </div>
          <div className="form-group">
            <label>OTA Password</label>
            <input type="text" value={otaPassword} onChange={e => setOtaPassword(e.target.value)} />
          </div>

          <hr />

          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" checked={useHa} onChange={e => setUseHa(e.target.checked)} />
              Use Home Assistant Integration?
            </label>
          </div>
          {useHa && (
            <div className="sub-group">
              <div className="form-group">
                <label>Wi-Fi SSID</label>
                <input type="text" value={wifiSsid} onChange={e => setWifiSsid(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Wi-Fi Password</label>
                <input type="text" value={wifiPassword} onChange={e => setWifiPassword(e.target.value)} />
              </div>
              <div className="form-group">
                <label>HA Encryption Key</label>
                <input type="text" value={haEncryptionKey} onChange={e => setHaEncryptionKey(e.target.value)} />
              </div>
            </div>
          )}

          <hr />

          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" checked={useCustomUart} onChange={e => setUseCustomUart(e.target.checked)} />
              Change UART Pins?
            </label>
          </div>
          {useCustomUart && (
            <div className="sub-group">
              <div className="form-group">
                <label>UART TX</label>
                <input type="text" value={uartTx} onChange={e => setUartTx(e.target.value)} />
              </div>
              <div className="form-group">
                <label>UART RX</label>
                <input type="text" value={uartRx} onChange={e => setUartRx(e.target.value)} />
              </div>
            </div>
          )}

          <hr />

          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" checked={useDomainInfo} onChange={e => setUseDomainInfo(e.target.checked)} />
              Use Custom DNS/IP?
            </label>
          </div>
          {useDomainInfo && (
            <div className="sub-group">
              <div className="form-group">
                <label>Domain</label>
                <input type="text" value={domain} onChange={e => setDomain(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Use Address</label>
                <input type="text" value={useAddress} onChange={e => setUseAddress(e.target.value)} />
              </div>
            </div>
          )}

          <hr />

          <div className="form-group">
            <label>Board Type</label>
            <select value={boardType} onChange={e => setBoardType(e.target.value)}>
              <option value="esp32.yaml">ESP32</option>
              <option value="esp32c3.yaml">ESP32-C3</option>
              <option value="esp32s3.yaml">ESP32-S3</option>
              <option value="esp32s2.yaml">ESP32-S2</option>
            </select>
          </div>

          <div className="form-group">
            <label>Neato Generation</label>
            <select value={neatoGen} onChange={e => setNeatoGen(e.target.value)}>
              <option value="gen3.yaml">Gen 3 (Botvac Connected onwards)</option>
              <option value="gen2.yaml">Gen 2</option>
            </select>
          </div>
        </div>

        <div className="config-output">
          <div className="output-header">
            <h3>Generated YAML</h3>
            <button onClick={copyToClipboard} className="action-btn">Copy</button>
          </div>
          <pre>
            <code>{generateYaml()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
