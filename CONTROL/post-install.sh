#!/bin/sh

PKG_ETC_DIR="$APKG_PKG_DIR/etc"

case "$APKG_PKG_STATUS" in
        install)
                ;;
        upgrade)
                cp -af $APKG_TEMP_DIR/*.json $PKG_ETC_DIR
                ;;
        *)
                ;;
esac

exit 0
