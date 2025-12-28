#!/bin/bash
# ESPHome CLI helper script
# Supports both Docker and native ESPHome installations

DOCKER_IMAGE="esphome/esphome"
CONFIG_FILE="neato-esp-modular.yaml"

# Detect whether to use Docker or native ESPHome
USE_DOCKER=false
USE_NATIVE=false

if command -v docker &> /dev/null; then
  if docker ps &> /dev/null; then
    USE_DOCKER=true
  fi
fi

if command -v esphome &> /dev/null; then
  USE_NATIVE=true
fi

# Prefer Docker if both are available, otherwise use native
if [ "$USE_DOCKER" = true ]; then
  USE_NATIVE=false
elif [ "$USE_NATIVE" = false ]; then
  echo "Error: Neither Docker nor native ESPHome found." >&2
  echo "" >&2
  echo "Please install one of the following:" >&2
  echo "  - Docker: https://www.docker.com/get-started" >&2
  echo "  - Native ESPHome: pip3 install esphome" >&2
  exit 1
fi

# Function to detect USB serial port
detect_usb_port() {
  # Try to find common USB serial ports
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS - look for common USB serial adapters
    PORT=$(ls /dev/cu.* 2>/dev/null | grep -E "(usbserial|SLAB|wchusbserial)" | head -n 1)
  elif [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "linux" ]]; then
    # Linux - look for USB and ACM devices
    PORT=$(ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null | head -n 1)
  elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
    # Windows (Git Bash, WSL, Cygwin) - look for COM ports
    # Try to detect COM ports (this is tricky on Windows)
    for i in {3..20}; do
      if [ -e "/dev/ttyS$((i-1))" ]; then
        PORT="COM$i"
        break
      fi
    done
  fi

  if [ -z "$PORT" ]; then
    echo "Error: No USB serial port detected." >&2
    echo "" >&2
    echo "Please specify the port manually:" >&2
    if [[ "$OSTYPE" == "darwin"* ]]; then
      echo "  ./esphome.sh usb-run /dev/cu.usbserial-0001" >&2
      echo "  ./esphome.sh usb-logs /dev/cu.usbserial-0001" >&2
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
      echo "  ./esphome.sh usb-run COM3" >&2
      echo "  ./esphome.sh usb-logs COM3" >&2
    else
      echo "  ./esphome.sh usb-run /dev/ttyUSB0" >&2
      echo "  ./esphome.sh usb-logs /dev/ttyUSB0" >&2
    fi
    echo "" >&2
    echo "Available ports:" >&2
    if [[ "$OSTYPE" == "darwin"* ]]; then
      # Show all cu devices on macOS (excluding Bluetooth and debug console)
      PORTS=$(ls /dev/cu.* 2>/dev/null | grep -v -E "(Bluetooth-Incoming-Port|debug-console)")
      if [ -n "$PORTS" ]; then
        echo "$PORTS" | sed 's/^/  /' >&2
      else
        echo "  No USB serial ports found (only Bluetooth/system ports detected)" >&2
        echo "  Make sure your ESP device is connected via USB" >&2
      fi
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
      # Windows - suggest using Device Manager
      echo "  On Windows, check Device Manager for COM port numbers" >&2
      echo "  (Ports (COM & LPT) section)" >&2
      echo "" >&2
      echo "  Or use PowerShell to list ports:" >&2
      echo "    [System.IO.Ports.SerialPort]::getportnames()" >&2
    else
      # Linux - show USB and ACM devices
      if ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null 1>&2; then
        ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null | sed 's/^/  /' >&2
      else
        echo "  No USB serial ports found" >&2
      fi
    fi
    return 1
  fi

  echo "$PORT"
  return 0
}

