
[![release][release-badge]][release-url]

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V61PBIY6)
[![Buy me a coffee][buymeacoffee-shield]][buymeacoffee]

[buymeacoffee]: https://www.buymeacoffee.com/philip2809
[buymeacoffee-shield]: https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png
[release-url]: https://github.com/philip2809/neato-connected/releases
[release-badge]: https://img.shields.io/github/v/release/philip2809/neato-connected?style=flat-square

### [Discord](https://discord.gg/PAgwhWvyD8)

### [Sign the petition](https://openpetition.org/!wknmd)

# neato-connected

If you want to learn about the inner workings of neato robots and my findings, please go [here](./findings.md), if you want to repair your neato to regain some of the lost functionality, continue reading on this page. To make the process as easy as possible, I recommend to read the entire guide before actually doing anything. 

Since the aim of this project is quite big, and my end goal is to make a package that can be used with any lidar-powered vacuum cleaner, I have decided to split it up into stages. We are currently at stage 1, and the first number in the version will define which stage the release is for.

- Stage 1. Current state of the project gives you basic control via Home Assistant.
    - Neato cleaning logic
    - Will always maintain and get support
    - Occasional updates based on feature requests or bugs
    - (nogo-lines and return to dock MAY be possible, however, very rudimentary)
- Stage 2. Currently a work in progress, all the features in a non-ideal way (ETA: March 2026, if all stars align)
    - ROS2 & Neato hybrid
        - Neato cleaning logic
        - ROS2 for nogo-lines, return to dock and zone cleaning
            - NOTE: Big limitation - if it goes outside of its area, all we can do is "move it back"
- Stage 3. End goal of project, any lidar vacuum should be supported as long as a "driver" for each vacuum is created. (ETA: future)
    - Fully custom cleaning logic and navigation via ROS2
    - There might be limitations on how good this can be, relying on a serial interface, how fast commands can happen, etc
    - Would work with a fully custom-made robot


### What is this?

Repair your Neato Robot Vacuum to be controlled via home assistant after the shutdown of the Neato servers. The scope of this project is to give your robot at least the same functionality as when you bought it, however as the project is in a development state, the current functionalities include:
- Viewing status
- Start & stop cleaning
- Editing settings (even some hidden settings!)
- Scheduling via an home assistant automation/script

The ability to create, view and edit floormaps so the robot can get the same functionality with nogo-lines and zones is in the making.

Main card | Settings View
:-------------------------:|:-------------------------:
![ha-card](./pics/esphome/ha-card.png) |  ![ha-card-settings](./pics/esphome/ha-card-settings.png)

Now due to the shutdown of the cloud for the neato robots, there are three options to get out of this mess:
- Buy a new robot.
    - Cons: Costs $$$.
    - Pros: But maximum WAF and no skills required
- Open the robot. 
    - Cons: Skills required. 
    - Pros: WAF is likely good and price is $
- Drill through the bumper. 
    - Cons: WAF at risk. 
    - Pros: Less skills required and price is $

### What is supported?

**We would like to support all robots where a debug interface, or other controls, is accessible, but since we only have easy access to test on a D3 and D5, we can only test on those. If you have another robot, please open a discussion so we can verify that it works or add support for it!**

As far as we know, only the D3, D4, D5, D6 and D7 has the firmware `4.5.3` and currently the config is based on that so the robots that should work with that firmware are as follows:
- Confirmed working: **D3, D4, D5, D6, D7**
- Should work with some work: **D70-D85, Connected, XV-series [maybe others? please get in touch!]**

The reason this works on all neato robots is because they all have the command interface, even the robots that originally don't have any wifi will still work, since it is no longer wifi robot that is connecting to the wifi, it is the ESP device. This also removes any limitations the robots wifi may have had.

**Trickier robots**
- D8 (probably D9, D10) - These robots use a completely different board, chip and firmware, and because the debug interface seems to be behind a password lock, this cannot be controlled directly. If you have one of these and are willing to tinker, please get in touch!

### What do I need?
- You need access to an USB port or the debug pins
    - We will be going through the different options to access these pins
- An ESPHome capable device
    - I would recommend an ESP32
