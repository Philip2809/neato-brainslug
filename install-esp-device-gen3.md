# Install ESPHome device in a gen3 robot

**Please read the guide fully before doing it yourself!**

Now its time to install the ESPHome device in a more permanent way, there is a couple of ways to do this, but for all of these methods it is recommended to use this type of cable:
| |  | | |
:-:|:-:|:-:|:-:
**JST-XH to DuPont** | ![JST-XH to dupont](pics/installs/0_jst-xh.jpg) | Either buy or make this type of cable, it will be used to connect the ESP device to the debug port. You could also use dupont female-female connectors, but you will need the make the hole larger and add some protection for the cables because they would be too stiff and could break when the robot bumps into things. | https://www.aliexpress.com/item/1005006251847933.html

### Make this cable:
You will need
- [One female JST-XH cable](https://www.amazon.com/dp/B0D9R3MP4G) (the one that does not have pins sticking out)
- A soldering iron
- 4 pieces of about 10 cm of wire
- 4 pieces of heath shrink tubing
- [4x Dupont connector and crimping tool](https://a.co/d/8DN4Z0P) or 4x female DuPont connectors

Cut and strip the wires, solder the DuPont cables to the JST-XH cables, if you don't have pre-crimped cables, crimp the first. Use heat shrink to protect your soldering.

### About the JST-XH connector

Make sure the connector plugs in as far back as possible, this is easier for the internall install since you see everything a lot better. Use the following images as a referance on how far it should be plugged in!

When you plug it in it might feel like it stops after a little while, but the top part catches the connector, keep pushing | It should be pushed this far back, make sure to be careful, you don't want to break anything!
:-------------------------:|:-------------------------:
![not connected to debug port](pics/installs/7_not-connected.jpg) | ![connected to debug port](pics/installs/7_connected.jpg)

The connector just fits, I needed to press on each side of the connector a little bit at a time, that way it went in correctly, it should be about as deep as shown here | How far back the connector should be pushed with a ruler in **cm**
:-------------------------:|:-------------------------:
![not connected to debug port](pics/installs/7_how-far-to-push.jpg) | ![connected to debug port](pics/installs/7_connector-with-ruler.jpg)

#### Bending pins (not recommended)
You could, instead of using an JST-XH connector bend the debug pins to allow for dupont connectors to connect.

![bent-pins-dupont](./pics/installs/tom/bend-pins.png)

Bending the pins you risk breaking the board, so this method should be avoided.

## Choose the method to install

| Method | State |  | |
:-:|:-:|:-:|:-:
Externally | NOT Recommended, least stable, if the tape peals you will get deck debris error | ![cables-via-bumper](./pics/installs/8_cables-via-bumper.jpg) | ![d3-install-outside](./pics/installs/external.jpg)
Behind bumper cut | Recommended but you will need to cut some plastic | ![](./pics/installs/behind-bumper-cut-1.jpg) | ![](./pics/installs/behind-bumper-cut-2.jpg) 
Behind bumper small ESP | Recommended but you need an small ESP device and solder the connections, not using DuPont on the ESP | ![](./pics/installs/behind-bumper-c3.png) | Or use ANTALIFE's custom pcba cable ![](./pics/installs/pcba-cable.png)
Internally | Recommended approach | ![jay-jst-xh](./pics/installs/jay/2-install-JST-XH.jpg) | ![jay-installed](./pics/installs/jay/4-installed-and-taped.jpg)

## Step by step

**Warning: before doing anything on the robot, make sure to open the battery compartment and remove the battery. We will include this again step in the step-by-step procedure.**

### What you need
- Protective cover for your work surface
- The JST-XH cable
- The ESP you flashed
- Hot glue
- Tape
- Electrical tape (preferably black)
- Electrical masking tape / Kapton tape to prevent shorts

Internally:
- Long T10 Torx bit (Some robots also have T10 security screws)
- Philips screwdriver

Behind bumper:
- If you are cutting the plastic, a utility knife

### Let's begin!

1. Put a protective cover over your work surface as there will be some dust coming out of your robot and you don't want that on your kitchen table. A piece of cardboard, plastic or tablecloth will do.

2. Remove the dustbin from the robot.

3. Turn the robot over, so you can see the bottom side of the robot, where the wheels are.

4. Remove the main brush cover by pulling upwards. If you have a side brush, you will need to pull that off too.

5. Remove the main brush.

6. Remove the bumper by pulling it off.

7. Remove the 2 Philips screws marked yellow in the image below and open the battery compartment. Remove the battery and leave it unplugged until told to plug it back in.
![Neato robot on its back. Screws to remove are marked](pics/installs/jay/1-removing-screws.jpg "Remove these screws")

How do you want to continue?
- Internally
- Behind bumper cutting
- Behind bumper with small ESP (or custom pcba cable)
- Externally

### Internally

8. Remove the 6 Torx screws red marked in the image from before. You will need a long T10 Torx bit for that, it might be security torx.

9. Turn the robot back over so you can see space where the dust bin normally sits.

10. Remove two more torx screws as indicated in the image below.

![Neato robot normals ide up. Screws to remove are marked](pics/installs/jay/1a-removing-two-more-screws.jpg "Remove two more screws")

11. Pull of the top cover by pushing the two tabs at the front out of the way.

12. Double check again that you've removed the battery before continuing. There should be no LEDs on at this point.

13. Install the JST-XH cable on the connector on the front-left of the board and then run the wire up tightly across the board, under some other wires, to the right of the board. The connector should be plugged in as far as it goes
![Close-up of Neato board with JST-XH connector and wire installed](pics/installs/jay/2-install-JST-XH.jpg "Installing the JST-XH cable")

14. Find a place for your ESP. It normally fits in the space to the right of the main board.

15. Run the wires up/under existing wires as needed so they don't stick out. 

16. Connect the wires to the ESP, making sure you make the right connections, you should have tried what connections works for you since before!

17. Wrap your ESP in masking tape / Kapton tape to prevent shorts. Also make sure to secure the connections to the ESP as there will be a lot of vibration. Either include them in the tape wrap or use some hot glue.
![ESP installed and taped](pics/installs/jay/4-installed-and-taped.jpg "Installing and taping the ESP")

18. Use some electrical tape on the Neato enclosure across the JST-XH cable wires to secure them.
![Closeup of JST-XH cable with electrical tape on plastic enclosure](pics/installs/jay/5-electrical-tape-1.jpg "Securing JST-XH cable")

19. Put back the top cover. Don't turn Neato over just yet.

20. Add another round of electrical tape to further secure the JST-XH cable.
![Closeup of Neato with electrical tape on plastic enclosure](pics/installs/jay/6-electrical-tape-2.jpg "Securing JST-XH cable once more")

21. Put back the two screws you removed earlier.

22. Now, turn Neato back over and put back the 6 Torx screws your removed from the bottom.

23. Reconnect battery and close battery compartment.

24. Turn Neato on and enjoy!

### Behind bumper - cutting
8. Score the side and bottom of the pastic part under the debug port and break it off
![](./pics/installs/behind-bumper-cut-1.jpg)

9. Cover up all the exposed metal parts of the mainboard and drop sensor to avoid shorts

10. Connect the JST-XH connector the the debug port and connect/solder the other end to the ESP device - see the section above about the JST-XH connector! Put some hot glue or wrap it very well in tape to make sure it does not disconnect!
![](pics/installs/9_connected-hot-glue.jpg)
*For this install you don't need to bend the pins, reused the image, the important is the hot glue*

11. Once the connectors are secure to the ESP device, place it in the cavity and tape it all up!
![](./pics/installs/behind-bumper-cut-2.jpg)

12. If needed some struts on the bumper may need to be broken out/cut
![](./pics/installs/behind-bumper-cut-3.jpg)

13. Put the bumper back on, battery back into its place, battery cover on, brush in its place and enjoy!


### Behind bumper - small ESP device

8. Either use ANTALIFE's custom pcba cable or:
    1. Make sure how you want the ESP device to fit
    2. Connect the JST-XH connector the the debug port and route the cable to the place the ESP device will go, make it as flat as possible, if you can route it behind the plastic - see the section above about the JST-XH connector!
    3. Solder the cables to the ESP device
    4. Secure the ESP device in its place and make the cable as flush as possbile, secure it with tape or hot glue

If using the JST-XH or self made cable, try to route it like this | ANTALIFE's custom pcba cable
:-------------------------:|:-------------------------:
![](pics/installs/behind-bumper-c3.png)  | ![](pics/installs/pcba-cable.png)  

9. If needed some struts on the bumper may need to be broken out/cut
![](./pics/installs/behind-bumper-cut-3.jpg)

10. Put the bumper back on, battery back into its place, battery cover on, brush in its place and enjoy!



### Externally
8. Drill a hole in the bumper

Bumber front | Bumber back
:-------------------------:|:-------------------------:
![bumper-front](./pics/d3/bumper-front.jpg) | ![bumper-back](./pics/d3/bumper-back.jpg)


Debug port | Debug port with bumber 
:-------------------------:|:-------------------------:
![debug-port](./pics/d3/debug-port.jpg) |  ![bumper-with-hole](./pics/d3/bumper-with-hole.jpg)


9. Route the JST-XH thour the hole and connect them to the debug port
![Route the JST-XH throuhg bumper](pics/installs/6_cable-in-bumper.jpg)


10. Plug the JST-XH connector into the debug port - see the section above about the JST-XH connector!
![Plug the JST-XH connector into the debug port](pics/installs/7_plug-cable-in.jpg)


11. Put the bumper back on and make sure the cable is out

Make sure the cables come out like this | The cables should reach the handle like this
:-------------------------:|:-------------------------:
![not connected to debug port](pics/installs/8_cables-via-bumper.jpg) | ![connected to debug port](pics/installs/8_cables-to-handle.jpg)

12. Connect (and bend the pins) the ESP device to the robot
Depedning on how your ESP device looks like, you may need, like me, to bend the pins to fit it in a better way, it is to make sure the cables don't interfere with the lidar.

Place your ESP device down | Connect dupont cables to the pins you want to bend | Bend the pins out towards the side like this, don't use too much force!
:-------------------------:|:-------------------------:|:-------------------------:
![bend step 1](pics/installs/9_bend-1.jpg) | ![bend step 2](pics/installs/9_bend-2.jpg) | ![bend step 3](pics/installs/9_bend-3.jpg)

Now you need to connect the cables from the debug port to the ESP device

Based on above, on my ESP device with this adapter cable, I needed to connect like this | Put some hot glue on the connections to make sure they are not going anywhere
:-------------------------:|:-------------------------:
![bend step 1](pics/installs/9_connected.jpg)  | ![bend step 1](pics/installs/9_connected-hot-glue.jpg)


13. Secure the ESP in the handle area

You should now have your ESP device connected to the robot like this | Place the ESP device like this; MAKE SURE YOU CAN CLOSE THE DUST BIN!!
:-------------------------:|:-------------------------:
![secure step 1](pics/installs/10_step-1.jpg)  | ![secure step 2](pics/installs/10_step-2.jpg)  

Put some tape on the cables, hole and ESP device to keep them in place| Put more tape over the ESP device to secure it and avoid shorts. You can also like me put a dot of hot glue
:-------------------------:|:-------------------------:
![secure step 3](pics/installs/10_step-3.jpg)  | ![secure step 4](pics/installs/10_step-4.jpg)  

Cover all cable but a little piece (needed for the bumper action to work) with tape to avoid it getting cought on anything.

![Installed externally](./pics/installs/external.jpg)

14. Put the bumper back on, battery back into its place, battery cover on, brush in its place and enjoy!