case "$1" in
  compile)
    echo "Compiling $CONFIG_FILE..."
    if [ "$USE_DOCKER" = true ]; then
      docker run --rm -v "${PWD}":/config -it $DOCKER_IMAGE compile /config/$CONFIG_FILE
    else
      esphome compile $CONFIG_FILE
    fi
    ;;

  upload)
    echo "Uploading to $CONFIG_FILE (OTA)..."
    if [ "$USE_DOCKER" = true ]; then
      docker run --rm --network=host -v "${PWD}":/config -it $DOCKER_IMAGE upload /config/$CONFIG_FILE
    else
      esphome upload $CONFIG_FILE
    fi
    ;;

  run)
    echo "Compiling and uploading $CONFIG_FILE (OTA)..."
    if [ "$USE_DOCKER" = true ]; then
      docker run --rm --network=host -v "${PWD}":/config -it $DOCKER_IMAGE run /config/$CONFIG_FILE
    else
      esphome run $CONFIG_FILE
    fi
    ;;

  usb-run)
    if [ -z "$2" ]; then
      PORT=$(detect_usb_port)
      if [ $? -ne 0 ]; then
        exit 1
      fi
      echo "Using auto-detected port: $PORT"
    else
      PORT="$2"
      echo "Using specified port: $PORT"
    fi

    echo "Compiling and uploading $CONFIG_FILE via USB..."
    if [ "$USE_DOCKER" = true ]; then
      docker run --rm -v "${PWD}":/config --device="$PORT" -it $DOCKER_IMAGE run /config/$CONFIG_FILE
    else
      esphome run $CONFIG_FILE --device $PORT
    fi
    ;;

  usb-logs)
    if [ -z "$2" ]; then
      PORT=$(detect_usb_port)
      if [ $? -ne 0 ]; then
        exit 1
      fi
      echo "Using auto-detected port: $PORT"
    else
      PORT="$2"
      echo "Using specified port: $PORT"
    fi

    echo "Showing logs via USB from $PORT..."
    if [ "$USE_DOCKER" = true ]; then
      docker run --rm -v "${PWD}":/config --device="$PORT" -it $DOCKER_IMAGE logs /config/$CONFIG_FILE
    else
      esphome logs $CONFIG_FILE --device $PORT
    fi
    ;;

  logs)
    echo "Showing logs for $CONFIG_FILE (network)..."
    if [ "$USE_DOCKER" = true ]; then
      docker run --rm --network=host -v "${PWD}":/config -it $DOCKER_IMAGE logs /config/$CONFIG_FILE
    else
      esphome logs $CONFIG_FILE
    fi
    ;;

  validate)
    echo "Validating $CONFIG_FILE..."
    if [ "$USE_DOCKER" = true ]; then
      docker run --rm -v "${PWD}":/config -it $DOCKER_IMAGE config /config/$CONFIG_FILE
    else
      esphome config $CONFIG_FILE
    fi
    ;;

  clean)
    echo "Cleaning build files..."
    if [ "$USE_DOCKER" = true ]; then
      docker run --rm -v "${PWD}":/config -it $DOCKER_IMAGE clean /config/$CONFIG_FILE
    else
      esphome clean $CONFIG_FILE
    fi
    ;;

  *)
    echo "ESPHome CLI Helper"
    if [ "$USE_DOCKER" = true ]; then
      echo "(Using Docker: $DOCKER_IMAGE)"
    else
      echo "(Using native ESPHome)"
    fi
    echo ""
    echo "Usage: ./esphome.sh [command] [options]"
    echo ""
    echo "OTA Commands (wireless, after first USB upload):"
    echo "  compile      - Compile the firmware only"
    echo "  upload       - Upload compiled firmware via OTA"
    echo "  run          - Compile and upload via OTA in one step"
    echo "  logs         - View device logs via network"
    echo ""
    echo "USB Commands (for first-time setup):"
    echo "  usb-run      - Compile and upload via USB (auto-detect port)"
    echo "  usb-run PORT - Compile and upload via USB to specified port"
    echo "  usb-logs     - View device logs via USB (auto-detect port)"
    echo "  usb-logs PORT - View device logs via USB from specified port"
    echo ""
    echo "Other Commands:"
    echo "  validate     - Validate configuration"
    echo "  clean        - Clean build files"
    echo ""
    echo "Examples:"
    echo "  ./esphome.sh usb-run                         # First upload (auto-detect)"
    echo "  ./esphome.sh usb-run /dev/cu.usbserial-0001 # macOS/Linux manual port"
    echo "  ./esphome.sh usb-run COM3                    # Windows manual port"
    echo "  ./esphome.sh run                             # Subsequent OTA updates"
    echo "  ./esphome.sh compile && ./esphome.sh upload  # Two-step OTA update"
    echo ""
    exit 1
    ;;
esac