- Cables to connect the robot to the ESP device
- The rest depends on your install!

# Getting started!

To get this up and running you will need to connect to the debug port or usb port on the robot. The XV-series robots have the usb port on the back, the rest has it in the dustbin area, making it inaccessible when using, for these robots we need to connect via the serial debug port, you would also need to do this if you are installing it internally inside the XV-series. So sadly for this repair you will need to get some extra hardware to get it up and running; however we are happy to help you out any step along the way!

There are two ways of using this repair:
| **Without Home Assistant** | **With Home Assistant** |
|----------------------------------------|----------------------------------------|
| <ol><li>Flash ESP device with prebuilt images</li><li>Connect to robot</li><li>Configure wifi</li><li>Make sure it works</li><li>Fix ESP device inside or outside robot</li><li>Enjoy a locally connected vacuum!</ol> | <ol><li>Setup HACS and install add-ons</li><li>Setup ESPHome</li><li>Flash ESP device with your image</li><li>Connect to robot</li><li>Add ESP device to Home Assistant</li><li>Setup Home Assistant entity and card</li><li>Make sure it works</li><li>Fix ESP device inside or outside the robot</li><li>Enjoy your locally connected vacuum!</li></ol> |





























If you haven't heard of home assistant yet then this is an awesome time to learn about it! It is an open source home automation tool that puts local control and privacy first. Read more about them on their [website](https://www.home-assistant.io/) and try their [live demo](https://demo.home-assistant.io) if you want! There is a lot of great guides and information about home assistant on youtube and their forums! They also have some amazing guides on their [site](https://www.home-assistant.io/installation/) to get a Home Assistant installation going. If you have any questions or problems, don't hesitate to ask for help here in the [discussions](https://github.com/Philip2809/neato-connected/discussions) section, on our [discord](https://discord.gg/PAgwhWvyD8) or the home assistant [help](https://www.home-assistant.io/help/) page.

If you want the latest release, most stable code, please download the files from the [releases]() section. All links below will link to that! If you want the latest version, even if that is a beta, take the code directly from the files here on the `main` branch, or download a specific version from the pre releases.

First of all you should start thinking about how you want to keep your robot connected, but if you don't want to commit to opening your robot or drilling a hole in the bumper yet, you can always take the bumper off and connect an esp device to the robot and just run it via Home Assistant.

**Overview of steps:**
1. Make sure your robot's firmware is version `4.5.3`
2. Setup HACS and install required add-ons
3. Import the config to ESPHome
4. Flash the image to your ESP device
5. Connect the ESP device to your robot
6. Add the ESP device to Home Assistant
7. Setup the Home Assistant card
8. Install the ESP device on the robot
9. Enjoy your locally connected robot!

I know this might be quite a bit overwhelming, but the reason there is this many steps is to have it as detailed as possible. Once again, at any point, feel free to ask for help!

## Step 1
The ESPHome config is designed for the latest firmware version, `4.5.3`, so you will need to check which version you are on and update if you are on an older version. If you have a neato robot that does not have support for the `4.5.3` firmware, please open a discussion or write in the discord!

To check your version you can:
- If you app still works, check in there
- Connect to the robot with a usb cable, at the port where the dustbin is
    - on windows use [NeatoToolio](https://github.com/jdredd87/NeatoToolio) or connect via serial as with unix systems
    - on unix systems, connect to serial:
        1. `screen /dev/ttyUSB0 115200`
        2. Once connected send the command `GetVersion`
        3. Look for the line with `Software`, this should be `Software,4,5,3,189,0`
- Restart the robot and send a curl request to `https://<robot-ip>:4443/info` with `--ciphers ALL:@SECLEVEL=0`. This should work both once connected to a wifi and on the robot AP.

If your firmware version is not `4.5.3` then you will need to update to the latest firmware, for this you will need to download the latest firmware from [here](https://github.com/RobertSundling/neato-botvac) and try to install it. I was able to install with the original certificate and all when I factory reset my robot and didn't connect it to the internet. If you are having troubles, try the different firmware images with different certificate dates, and if nothing works, feel free to ask for help here!

## Step 2

We need to install certain add-ons to the home assistant installation to use all the features of this project.

### Home assistant add-ons
Download "ESPHome Device Builder" by
1. Going to `Settings` --> `Add-ons` --> `Add-on Store` --> `Open "ESPHome Device Builder"`.
2. Select install.
3. I would recommend to enable `Add to sidebar` and `Start on boot`. If you decide not to add it to the sidebar, you will need to open ESPHome by coming back to this page and selecting `Open web UI`.

### HACS
If you don't already have hacs, follow their guide to set it up: https://www.hacs.xyz/docs/use/. Once you have HACS setup, open it and install the following addons:
- `button-card`
    - A button element to place on a dashboard with a lot of configurations to make the card look nice.
- `browser_mod`
    - Allow for a popup when clicking on settings or holding down the spot clean button.
    - It will ask you if you want to register your browser as a device, you don't need to do this for it to work!

After installing these add-ons you need to refresh your page, however, some browsers need a hard refresh. This you can do by pressing `Ctrl + Shift + R`.

## Step 3

### ESPHome Secrets
Open the ESPHome Builder and click the "Secrets" in the top right. Make sure your secrets include at the minimum this:
```yaml
# Generate at https://esphome.io/components/api/#api-key
neato_vacuum_api: "<API_KEY>"
# Generate at https://bitwarden.com/password-generator/
neato_vacuum_ota: "<OTA_PASSWORD>"

# Your Wi-Fi SSID and password
wifi_ssid: "<WIFI_SSID>"
wifi_password: "<WIFI_PASSWORD>"
```

Once you have filled this file with your values, save it, and make sure to never share this file if asking for support etc.

If you want to add more devices, best practice is to set the api key and ota password in your secrets file. Your wifi password and ssid should also be kept here. Since the esp device will be strapped to, or inside the robot OTA (over the air) updates is quite important for this use case.

### Config file
Once back at the ESPHome main page, click the big green button in the bottom left to add a new device. Read the information, but for now, click "Continue" and either import the [`neato_vacuum.yaml`](https://github.com/philip2809/neato-connected/releases/latest/download/neato_vacuum.yaml) file, or start with an empty configuration.

**The following two steps might be hard to do, feel free to ask for help in the discord or discussions.**

Now, since you may be using a different board than I am, and this might get complicated. You will need to find out what platform to set. Here is the list of [available platforms](https://esphome.io/components/#supported-microcontrollers). 

Next, you will need to figure out which pins to use, once again this is highly dependent on your board, both based on which ones you can easily connect to, but also what is supported on your platform. In some cases, the pins labeled `TX` and `RX` cannot be used, as these are used to upload the firmware, you will need to find GPIO pins that support using UART, on the ESP32 many of the GPIO pins can be used. There are many tutorials for the different boards, here is some common ones:
- [ESP32](https://randomnerdtutorials.com/esp32-pinout-reference-gpios/)
- [ESP8266](https://randomnerdtutorials.com/esp8266-pinout-reference-gpios/)

## Step 4
Now you will need to build and flash the images onto your ESP device! While in the editor, press the "Install" button in the top right, since the device is not yet setup, select "Manual download", this will build the configuration file to an image you can flash, this might take a while on a fresh system. 

Once the image has been built, select to download in "Factory format", save this file on your computer and open [ESPHome Web](https://web.esphome.io/). Since this uses WebSerial you will need to use a chromium based browser. ESPHome has an amazing [guide](https://esphome.io/guides/physical_device_connection/) if this is your first time doing this, but to summarize, if you have a usb-port on your device, connect to it, if not you will need to connect to the `TX`, `RX`, `GND` and `3.3V/5V` with a TTY adapter. Then go into bootloader mode by pressing the "BOOT" button, if you don't have one, connect `GPIO0` to `GND`.

Once in ESPHome Web, connect your device to your computer, while going into bootloader mode, then select it in the list. Once selected, upload the firmware file you downloaded before and wait for it to finish. Once finished, it will reboot and you should see it connect to your wifi network.

## Step 5
Now you will need to connect to the robot over its serial debug port. 

To verify that everything works, either if you just want to try this out, or test what pins you can use before making a permanent installation you should take the bumper off and connect to the debug pins directly.
![debug-port-with-cables-annotated](./pics/d3/debug-port-with-cables-annotated.jpg)

| Robot | ESP |
|---|---|
|RX|TX (pin you picked)|
|3.3V|VCC / 3.3V|
|TX|RX (pin you picked)|
|GND|GND|


## Step 6

After flashing and connecting the ESP device to the robot we need to add the ESP device into Home Assistant.
1. Power the robot on
2. In Home Assistant navigate to: `Settings` --> `Devices & Services` -- `Click "Add integration"` --> `Search "ESPHome"`
3. Enter the hostname or ip address of the ESPHome device
    - If you haven't change the name of the device in the config, it is most likely `neato-vacuum.local` or `neato-vacuum.lan` depending on your router.
    - If you want to use the ip address, find what ip the device got in your router. If you decide to use the ip, make sure to set it static!
4. Click submit and the device should be added.

## Step 7
Copy the contents of [ha-card](https://github.com/philip2809/neato-connected/releases/latest/download/ha-card.yaml)

**If you have changed the name in the ESPHome config:**
1. Paste the content into a text editor
2. Go to `Developer tools` --> `States` --> `In "Filter entities" search for "_fuel_percent"`
3. There should be a result for `sensor.<ENTITY_ID>_fuel_percent`
    - This entity id is probably the same as the name you gave but lowercase and dashes changed for underscores.
4. Replace all instances of `neato_vacuum` with your `<ENTITY_ID>`


### Add the card
1. Press the pen icon in the top right on the desired dashboard
2. Press `Add card`
3. Scroll to the bottom and select `Manual`
4. Paste the contents of the card (if you changed the name, the modified one)

## Step 8
**Before you make a permanent installation, make sure it all works via Home Assistant as you want it to!**

And once you are ready for the permanent installation, there are two ways to do it:

[Externally; by drilling a hole in the bumper](./install-externally.md) | [Internally; by connecting to the debug port using a JST-XH connector (recommended)](./install-internally.md)
:-------------------------:|:-------------------------:
![cables-via-bumper](./pics/d3/cables-via-bumper.jpg) ![d3-install-outside](./pics/installs/d3-install-outside.png) | ![jay-jst-xh](./pics/installs/jay/2-install-JST-XH.jpg) ![jay-installed](./pics/installs/jay/4-installed-and-taped.jpg)


## Step 9
Now you can enjoy your locally controllable neato vacuum cleaner! Of course there are some quirks with this repair, however we feel they are worth the ability to regain functionality.

Missing features or annoying workarounds:
- Haven't found a way to tell the robot to dock via the serial interface
- Once in cleaning paused/running mode, to get the robot back into standby/idle, you need to either hold the button on the robot, or press the "STOP" button in home assistant, which will reboot the robot. You can also let the cleaning finish of course.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=philip2809/neato-connected&type=date&legend=top-left)](https://www.star-history.com/#philip2809/neato-connected&type=date&legend=top-left)

## Acknowledgements

- @Fabian Ullrich, Jiska Classen, Johannes Eger and Matthias Hollick from Secure Mobile Networking Lab
    - [Security and Privacy for IoT Ecosystems](https://tuprints.ulb.tu-darmstadt.de/handle/tuda/4937)
    - [Vacuums in the Cloud:
Analyzing Security in a Hardened IoT Ecosystem](https://www.usenix.org/system/files/woot19-paper_ullrich.pdf)
    - And all of their work on these robots, including talks etc!
- [@jeroenterheerdt](https://github.com/jeroenterheerdt) for testing, reviewing, writing the guide for installing internally and the original [neato-serial](https://github.com/jeroenterheerdt/neato-serial)
- [@algaen](https://github.com/algaen) for the info about the D8 (D9, D10?) robots
- [@tomwj](https://github.com/tomwj) for testing and pictures installing it internally in a D7
- [@RobertSundling](https://github.com/RobertSundling) for the [firmware files](https://github.com/RobertSundling/neato-botvac)

