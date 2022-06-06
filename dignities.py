import sys
import json

from flatlib.datetime import Datetime
from flatlib.geopos import GeoPos
from flatlib.chart import Chart
from flatlib.dignities.essential import EssentialInfo
from flatlib.dignities.accidental import AccidentalDignity


day, hour, minute, lat, lng = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5]
date = Datetime(day, hour, minute)
pos = GeoPos(lat, lng)
chart = Chart(date, pos)
essentialDignities = []
accidentalDignities = []

for obj in chart.objects:
    essential = EssentialInfo(obj)
    accidental = AccidentalDignity(obj, chart)  

    essentialDignities.append({
        obj.id : {
        'object': obj.__dict__,
        'info': essential.getInfo(),
        'dignities': essential.getDignities(),
        'score': essential.score,
        'almutem': essential.almutem,
        'peregrine': essential.isPeregrine()
        }
        })
    
    accidentalDignities.append({
        obj.id : {
        'object': accidental.obj.__dict__,
        'score': accidental.scoreProperties,
        'house': accidental.house().__dict__,
        'houseScore': accidental.houseScore(),
        'sunRelation': accidental.sunRelation(),
        'isCazimi': accidental.isCazimi(),
        'isUnderSun':  accidental.isUnderSun(),
        'isCombust':  accidental.isCombust(),
        'light':  accidental.light(),
        'isAugmentingLight':  accidental.isAugmentingLight(),
        'orientality':  accidental.orientality(),
        'isOriental':  accidental.isOriental(),
        # 'inHouseJoy':  accidental.inHouseJoy(),
        # 'inSignJoy':  accidental.inSignJoy(),
        # 'reMutualReceptions':  accidental.reMutualReceptions(),
        # 'eqMutualReceptions':  accidental.eqMutualReceptions(),
        'aspectBenefics':  accidental.aspectBenefics(),
        'aspectMalefics':  accidental.aspectMalefics(),
        'isAuxilied':  accidental.isAuxilied(),
        'isSurrounded':  accidental.isSurrounded(),
        'isConjNorthNode':  accidental.isConjNorthNode(),
        'isConjSouthNode':  accidental.isConjSouthNode(),
        'isConjSouthNode':  accidental.isConjSouthNode(),
        'isVoidOfCurse':  accidental.isVoc(),
        # 'isFeral':  accidental.isFeral(),
        # 'haiz':  accidental.haiz(),
        # 'score': accidental.score()

        }
    })

response = json.dumps({
    'dignities': {   
        'essentials': essentialDignities,
        'accidentals': accidentalDignities
    }
})
    
print(response)