#!/bin/sh
case "$1" in
    start)
		echo "Starting explorermand"
		mkdir -p /var/run/ftpexplorer
        ;;
    stop)
		echo "Stoping explorermand"
		killall -TERM explorermand 2 > /dev/null
		sleep 1
		killall -9 explorermand 2 > /dev/null
		rm -rf /var/run/ftpexplorer
		rm -rf /usr/local/AppCentral/ftpexplorer/etc/active_host.json
		;;
    restart)
        echo "Restarting explorermand"
        $0 stop
        $0 start
        ;;
    *)
        echo "usage: $0 {start|stop|restart}"
        exit 2
        ;;
esac

exit 0

