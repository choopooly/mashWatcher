# mashWatcher

> Used in homebrewing project for mash steps notifications and mash temperaure trends.

## Context
The brewing controller during the mash phase, start a timer and start the heating elements if the sensors do not reflect the proper temperature.

We usually follow this mashing profile
 - mash in:  45min - 69c
 - mash out: 10min - 75c

The idea for this project if to send a notification for every mashing step, and also to have a graphical visualization of our temperatures during the mash.

## Details

The brewing controller send an http event every minute to mash_watcher.js

The mash_watcher.js (hosted on webtask.io) is responsible for triggering notifications when needed and forward the temperature stats.

Carbon/Grafana will handled the graphical visualization.
