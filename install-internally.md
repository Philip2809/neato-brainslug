# Install internally

**Warning: before opening up the robot, make sure to open the battery compartment and remove the battery. We will include this step again in the step-by-step procedure.**

The pictures here are from a D5 but should be similar for others. Please read the guide fully before doing it yourself!

## What you need
- protective cover for your work surface
- Long T10 Torx bit + bit holder
- Philips screwdriver
- The ESP you flashed
- [One male JST-XH cable](https://www.amazon.com/dp/B0D9R3MP4G?ref=cm_sw_r_cso_cp_apan_dp_N8757APDHEV6D087T3VR&ref_=cm_sw_r_cso_cp_apan_dp_N8757APDHEV6D087T3VR&social_share=cm_sw_r_cso_cp_apan_dp_N8757APDHEV6D087T3VR&titleSource=true)
- A soldering iron
- 4 pieces of about 10 cm of wire
- 4 pieces of heat shrink tubing
- [4x Dupont connector and crimping tool](https://a.co/d/8DN4Z0P)
- Electrical tape (preferably black)
- Electrical masking tape / Kapton tape to prevent shorts
- (optional) Hot glue
- Ability to follow written instructions and basic soldering
- About 15 minutes of time

## Step-by-step
1. Solder the 4 pieces of wire to one female JST-XH cable (the one that does not have pins sticking out). Make sure to protect the soldering with heat shrink tubing so it cannot short anything.

2. Put a protective cover over your work surface as there will be some dust coming out of your robot and you don't want that on your kitchen table. A piece of cardboard, plastic or tablecloth will do.

3. Remove the dustbin from the robot.

4. Turn the robot over, so you can see the bottom side of the robot, where the wheels are.

5. Remove the main brush cover by pulling upwards. If you have a side brush, you will need to pull that off too.

6. Remove the main brush.

7. Remove the bumper by pulling it off.

8. Remove the 2 Philips screws marked yellow in the image below and open the battery compartment. Remove the battery and leave it unplugged until told to plug it back in.

9. Remove the 6 Torx screws red marked in the image below. You will need a long T10 Torx bit for that.
![Neato robot on its back. Screws to remove are marked](pics/installs/jay/1-removing-screws.jpg "Remove these screws")

10. Turn the robot back over so you can see space where the dust bin normally sits.

11. Remove two more torx screws as indicated in the image below.

![Neato robot normals ide up. Screws to remove are marked](pics/installs/jay/1a-removing-two-more-screws.jpg "Remove two more screws")

12. Pull off the top cover by pushing the two tabs at the front out of the way.

13. Double check again that you've removed the battery before continuing. There should be no LEDs on at this point.

14. Install the JST-XH cable on the connector on the front-left of the board and then run the wire up tightly across the board, under some other wires, to the right of the board.
![Close-up of Neato board with JST-XH connector and wire installed](pics/installs/jay/2-install-JST-XH.jpg "Installing the JST-XH cable")

15. Find a place for your ESP. It normally fits in the space to the right of the main board.

16. Run the wires up/under existing wires as needed so they don't stick out. It's ok to cut extra wire.

17. Add Dupont connectors to the four wires.

18. Connect the wires to the ESP, making sure you make the right connections. From left to right looking at the front of the board the wires need to be connected this way:

    | Robot | ESP |
    |---|---|
    |RX|TX|
    |3.3V|VCC / 3.3V|
    |TX|RX|
    |GND|GND|

    *Note that depending on your exact board type you might have more or less choice in which connections you use for TX/RX. One confirmed set of connections is GPIO22 for TX and GPIO21 for RX on a ESP32 D1 Mini.*

    ![Neato board with serial connections indicated](pics/installs/jay/3-connections.jpg "Making the connections to the ESP")

19. Wrap your ESP in masking tape / Kapton tape to prevent shorts. Also make sure to secure the connections to the ESP as there will be a lot of vibration. Either include them in the tape wrap or use some hot glue.
![ESP installed and taped](pics/installs/jay/4-installed-and-taped.jpg "Installing and taping the ESP")

20. Use some electrical tape on the Neato enclosure across the JST-XH cable wires to secure them.
![Closeup of JST-XH cable with electrical tape on plastic enclosure](pics/installs/jay/5-electrical-tape-1.jpg "Securing JST-XH cable")

21. Put back the top cover. Don't turn Neato over just yet.

22. Add another round of electrical tape to further secure the JST-XH cable.
![Closeup of Neato with electrical tape on plastic enclosure](pics/installs/jay/6-electrical-tape-2.jpg "Securing JST-XH cable once more")

23. Put back the two screws you removed earlier.

24. Now, turn Neato back over and put back the 6 Torx screws your removed from the bottom.

25. Reconnect battery and close battery compartment.

26. Turn Neato on and enjoy!


## Bending pins (not recommended)
You could, instead of using a JST-XH connector bind the debug pins to allow for dupont connectors to connect.

![bent-pins-dupont](./pics/installs/tom/bend-pins.png)

Bending the pins you risk breaking the board, so this method should be avoided.