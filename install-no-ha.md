# Install without Home Assistant

You can also use this repair without Home Assistant, however only version 1 will be supported for this route, since later versions will require a docker container with ros2 for the floormap functions.

# TODO: add images

**Overview of steps**
1. Flash ESP device with prebuilt images
2. Connect to robot
3. Configure wifi
4. Make sure it works
5. Fix ESP device inside or outside robot
6. Enjoy a locally connected vacuum!
7. Updates?


### Step 1
I have made some prebuilt images for recommended ESP32s, however, if you have another ESP32 that is not listed here, ask me and I will build you one!
# TODO: add links
- ESP32
- ESP32-S3
- ESP32-C3

The image you just downloaded by clicking on the link above is a so called factory image, it is a full "factory" firmware image, different from the ota(Over the air (update))- images. Later on when updates are released, you will only need to download and upload the ota-images, but this will be covered in step 7. 

Now that you have the image you need to flash this. The easiest way to do this is via [ESPHome Web](https://web.esphome.io/). Since this uses WebSerial you will need to use a chromium based browser, Google Chrome, Microsoft Edge or Chromium (basically anything that is not Firefox or Safari). ESPHome has an amazing [guide](https://esphome.io/guides/physical_device_connection/) if this is your first time doing this, but to summarize, if you have a usb-port on your device, connect to it, if not you will need to connect to the `TX`, `RX`, `GND` and `3.3V/5V` with a TTY adapter. Then go into bootloader mode by pressing the "BOOT" button, if you don't have one, connect `GPIO0` to `GND`.

Once in ESPHome Web, connect your device to your computer, while going into bootloader mode, then select it in the list. Once selected, upload the firmware file you downloaded before and wait for it to finish.

### Step 2
With the device still connected to your computer,
