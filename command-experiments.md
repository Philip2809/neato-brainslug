# Experimentation with commands

If all of these experiments prove successful, the robot would be able to be driven via the serial interface fully, meaning a custom program to drive it via serial and use the lidar data to know where to drive would be possible. 

Conditions needed to make a ROS2, slam_toolbox cleaning possible, and they cannot interfere with each other:
- Rotate LDS
- Get LDS Scan periodically
- Drive
- Stop at any time, one or two wheels
- Change direction etc
- GetDigitalSensors/GetAnalogSensors?
- Get info about other sensors/state


I will need to do more experimentation on this part; but this is a command to drive forward: `SetMotor RWheelDist 3000 LWheelDist 3000 Speed 60`

Stop the wheels: `SetMotor LWheelDisable RWheelDisable`

You can at any time set the speed by sending a new command, stopping the motors can be done as stated with the disable commands, but then you need to enable them again. A faster way would be to just set the distance to 1mm. You cannot set the values to 0, those are ignored.

If you send a command with a space in the beginning the robot will say:
```
Nice try, but I'm not falling for that one again!  :P
```

I have now tested that you can send commands while receiving data and that the robot will execute them, it does do so. However I have a small problem, via esphome the `GetLdsScan` crashes my esp when the delimiter is set to the endbyte sent by the robot `\x1A`, it works when setting a line by line reading, so if the fully custom solution does come, then it would not be via esphome. Since the LDS scan takes a while to arrive, at least via the esphome console but that does however go via my ha and network, it was quite a lot faster via direct serial connection, but we would still need to queue the commands, something like:
1. GetErr (Could maybe happen every 10th loop)
2. GetDigitalSensors    (bumper, dustbin & pickup)
3. GetAnalogSensors     (drop-, mag- and wall-sensor)
4. GetLdsScan           (lidar)
- Repeat

`GetMotor` can be used to get current speed and distance traveled from an 0,0 point, however, since we will be setting the speed with the `SetMotor` commands, we already know what the speed is, and the direction we can calculate based what wheel (and its rpm) is spinning.

GetState will no longer be needed as we will be in TestMode so this will always be `UIMGR_STATE_TESTMODE`.

There is also quite a lot of [hidden commands](./hidden-commands.md).

### Raw commands
#### Keeping here for remembering

[02:16:45.118][D][uart_debug:158]: <<< "GetDigitalSensors\r\n"
[02:16:45.119][D][uart_debug:158]: <<< "Digital Sensor Name, Value\r\n"
[02:16:45.119][D][uart_debug:158]: <<< "SNSR_DC_JACK_IS_IN,0\r\n"
[02:16:45.119][D][uart_debug:158]: <<< "SNSR_DUSTBIN_IS_IN,1\r\n"
[02:16:45.129][D][uart_debug:158]: <<< "SNSR_LEFT_WHEEL_EXTENDED,0\r\n"
[02:16:45.145][D][uart_debug:158]: <<< "SNSR_RIGHT_WHEEL_EXTENDED,0\r\n"
[02:16:45.157][D][uart_debug:158]: <<< "LSIDEBIT,0\r\n"
[02:16:45.171][D][uart_debug:158]: <<< "LFRONTBIT,0\r\n"
[02:16:45.185][D][uart_debug:158]: <<< "LLDSBIT,0\r\n"
[02:16:45.200][D][uart_debug:158]: <<< "RSIDEBIT,0\r\n"
[02:16:45.212][D][uart_debug:158]: <<< "RFRONTBIT,0\r\n"
[02:16:45.223][D][uart_debug:158]: <<< "RLDSBIT,0\r\n"


[02:17:58.028][D][uart_debug:158]: <<< "GetAnalogSensors\r\n"
[02:17:58.028][D][uart_debug:158]: <<< "SensorName,Unit,Value\r\n"
[02:17:58.028][D][uart_debug:158]: <<< "BatteryVoltage,mV,14585,\r\n"
[02:17:58.028][D][uart_debug:158]: <<< "BatteryCurrent,mA,-238,\r\n"
[02:17:58.041][D][uart_debug:158]: <<< "BatteryTemperature,mC,22800,\r\n"
[02:17:58.054][D][uart_debug:158]: <<< "ExternalVoltage,mV,0,\r\n"
[02:17:58.069][D][uart_debug:158]: <<< "AccelerometerX,mG,16,\r\n"
[02:17:58.081][D][uart_debug:158]: <<< "AccelerometerY,mG,2,\r\n"
[02:17:58.096][D][uart_debug:158]: <<< "AccelerometerZ,mG,963,\r\n"
[02:17:58.113][D][uart_debug:158]: <<< "VacuumCurrent,mA,0,\r\n"
[02:17:58.128][D][uart_debug:158]: <<< "SideBrushCurrent,mA,0,\r\n"
[02:17:58.141][D][uart_debug:158]: <<< "MagSensorLeft,VAL,0,\r\n"
[02:17:58.156][D][uart_debug:158]: <<< "MagSensorRight,VAL,0,\r\n"
[02:17:58.171][D][uart_debug:158]: <<< "WallSensor,mm,255,\r\n"
[02:17:58.184][D][uart_debug:158]: <<< "DropSensorLeft,mm,19,\r\n"
[02:17:58.200][D][uart_debug:158]: <<< "DropSensorRight,mm,19,\r\n"


[02:44:43.617][D][uart_debug:158]: <<< "GetMotor\r\n"
[02:44:43.632][D][uart_debug:158]: <<< "Parameter,Value\r\n"
[02:44:43.645][D][uart_debug:158]: <<< "Brush_RPM,0\r\n"
[02:44:43.659][D][uart_debug:158]: <<< "Brush_mA,0\r\n"
[02:44:43.673][D][uart_debug:158]: <<< "Vacuum_RPM,0\r\n"
[02:44:43.686][D][uart_debug:158]: <<< "Vacuum_mA,0\r\n"
[02:44:43.701][D][uart_debug:158]: <<< "LeftWheel_RPM,0\r\n"
[02:44:43.715][D][uart_debug:158]: <<< "LeftWheel_Load%,0\r\n"
[02:44:43.730][D][uart_debug:158]: <<< "LeftWheel_PositionInMM,-365\r\n"
[02:44:43.742][D][uart_debug:158]: <<< "LeftWheel_Speed,0\r\n"
[02:44:43.757][D][uart_debug:158]: <<< "RightWheel_RPM,0\r\n"
[02:44:43.768][D][uart_debug:158]: <<< "RightWheel_Load%,0\r\n"
[02:44:43.784][D][uart_debug:158]: <<< "RightWheel_PositionInMM,-365\r\n"
[02:44:43.802][D][uart_debug:158]: <<< "RightWheel_Speed,0\r\n"
[02:44:43.812][D][uart_debug:158]: <<< "ROTATION_SPEED,0.00\r\n"
[02:44:43.830][D][uart_debug:158]: <<< "SideBrush_mA,0\r\n"

