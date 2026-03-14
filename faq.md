# Frequently Asked Questions

### Which ESP device to get?
While technically any device compatible with the ESPHome could work, ESP32s have been tested the most and is what [ESPHome also recommends](https://esphome.io/guides/faq/#recommended). TLDR; ESP32, ESP32-S3 and ESP32-C3.

**Keep in mind that some very cheaply made ESP32s sometimes have flaws where certain components might not work!**

I will try my best to keep the ESP8266 supported as well, but I am not sure how it will behave with version 2 and 3, because that will probably require a bit more RAM. The webserver might also be a bit worse on the ESP8266.

### About the robot errors/alerts
The robot status is, by default, fetched once every 2 seconds. If you have logging enabled, this creates many logs for `GetErr` and for D3-D7 `GetState`. If you see the alert/error `UI_ALERT_INVALID`, this means you have no alert/error.

### Valetudo?
For those unaware, Valetudo is a cloud replacement for a limited range of vacuum cleaners, and while adding support for the Neato vacuums would be amazing, as it is right now, it is not possible. Valetudo works by overriding the original firmware to disable SSL certificate pinning and replace the hardcoded IP address of the server it connects to. The hardcoded IP address is not a problem for the Neatos but the SSL certificate pinning is, unless there is a way to disable that, is found or a firmware without the SSL certificate pinning is released, a cloud replacement for the Neato robots will never be possible. 

Aside from that, if the certificate pinning problem is fixed, it would not be part of Valetudo for a couple of reasons:
- Valetudo requires that the entire package run on the robot, which is not possible with the Neatos, so would need to be a separate docker package like Congatudo
- They had themselves said Neato and Vorwek is something they are not supporting. See https://dustbuilder.dontvacuum.me/unsupported.txt

### Making your own firmware?
The firmware images are encrypted and signed, while it seams that the signing does not really matter, the encrypted firmware images makes it impossible to modify or create your own firmware. 

