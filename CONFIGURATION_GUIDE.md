# Neato Connected - Configuration Guide

This project uses a modular configuration structure (`neato-esp-modular.yaml`), making it easy to:
- Switch between ESP32-C3, ESP32, and ESP8266 boards with one line
- Enable/disable optional features (syslog, debug tools)
- Customize board configurations without editing the main file

## Prerequisites

**Required (choose one):**

**Option A: Docker** (Recommended - works on all platforms)
- All ESPHome commands run in Docker containers
- Install from: https://www.docker.com/get-started
  - macOS/Windows: Docker Desktop
  - Linux: Docker Engine
- Verify installation: `docker --version`
- **Use this option if:** You want isolated environment, no Python setup needed

**Option B: Native ESPHome Installation**
- Install ESPHome via pip: `pip3 install esphome`
- Requires Python 3.9+
- Verify installation: `esphome version`
- **Use this option if:** You prefer native tools, already have Python environment
- **Note:** If using native ESPHome, run commands directly (e.g., `esphome run neato-esp-modular.yaml`) instead of using the Docker wrapper scripts

**Optional:**
- Git (for cloning the repository)
- Text editor (VS Code, Sublime Text, etc.)

## Choose Your Script

### Using Docker (Recommended)

This project includes **two helper scripts** that wrap Docker commands for different operating systems:

| Operating System | Script to Use | How to Run |
|-----------------|---------------|------------|
| **Windows** | `esphome.ps1` | `.\esphome.ps1 usb-run` |
| **macOS / Linux** | `esphome.sh` | `./esphome.sh usb-run` |
| **Windows (Git Bash/WSL)** | `esphome.sh` | `./esphome.sh usb-run` |

**Notes:**
- Both scripts support either Docker or native ESPHome installations
- Scripts will auto-detect and prefer Docker if both are installed
- **Windows users:** PowerShell script (`esphome.ps1`) is recommended for native Windows support
- You can use `esphome.sh` on Windows if you have Git Bash or WSL installed

### Using Native ESPHome

If you installed ESPHome via pip, you can also use the helper scripts (they will auto-detect native ESPHome), or run commands directly:

```bash
# First-time setup (USB/Serial) - specify device port
esphome run neato-esp-modular.yaml --device /dev/cu.usbserial-0001  # macOS/Linux
esphome run neato-esp-modular.yaml --device COM3                     # Windows

# Subsequent updates (OTA) - auto-detect over WiFi
esphome run neato-esp-modular.yaml

# Just compile
esphome compile neato-esp-modular.yaml

# View logs (USB)
esphome logs neato-esp-modular.yaml --device /dev/cu.usbserial-0001  # macOS/Linux
esphome logs neato-esp-modular.yaml --device COM3                     # Windows

# View logs (WiFi)
esphome logs neato-esp-modular.yaml

# Validate config
esphome config neato-esp-modular.yaml
```

**Note:**
- For first-time USB upload, you must specify `--device` with the serial port
- After initial setup, ESPHome will auto-detect the device over WiFi for OTA updates
- The helper scripts (`esphome.sh` and `esphome.ps1`) support native ESPHome and provide USB port auto-detection

## Quick Start

### 1. Set Up Secrets

```bash
cp secrets.yaml.example secrets.yaml
```

Edit `secrets.yaml` with your actual values:
```yaml
wifi_ssid: "YourNetworkName"
wifi_password: "YourWiFiPassword"
api_encryption_key: "your-base64-key"
ota_password: "your-ota-password"

# Optional: Only needed if enabling optional features
syslog_server: "192.168.1.100"              # For syslog feature
captive_portal_password: "fallback-ap-pwd"  # For captive portal feature
```

### 2. Select Your Board

Edit `neato-esp-modular.yaml` and uncomment your board type:

```yaml
packages:
  board: !include boards/esp32c3.yaml  # ESP32-C3 (recommended)
  # board: !include boards/esp32.yaml   # Standard ESP32
  # board: !include boards/esp8266.yaml # ESP8266
```

**Board options:**
- **ESP32-C3**: Recommended for new builds (ESP-IDF framework)
- **ESP32**: Standard ESP32 boards (ESP-IDF framework)
- **ESP8266**: Older boards like NodeMCU (Arduino framework)

