# Install externally

The pictures here are from a D3 but should be similar for others. Please read the guide fully before doing it yourself!

## What you need
- protective cover for your work surface
- The ESP you flashed
- 8x Dupont cables (4x female-female, 4x female-male)
- Tape
- Drill
- (optional) Hot glue
- Ability to follow written instructions
- About 15 minutes of time


## Step-by-step
1. Turn the robot over, so you can see the bottom side of the robot, where the wheels are.

2. Remove the main brush cover by pulling upwards. If you have a side brush, you will need to pull that off too.

3. Remove the main brush.

4. Remove the bumper by pulling it off.

5. Drill a hole in the bumper

Bumper front | Bumper back
:-------------------------:|:-------------------------:
![bumper-front](./pics/d3/bumper-front.jpg) | ![bumper-back](./pics/d3/bumper-back.jpg)


Debug port | Debug port with bumper 
:-------------------------:|:-------------------------:
![debug-port](./pics/d3/debug-port.jpg) |  ![bumper-with-hole](./pics/d3/bumper-with-hole.jpg)


6. Pull some cables through the hole and connect them to the debug port

7. Connect the cables
![cables-via-bumper](./pics/d3/cables-via-bumper.jpg)
![cables-via-bumper](./pics/d3/pinout.png)

8. Put the bumper back on

9. Connect to the ESP like:
    | Robot | ESP |
    |---|---|
    |RX|TX|
    |3.3V|VCC / 3.3V|
    |TX|RX|
    |GND|GND|

10. Tape the esp to the side, but make sure the robot can still be flushed against the wall on the side. Also, make sure to put something where the cables come out to avoid them being squished. 

![cables-via-bumper](./pics/installs/d3-install-outside.png)
