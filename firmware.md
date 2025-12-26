
# Firmware 3.2.0 and 4.3.5
When I got the robot it had the latest firmware version `4.3.5` but while testing the serial interface I kinda accidentally reset it to factory settings. I wanted to explore the factory firmware at some stage, but this happened earlier than I thought. The factory firmware on my robot is `3.2.0`.


When I plugged in a USB-stick to the robot I had these states/error status, once the logs were copied the firmware updated.
```
Booting Main Image
geterr
Error
200 -  (UI_ALERT_INVALID)
Alert
200 -  (UI_ALERT_INVALID)
USB state 
 Connected 
getstate
Current State is: UIMGR_STATE_USB_LOGCOPY
                                         getstate
Current State is: UIMGR_STATE_USB_LOGCOPY
```