See [Board Selection](#selecting-your-board) for GPIO pin details.

### 3. Compile and Upload

**First-time setup (USB/Serial):**
```bash
# macOS/Linux - Auto-detect USB port and upload:
./esphome.sh usb-run

# OR specify port manually if auto-detect fails:
./esphome.sh usb-run /dev/cu.usbserial-0001  # macOS/Linux

# Windows - Use PowerShell script:
.\esphome.ps1 usb-run       # Auto-detect
.\esphome.ps1 usb-run COM3  # Manual port
```

**Subsequent updates (OTA - Over The Air):**
```bash
# macOS/Linux:
./esphome.sh run                              # Compile and upload
./esphome.sh compile && ./esphome.sh upload   # Two-step

# Windows PowerShell:
.\esphome.ps1 run                             # Compile and upload
.\esphome.ps1 compile; .\esphome.ps1 upload   # Two-step
```

**Just compile (no upload):**
```bash
./esphome.sh compile   # macOS/Linux
.\esphome.ps1 compile  # Windows
```

## Modular Configuration Setup

The modular configuration separates board-specific settings from optional features.

### Benefits

- **Clean separation**: Board configs, features, and core logic are in separate files
- **Easy board switching**: Change one line to switch between ESP32-C3, ESP32, or ESP8266
- **Optional features**: Enable/disable syslog and debug tools as needed
- **Production-ready default**: Both optional features disabled by default for minimal configuration
- **Easy customization**: Add your own board configs or feature modules

### File Structure

```
neato-connected/
├── neato-esp-modular.yaml    # Main config (edit this)
├── boards/
│   ├── esp32c3.yaml          # ESP32-C3 configuration
│   ├── esp32.yaml            # Standard ESP32 configuration
│   └── esp8266.yaml          # ESP8266 configuration
├── features/
│   ├── syslog.yaml           # Optional: Remote logging
│   └── debug-tools.yaml      # Optional: Debug buttons
└── secrets.yaml              # Your private settings
```

### Selecting Your Board

Edit `neato-esp-modular.yaml` and uncomment ONE board in the packages section:

```yaml
packages:
  board: !include boards/esp32c3.yaml
  # board: !include boards/esp32.yaml
  # board: !include boards/esp8266.yaml
```

### Board-Specific GPIO Pins

Each board configuration includes appropriate UART pins:

| Board Type | TX Pin | RX Pin | Framework | Notes |
|------------|--------|--------|-----------|-------|
| ESP32-C3   | GPIO21 | GPIO20 | ESP-IDF   | Default for ESP32-C3-DevKitM-1 |
| ESP32      | GPIO17 | GPIO16 | ESP-IDF   | Standard ESP32-DevKitC |
| ESP8266    | GPIO1  | GPIO3  | Arduino   | NodeMCU, Wemos D1 Mini |

**Framework Notes:**
- **ESP32 boards use ESP-IDF**: Lower-level framework with better performance and features
- **ESP8266 uses Arduino**: Standard framework for ESP8266 compatibility

**To use different pins:** Edit the appropriate file in `boards/` directory.

### Enabling/Disabling Optional Features

**Note:** All optional features are **disabled by default** for a minimal, production-ready configuration.

#### Captive Portal (WiFi Fallback AP)

**Status:** Disabled by default

**What it does:** Creates a fallback WiFi access point if the device cannot connect to your configured WiFi. This makes initial setup easier - if WiFi credentials are wrong, the device creates its own AP that you can connect to for reconfiguration.

**Enable:** Uncomment in the packages section of `neato-esp-modular.yaml`:
```yaml
captive_portal: !include
  file: features/captive-portal.yaml
  optional: true
```

**Configure:** Set the fallback AP password in `secrets.yaml`:
```yaml
captive_portal_password: "your-fallback-ap-password"
```

**Disable:** Comment out the captive portal package (default):
```yaml
# captive_portal: !include
#   file: features/captive-portal.yaml
#   optional: true
```

**When to enable:**
- During initial setup for easier WiFi configuration
- If you frequently change WiFi networks
- For troubleshooting WiFi connectivity issues

**Note:** The fallback AP will be named "[Your Device Name] Fallback" (e.g., "Neato Robot Fallback").

#### Syslog (Remote Logging)

**Status:** Disabled by default

**Enable:** Uncomment in the packages section of `neato-esp-modular.yaml`:
```yaml
syslog: !include
  file: features/syslog.yaml
  optional: true
```

**Configure:** Set your syslog server IP in `secrets.yaml`:
```yaml
syslog_server: "192.168.1.100"  # Your syslog server IP
```

**Disable:** Comment out the syslog package (default):
```yaml
# syslog: !include
#   file: features/syslog.yaml
#   optional: true
```

#### Debug Tools

**Status:** Disabled by default (only needed for development/troubleshooting)

**Enable:** Uncomment in the packages section of `neato-esp-modular.yaml`:
```yaml
debug: !include
  file: features/debug-tools.yaml
  optional: true
```

**Disable:** Comment out the debug package (default):
```yaml
# debug: !include
#   file: features/debug-tools.yaml
#   optional: true
```

Debug tools include:
- Text input entity for sending custom commands
- "DEBUG: Send Command" button
- "DEBUG: Quick Test" button (runs GetErr, GetState, GetCharger, GetVersion, GetUserSettings, GetWarranty, TestMode, GetButtons, GetMotors, GetAnalogSensors, GetDigitalSensors)

**When to enable:**
- During initial setup to test communication
- When troubleshooting robot commands
- When exploring undocumented commands

## Custom Board Configuration

### Creating a Custom Board Config

1. Copy an existing board file:
   ```bash
   cp boards/esp32.yaml boards/my-custom-board.yaml
   ```

2. Edit the GPIO pins and board type:
   ```yaml
   substitutions:
     uart_tx: "GPIO25"  # Your TX pin
     uart_rx: "GPIO26"  # Your RX pin

   esp32:
     board: your-board-name
     framework:
       type: esp-idf  # Use esp-idf for ESP32, arduino for ESP8266
   ```

3. Use it in `neato-esp-modular.yaml`:
   ```yaml
   packages:
     board: !include boards/my-custom-board.yaml
   ```

## Script Selection (Windows vs macOS/Linux)

This project includes two helper scripts:
- **`esphome.sh`** - For macOS/Linux (bash script)
- **`esphome.ps1`** - For Windows (PowerShell script)

### Windows Users

Windows cannot run `.sh` bash scripts natively. Choose one of these options:

**Option A: Use PowerShell script (Recommended)**
```powershell
.\esphome.ps1 usb-run
```

**Option B: Use Git Bash**
If you have Git for Windows installed:
```bash
./esphome.sh usb-run
```

**Option C: Use WSL (Windows Subsystem for Linux)**
If you have WSL installed:
```bash
./esphome.sh usb-run
```

### macOS/Linux Users

Simply use the bash script:
```bash
./esphome.sh usb-run
```

## Initial USB Setup

### Hardware Connection

1. **Connect ESP32/ESP8266 to your computer via USB**
2. **Identify the serial port:**
   - macOS: Usually `/dev/cu.usbserial-*` or `/dev/cu.SLAB_USBtoUART`
   - Linux: Usually `/dev/ttyUSB0` or `/dev/ttyACM0`
   - Windows: Usually `COM3`, `COM4`, etc.

### First Upload (USB/Serial)

**For the first upload, you MUST use USB/Serial since OTA isn't configured yet.**

**Recommended - Auto-detect USB port:**
```bash
./esphome.sh usb-run
```

The script will automatically detect your USB serial port and upload the firmware.

**If auto-detection fails, specify the port manually:**

First, find your serial port:
```bash
# macOS
ls /dev/cu.*

# Linux
ls /dev/ttyUSB* /dev/ttyACM*

# Windows (PowerShell)
[System.IO.Ports.SerialPort]::getportnames()

# Windows (Device Manager)
# Open Device Manager and check "Ports (COM & LPT)"
```

Then use the specific port:
```bash
./esphome.sh usb-run /dev/cu.usbserial-0001  # macOS/Linux
./esphome.sh usb-run COM3                     # Windows
```

This will:
1. Compile the configuration
2. Upload the firmware via USB to the specified port
3. Connect to the device and show live logs

### After First Upload

Once the device is running and connected to WiFi:

1. **Find the device IP** - Check your router or look in the logs
2. **Use OTA for updates:**
   ```bash
   ./esphome.sh upload
   ```
3. **ESPHome will detect the device on your network and upload wirelessly**

### Monitoring Logs

**Via USB:**
```bash
# Auto-detect USB port:
./esphome.sh usb-logs

# OR specify port manually:
./esphome.sh usb-logs /dev/cu.usbserial-0001  # macOS/Linux
./esphome.sh usb-logs COM3                     # Windows
```

**Via WiFi (after first upload):**
```bash
./esphome.sh logs
```

## Troubleshooting

### Validation Errors

```bash
./esphome.sh validate
```

### Common Issues

#### Docker Problems

**"docker: command not found" or "Cannot connect to Docker daemon":**
1. Ensure Docker is installed: `docker --version`
2. Start Docker Desktop (macOS/Windows) or Docker service (Linux):
   ```bash
   # Linux
   sudo systemctl start docker
   sudo systemctl enable docker
   ```
3. Check Docker is running: `docker ps`
4. Add your user to docker group (Linux):
   ```bash
   sudo usermod -aG docker $USER
   ```
   Then log out and back in.

**"permission denied while trying to connect to Docker daemon":**
- Make sure Docker Desktop is running (macOS/Windows)
- On Linux, ensure your user is in the `docker` group (see above)

#### USB Upload Problems

**"Serial port not found" or "Could not open port":**
1. Check USB cable (use a data cable, not charge-only)
2. Install USB drivers:
   - ESP32-C3: Usually works with built-in drivers (uses native USB)
   - ESP32/ESP8266 with CP2102: [Silicon Labs drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
   - ESP32/ESP8266 with CH340: [CH340 drivers](https://sparks.gogo.co.nz/ch340.html)
3. Check device permissions (Linux):
   ```bash
   sudo usermod -a -G dialout $USER
   ```
   Then log out and back in.

**"Failed to connect to ESP32":**
- Hold the BOOT button while uploading (some boards require this)
- Try lowering baud rate in upload by editing the config temporarily
- Ensure the board is not connected to the Neato robot during first upload

**"A fatal error occurred: Timed out waiting for packet header":**
- Press and hold the BOOT button
- Press the RESET button briefly
- Release BOOT button
- Try upload again

#### Runtime Issues

**"GPIO not found"**: Your board configuration may be using the wrong pin numbering. All boards should use "GPIOxx" format (e.g., "GPIO21").

**"WiFi not connecting"**:
- Check your `secrets.yaml` file has the correct SSID and password
- Ensure your WiFi is 2.4GHz (ESP8266/ESP32 don't support 5GHz)
- Check WiFi credentials don't have special characters that need escaping

**"Syslog not working"**: Verify the syslog server IP is correct in `secrets.yaml`.

**"Can't find device for OTA upload"**:
- Check the device is connected to WiFi (view USB logs)
- Ensure your computer and ESP device are on the same network
- Try using the device's IP address directly:
  ```bash
  docker run --rm -v "${PWD}":/config -it esphome/esphome upload /config/neato-esp-modular.yaml --device 192.168.1.100
  ```

## Advanced Configuration

### Multiple Robots

Create different configuration files for each robot:

```bash
cp neato-esp-modular.yaml neato-living-room.yaml
cp neato-esp-modular.yaml neato-bedroom.yaml
```

Edit each with different device names:
```yaml
substitutions:
  device_name: neato-living-room
  friendly_name: "Living Room Neato"
```

Compile separately:
```bash
docker run --rm -v "${PWD}":/config -it esphome/esphome compile /config/neato-living-room.yaml
```

## Documentation

- [Neato Firmware Protocol Documentation](NEATO_FIRMWARE_DOCUMENTATION.md)
- [ESPHome Documentation](https://esphome.io/)

## Support

For issues and questions:
- Check the documentation above
- Review existing GitHub issues
- Create a new issue with your configuration and error logs
