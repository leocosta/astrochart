function isGeneric (attribute, data, planetName, index) {
  if (!data || !attribute || !planetName || !index) {return null};
  return data.dignities.accidentals[index][planetName][attribute];
};

function isInHouse (houses, data, planetName, index) {
  return houses.some(function (house) {
    if (!data || !planetName || !index) {return null};
    const housePath = data.dignities.accidentals[index][planetName].house;
    return housePath?.id === (housePath?.type + house);
  })
};

function isInternalPlanet (planetName) {
  return ['Venus','Mercury','Moon','Sun'].some(planet => planet === planetName);
};

function isExternalPlanet (planetName) {
  return ['Saturn','Jupiter','Mars','Sun'].some(planet => planet === planetName);
};

const dignities = {
    isPeregrine: (data, planetName, index) => {
        return data?.dignities?.accidentals[index][planetName]['peregrine'];
    },
      
    isCazimi: (data, planetName, index) => {
        if (planetName === 'Sun') return null;
        return data.dignities.accidentals[index][planetName]['isCazimi'];
    },
      
    isCombust: (data, planetName, index) => {
        if (planetName === 'Sun') return null;
        return data.dignities.accidentals[index][planetName]['isCombust'];
    },
    
    isUnderSun: (data, planetName, index) => {
        if (planetName === 'Sun') return null;
        return data.dignities.accidentals[index][planetName]['isUnderSun'];
    },
      
    freeFromSun: (data, planetName, index) => {
        if (planetName === 'Sun') return null;
        return data.dignities.accidentals[index][planetName]['isUnderSun'];
    },
      
    isAugmentingLight: (data, planetName, index) => {
        if (planetName === 'Sun') return null;
        return data.dignities.accidentals[index][planetName]['isAugmentingLight'];
    },
    
    isDiminishingLight: (data, planetName, index) => {
      if (planetName === 'Sun') return null;
      return !data.dignities.accidentals[index][planetName]['isAugmentingLight'];
    },

    isExternalsOrientals: (data, planetName, index) => {
      if(isInternalPlanet(planetName)) return null;
      return data.dignities.accidentals[index][planetName]['isOriental'];
    },
    
    isInternalsOrientals: (data, planetName, index) => {
      if(isExternalPlanet(planetName)) return null;
      return isGeneric('isOriental', data,  planetName, index);
    },

    isExternalsOcidentals: (data, planetName, index) => {
      if(isInternalPlanet(planetName)) return null;
      return !data.dignities.accidentals[index][planetName]['isOriental'];
    },
    
    isInternalsOcidentals: (data, planetName, index) => {
      if(isExternalPlanet(planetName)) return null;
      return !data.dignities.accidentals[index][planetName]['isOriental'];
    },

    isOriental: (data, planetName, index) => {
      return data.dignities.accidentals[index][planetName]['isOriental'];
    },

    isConjNorthNode: (data, planetName, index) => {
      return data.dignities.accidentals[index][planetName]['isConjNorthNode'];
    },
    
    isConjSouthNode: (data, planetName, index) => {
      return data.dignities.accidentals[index][planetName]['isConjSouthNode'];
    },

    isInHouse110: (data, planetName, index) => { return isInHouse([1,10], data,  planetName, index); },
    isInHouse12: (data, planetName, index) => { return isInHouse([12], data,  planetName, index); },
    isInHouse7411: (data, planetName, index) => { return isInHouse([7,4,11], data,  planetName, index); },
    isInHouse8: (data, planetName, index) => { return isInHouse([8], data,  planetName, index); },
    isInHouse52: (data, planetName, index) => { return isInHouse([5,2], data,  planetName, index); },
    isInHouse6: (data, planetName, index) => { return isInHouse([6], data,  planetName, index); },
    isInHouse9: (data, planetName, index) => { return isInHouse([9], data,  planetName, index); },
    isInHouse3: (data, planetName, index) => { return isInHouse([3], data,  planetName, index); },
    
    emptyFunc: (data, planetName, index) => { return null; }   
}

export default dignities;

export const ACCIDENTALS_DIGNITIES = [null,
  {name: 'reMutualReceptions', value: dignities.emptyFunc, score: 5},
  {name: 'eqMutualReceptions', value: dignities.emptyFunc, score: 4},
  {name: 'h110', value: dignities.isInHouse110, score: 5},
  {name: 'h7411', value: dignities.isInHouse7411, score: 4},
  {name: 'h52', value: dignities.isInHouse52, score: 3},
  {name: 'h9', value: dignities.isInHouse9, score: 2},
  {name: 'h3', value: dignities.isInHouse3, score: 1},
  {name: 'inSignJoy', value: dignities.emptyFunc, score: 3},
  {name: 'inHouseJoy', value: dignities.emptyFunc, score: 2},
  {name: 'Cazimi', value: dignities.isCazimi, score: 6},
  {name: 'FreeFromSun', value: dignities.freeFromSun, score: 5},
  {name: 'AugmentingLight', value: dignities.isAugmentingLight, score: 1},
  {name: 'ExternalsOrientals', value: dignities.isExternalsOrientals, score: 2},
  {name: 'InternalsOrientals', value: dignities.isInternalsOcidentals, score: 2},
  null, null,
  {name: 'isDirect', value: dignities.emptyFunc, score: 4},
  {name: 'isFast', value: dignities.emptyFunc, score: 2},
  {name: 'inConjBenefics', value: dignities.emptyFunc, score: 5},
  {name: 'isTrineAplBenefics', value: dignities.emptyFunc, score: 4},
  {name: 'isSextilAplBenefics', value: dignities.emptyFunc, score: 3},
  {name: 'isAuxiliatedBenefics', value: dignities.emptyFunc, score: 4},
  null, null,
  {name: 'isHaiz', value: dignities.emptyFunc, score: 3},
  null
];

export const ACCIDENTALS_DEBILITIES = [
  {name: 'peregrine', value: dignities.isPeregrine, score:-5},
  null, null,
  {name: 'h12', value: dignities.isInHouse12, score:-5},
  {name: 'h3', value: dignities.isInHouse8, score:-4},
  {name: 'h6', value: dignities.isInHouse6, score:-3},
  null, null, null, null,
  {name: 'Combust', value: dignities.isCombust, score:-6},
  {name: 'UnderSun', value: dignities.isUnderSun, score:-4},
  {name: 'DiminishingLight', value: dignities.isDiminishingLight, score: -1},
  {name: 'ExternalsOcidentals', value: dignities.isExternalsOcidentals, score: -2},
  {name: 'InternalsOcidentals', value: dignities.isInternalsOrientals, score: -2},
  {name: 'isConjNorthNode', value: dignities.isConjNorthNode, score: -3},
  {name: 'isConjSouthNode', value: dignities.isConjSouthNode, score: -5},
  {name: 'isRetrograde', value: dignities.emptyFunc, score: -5},
  {name: 'isSlow', value: dignities.emptyFunc, score: -2},
  {name: 'isConjMalefics', value: dignities.emptyFunc, score: -5},
  {name: 'isOppAplMalefics', value: dignities.emptyFunc, score: -4},
  {name: 'isSquareAplMalefics', value: dignities.emptyFunc, score: -3},
  {name: 'isSiegeMalefics', value: dignities.emptyFunc, score: -5},
  {name: 'isVoidOfCurse', value: dignities.emptyFunc, score: -2},
  {name: 'isFeral', value: dignities.emptyFunc, score: -3},
  {name: 'isCounterHaiz', value: dignities.emptyFunc, score: -2},
  {name: 'isMoonInViaCombusta', value: dignities.emptyFunc, score: -2},
];