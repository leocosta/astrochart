import sys
import json

from flatlib.datetime import Datetime
from flatlib.geopos import GeoPos
from flatlib.chart import Chart

# date = Datetime('1947/07/15', '17:00', '+00:00')
# pos = GeoPos('2s31', '44w18')
day, hour, minute, lat, lng = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5]
date = Datetime(day, hour, minute)
pos = GeoPos(lat, lng)
chart = Chart(date, pos)
objects = []
houses = []
angles = []
dateObj = []
posObj = []

for obj in chart.objects:
    objects.append(obj.__dict__)

for obj in chart.houses:
    houses.append(obj.__dict__)

for obj in chart.angles:
    angles.append(obj.__dict__)

print({
    "objects": objects,
    "houses": houses,
    "angles": angles
    })
