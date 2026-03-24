set -e

docker compose up -d
docker exec -i esphome_builder bash << 'EOF'
set -e

BUILT_OTA="/config/.esphome/build/neato-vacuum/.pioenvs/neato-vacuum/firmware.ota.bin"
BUILT_FACTORY="/config/.esphome/build/neato-vacuum/.pioenvs/neato-vacuum/firmware.factory.bin"
cd /config

rm -f dev.ota.bin
rm -f dev.factory.bin

esphome compile .local.yaml

cp $BUILT_OTA dev.ota.bin
cp $BUILT_FACTORY dev.factory.bin

chown 1000:1000 dev.ota.bin
chown 1000:1000 dev.factory.bin

# curl -X POST "http://192.168.205.199/update" \
#   -H "Accept: application/octet-stream" \
#   -F "update=@./dev.ota.bin;type=application/octet-stream"
EOF