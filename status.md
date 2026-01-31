# Project status

### Roadmap & current state

- Version 1. Current state of the project gives you basic local control
    - Neato cleaning logic
    - Will always maintain and get support
    - Occasional updates based on feature requests or bugs
- Version 2. Currently a work in progress, all the features in a non-ideal way (ETA: March 2026, if all stars align)
    - ROS2 & Neato hybrid
        - Neato cleaning logic
        - ROS2 for nogo-lines and zone cleaning, (return to dock?)
            - NOTE: Big limitation - if it goes outside of its area, all we can do is "move it back"
- Version 3. End goal of project, any lidar vacuum should be supported as long as a "driver" for each vacuum is created. (ETA: future)
    - Fully custom cleaning logic and navigation via ROS2
    - There might be limitations on how good this can be, relying on a serial interface, how fast commands can happen, etc
    - Would work with a fully custom-made robot

### Version 1

#### Version 1.2 - in beta
- Add support for Connected, D70-D85, XV-series
- Event based commands, return to dock and manual driving for D3-D7
- Full non-home assistant version
- Rework docs, add faq
- Add Home Assistant entity and automations/scripts

#### Version 1.3 - planned
- Custom state managment based on ui-state, robot-state and sensors
- Gen2 robots error strings
- If possible: push notifications for non-ha install
- Improve notifications

#### Not sure if 1.3 or 1.4
- Set schedule of gen1 and gen2 robots via esphome

#### Version 1.4 - planned
- Translations
- Use esphome package stuff to fetch from github directly


### Version 2

#### Version 2.0 - in dev
The first version of version 2, will be the latest version of version 1 but will also be sending all the data to a ROS2 server to do SLAM that then can give commands to stop and move the robot