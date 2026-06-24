#!/bin/bash
# Double-click to launch the Brume de Paris demo locally.
# Keep this window open while viewing/recording. Press Ctrl+C (or close it) to stop.

cd "$(dirname "$0")" || exit 1
PORT=8782
NAME="Brume de Paris"

lsof -nP -iTCP:$PORT -sTCP:LISTEN -t 2>/dev/null | xargs kill -9 2>/dev/null
URL="http://localhost:$PORT"
echo ""
echo "  $NAME — local server"
echo "  Open in your browser:  $URL"
echo "  Keep this window open while recording. Ctrl+C to stop."
echo ""
( sleep 1 && (open "$URL" 2>/dev/null || xdg-open "$URL" 2>/dev/null) ) &
python3 -m http.server $PORT
