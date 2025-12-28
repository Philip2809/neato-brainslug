# ESPHome CLI helper script for Windows PowerShell
# Supports both Docker and native ESPHome installations
# Usage: .\esphome.ps1 [command] [options]

$DOCKER_IMAGE = "esphome/esphome"
$CONFIG_FILE = "neato-esp-modular.yaml"

# Detect whether to use Docker or native ESPHome
$USE_DOCKER = $false
$USE_NATIVE = $false

# Check if Docker is available and running
if (Get-Command docker -ErrorAction SilentlyContinue) {
    try {
        docker ps *>$null
        if ($LASTEXITCODE -eq 0) {
            $USE_DOCKER = $true
        }
    } catch {
        # Docker not running
    }
}

# Check if native ESPHome is available
if (Get-Command esphome -ErrorAction SilentlyContinue) {
    $USE_NATIVE = $true
}

# Prefer Docker if both are available, otherwise use native
if ($USE_DOCKER) {
    $USE_NATIVE = $false
} elseif (-not $USE_NATIVE) {
    Write-Host "Error: Neither Docker nor native ESPHome found." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install one of the following:"
    Write-Host "  - Docker: https://www.docker.com/get-started"
    Write-Host "  - Native ESPHome: pip3 install esphome"
    exit 1
}

# Function to detect USB serial port
function Detect-USBPort {
    try {
        $ports = [System.IO.Ports.SerialPort]::getportnames()
        if ($ports.Count -gt 0) {
            return $ports[0]
        }
    } catch {
        # SerialPort class not available
    }

    Write-Host "Error: No USB serial port detected." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please specify the port manually:"
    Write-Host "  .\esphome.ps1 usb-run COM3"
    Write-Host "  .\esphome.ps1 usb-logs COM3"
    Write-Host ""
    Write-Host "To find your COM port:"
    Write-Host "  1. Open Device Manager"
    Write-Host "  2. Look under 'Ports (COM & LPT)'"
    Write-Host "  3. Find your USB Serial device (e.g., COM3, COM4)"
    Write-Host ""
    Write-Host "Or run this PowerShell command:"
    Write-Host "  [System.IO.Ports.SerialPort]::getportnames()"
    Write-Host ""
    return $null
}

# Get the command
$command = $args[0]

switch ($command) {
    "compile" {
        Write-Host "Compiling $CONFIG_FILE..."
        if ($USE_DOCKER) {
            docker run --rm -v "${PWD}:/config" -it $DOCKER_IMAGE compile /config/$CONFIG_FILE
        } else {
            esphome compile $CONFIG_FILE
        }
    }

    "upload" {
        Write-Host "Uploading to $CONFIG_FILE (OTA)..."
        if ($USE_DOCKER) {
            docker run --rm --network=host -v "${PWD}:/config" -it $DOCKER_IMAGE upload /config/$CONFIG_FILE
        } else {
            esphome upload $CONFIG_FILE
        }
    }

    "run" {
        Write-Host "Compiling and uploading $CONFIG_FILE (OTA)..."
        if ($USE_DOCKER) {
            docker run --rm --network=host -v "${PWD}:/config" -it $DOCKER_IMAGE run /config/$CONFIG_FILE
        } else {
            esphome run $CONFIG_FILE
        }
    }

    "usb-run" {
        if ($args.Count -lt 2) {
            Write-Host "Detecting USB serial port..."
            $port = Detect-USBPort
            if ($null -eq $port) {
                exit 1
            }
            Write-Host "Using auto-detected port: $port"
        } else {
            $port = $args[1]
            Write-Host "Using specified port: $port"
        }

        Write-Host "Compiling and uploading $CONFIG_FILE via USB..."
        if ($USE_DOCKER) {
            docker run --rm -v "${PWD}:/config" --device="$port" -it $DOCKER_IMAGE run /config/$CONFIG_FILE
        } else {
            esphome run $CONFIG_FILE --device $port
        }
    }

    "usb-logs" {
        if ($args.Count -lt 2) {
            Write-Host "Detecting USB serial port..."
            $port = Detect-USBPort
            if ($null -eq $port) {
                exit 1
            }
            Write-Host "Using auto-detected port: $port"
        } else {
            $port = $args[1]
            Write-Host "Using specified port: $port"
        }

        Write-Host "Showing logs via USB from $port..."
        if ($USE_DOCKER) {
            docker run --rm -v "${PWD}:/config" --device="$port" -it $DOCKER_IMAGE logs /config/$CONFIG_FILE
        } else {
            esphome logs $CONFIG_FILE --device $port
        }
    }

    "logs" {
        Write-Host "Showing logs for $CONFIG_FILE (network)..."
        if ($USE_DOCKER) {
            docker run --rm --network=host -v "${PWD}:/config" -it $DOCKER_IMAGE logs /config/$CONFIG_FILE
        } else {
            esphome logs $CONFIG_FILE
        }
    }

    "validate" {
        Write-Host "Validating $CONFIG_FILE..."
        if ($USE_DOCKER) {
            docker run --rm -v "${PWD}:/config" -it $DOCKER_IMAGE config /config/$CONFIG_FILE
        } else {
            esphome config $CONFIG_FILE
        }
    }

    "clean" {
        Write-Host "Cleaning build files..."
        if ($USE_DOCKER) {
            docker run --rm -v "${PWD}:/config" -it $DOCKER_IMAGE clean /config/$CONFIG_FILE
        } else {
            esphome clean $CONFIG_FILE
        }
    }

    default {
        Write-Host "ESPHome CLI Helper (PowerShell)" -ForegroundColor Cyan
        if ($USE_DOCKER) {
            Write-Host "(Using Docker: $DOCKER_IMAGE)"
        } else {
            Write-Host "(Using native ESPHome)"
        }
        Write-Host ""
        Write-Host "Usage: .\esphome.ps1 [command] [options]"
        Write-Host ""
        Write-Host "OTA Commands (wireless, after first USB upload):"
        Write-Host "  compile      - Compile the firmware only"
        Write-Host "  upload       - Upload compiled firmware via OTA"
        Write-Host "  run          - Compile and upload via OTA in one step"
        Write-Host "  logs         - View device logs via network"
        Write-Host ""
        Write-Host "USB Commands (for first-time setup):"
        Write-Host "  usb-run      - Compile and upload via USB (auto-detect port)"
        Write-Host "  usb-run PORT - Compile and upload via USB to specified port"
        Write-Host "  usb-logs     - View device logs via USB (auto-detect port)"
        Write-Host "  usb-logs PORT - View device logs via USB from specified port"
        Write-Host ""
        Write-Host "Other Commands:"
        Write-Host "  validate     - Validate configuration"
        Write-Host "  clean        - Clean build files"
        Write-Host ""
        Write-Host "Examples:"
        Write-Host "  .\esphome.ps1 usb-run       # First upload (auto-detect)"
        Write-Host "  .\esphome.ps1 usb-run COM3  # First upload (manual port)"
        Write-Host "  .\esphome.ps1 run           # Subsequent OTA updates"
        Write-Host ""
        exit 1
    }
}
