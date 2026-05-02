# Install without Home Assistant

You can also use this repair without Home Assistant, however future versions of neato-brainslug will require a docker conatiner that is running, easiest installation will be via home assistant.

![Webserver](pics/setup/step_4-webserver-connected.png)

**Overview of steps**
1. Flash ESP device with prebuilt images
2. Connect to esp wifi
3. Configure wifi
4. Make sure it works
5. Fix ESP device inside or outside robot
6. Enjoy a locally connected vacuum & how to install updates

### Step 1
I have made some prebuilt images for recommended ESP32s, `ESP32`, `ESP32-S3` and `ESP32-C3`, if you have another ESP32 that is not listed here, ask me and I will build you one!

The easiest way to flash your ESP device is with the [Brainslug Web Flasher](https://brainslug.phma.dev/).
![Brainslug Web Flasher](pics/setup/brainslug-web-flasher.png)

1. Connect your device with a cable. (Note: many micro usb cables are power only, if one of your cables is not working, try another!)
2. Select your generation of neato and click "Connect"
3. Select your ESP32 device in the list, if you don't know which one is your ESP, unplug and replug your device to see what shows up!
4. Wait for it to connect and select "Install Neato Brainslug"
![Webflasher menu](pics/setup/brainslug-web-flasher-menu.png)
5. Follow the instructions in the web flasher.

**If you get any errors about unsupported devices, then you are not using a recommended ESP32, please ask me for a build in that case!**
**If you have multiple vacuums you will need prebuild images with different names or it will be annoying to connect to them, please ask for me for a build!** 

Once you have it installed it should go back to this menu:
![menu flashed with improv](pics/setup/brainslug-web-flasher-menu-flashed.png)
Here you can also configure the wifi settings if your device is not too exotic, if you cannot configure the wifi here, continue onto step 2.

### Step 2
With the device still connected to your computer, go to the wifi settings of your computer or phone and connect to the network hosted by the esp device.
- SSID: `neato-brainslug`
- Password: `make-it-suck-again`

Once you have connected your browser should automatically open a window to "login" to the network, you may need to see your notifications on the phone or open the web browser on a computer, but if none of that works, go to [`http://192.168.4.1/`](http://192.168.4.1/) manually. 

When you are on this site you should see the default captive portal that looks like this:
![Captive portal on esphome](./pics/setup/noha-step_1-captive-portal.png)

Now you will need to select and enter your wifi details so that the ESP device can connect to it. When you hit save, it will restart and connect to your wifi, if you entered your details incorrectly or it could not connect, the network you just connected to, `neato-brainslug` should show up once again in your wifi settings so you can try again.

Once the device has connected you need to verify that it works and you can see the web server it is hosting before we continue. For most people one of two links will bring you to the ESP device's web server:
- [`neato-vacuum.local`](http://neato-vacuum.local)
- [`neato-vacuum.lan`](http://neato-vacuum.lan)

If neither of these link work, please check that the device actually connected to your wifi and see if you can get the IP address of the ESP device. If you are still having problems or have trouble finding the IP address, feel free to ask for help.

### Step 4
When you have navigated to the site of the ESP device it should look something like this:
![Webserver disconnected](pics/setup/step_4-webserver-disconnected.png)
This is the webserver of the device. It will show up as not "loading..." since we are not connected to the robot, we are only connected to a power source so that the ESP device can be configured. Now you can connect the device to the robot via the debug port to make sure that it works are you want to! To do this:
1. Turn the robot off
2. Take of the bumper off the robot
3. Connect to the robot - if you have an `gen2` robot, proceed to [the install guide](./install-esp-device-gen2.md)
    | Robot | ESP |
    |---|---|
    |RX|GPIO17 (TX of esp device)|
    |3.3V|3.3V|
    |TX|GPIO16 (RX of esp device)|
    |GND|GND|

    When it comes to UART, TX connects to RX and RX connects to TX. 

    **ESP32-C3 HAS TX ON GPIO7 and RX ON GPIO6, so in that case just remove the "1" from the image below, connect the blue wire to GPIO6 and yellow wire to GPIO7**

    ![Connection diagram](pics/setup/step_4-connection-diagram.png)
4. Turn the robot back on, this should power up the ESP device and you can now go to the webserver interface page we saw before and the data from the robot should now show up.
    ![Webserver connected](pics/setup/step_4-webserver-connected.png)
5. Click the different buttons to make sure that it works, if you have a gen3 robot, drive it around with the manual mode!

### Step 5
Now lets install the ESP device:
- [`gen2`](./install-esp-device-gen2.md)
- [`gen3`](./install-esp-device-gen3.md)

### Step 6
Now you can enjoy your locally controllable neato vacuum cleaner.

Eventually there will be updates, either as new features or stability fixes, however all of this connecting and flashing will no longer be required since ESPHome have support for OTA-updates. To update when a new version comes out, you will need to:
1. Download the OTA update file for your device, recommended ESP32 devices is here:
    |`gen2`  | `gen3` |
    |---|---|
    | [ESP32](https://github.com/philip2809/neato-brainslug/releases/latest/download/nbs-gen2-esp32.ota.bin) | [ESP32](https://github.com/philip2809/neato-brainslug/releases/latest/download/nbs-gen3-esp32.ota.bin) |
    | [ESP32-S3](https://github.com/philip2809/neato-brainslug/releases/latest/download/nbs-gen2-esp32s3.ota.bin) | [ESP32-S3](https://github.com/philip2809/neato-brainslug/releases/latest/download/nbs-gen3-esp32s3.ota.bin) |
    | [ESP32-C3](https://github.com/philip2809/neato-brainslug/releases/latest/download/nbs-gen2-esp32c3.ota.bin) | [ESP32-C3](https://github.com/philip2809/neato-brainslug/releases/latest/download/nbs-gen3-esp32c3.ota.bin) |
2. Go to the webserver of the device and upload the file under the OTA section, then press "UPDATE"
    ![OTA update](pics/setup/step_6-webserver-ota.png)
3. Wait for it to update and restart then refresh the page, you should now be on the latest version!



