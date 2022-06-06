from flatlib.datetime import Datetime
from flatlib.geopos import GeoPos
from flatlib.chart import Chart

# date = Datetime('1947/07/15', '17:00', '+00:00')
# pos = GeoPos('2s31', '44w18')
date = Datetime('1979/10/20', '10:26', '+00:00')
pos = GeoPos('22s54', '44w11')
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
