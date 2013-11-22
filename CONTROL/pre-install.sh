#!/bin/sh

PKG_ETC_DIR="$APKG_PKG_DIR/etc"

case "$APKG_PKG_STATUS" in
	install)
		;;
	upgrade)
		cp -af $PKG_ETC_DIR/*.json $APKG_TEMP_DIR
		rm -rf $APKG_TEMP_DIR/active_host.json
		;;
	*)
		;;
esac

exit 0
