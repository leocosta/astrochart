import {useEffect, useState} from 'react';
import './dignities.css';
import api from '../services/api';
import dignities, {ACCIDENTALS_DIGNITIES, ACCIDENTALS_DEBILITIES} from '../services/dignities';

function Dignities() {
    const [data, setData] = useState(null);
    const [essentialsNames, setEssentialsNames] = useState(null);
    const [dignitiesNames, setDignitiesNames] = useState(null);
    const [debilitiesNames, setDebilitiesNames] = useState(null);
    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState(`${date.getHours() === 0 ? '00': date.getHours()-1< 9 ? '0':''}${date.getHours()-1}${date.getMinutes()< 9 ? '0':''}${date.getMinutes()}`);
    const [lat, setLat] = useState('38n41');
    const [lng, setLng] = useState('9w18');
    const planetSigns = ['Q', 'R', 'S', 'T','U','V','W'];
  
    const HORIZONTAL_HR = [0, 2,7,9,14,16,18,21,24];
  
    useEffect(()=>{
    const formatedDate = `${date.getFullYear()}${date.getMonth() < 9 ? '0' : ''}${date.getMonth()+1}${date.getDate() < 9 ? '0':''}${date.getDate()}`;
  
      api.get(`dignities?date=${formatedDate}&hour=${hour}&lat=${lat}&lng=${lng}`)
      .then(res => {
        const data = res.data;
        setData(data);
        data.dignities && setEssentialsNames(Object.keys(data.dignities.essentials[0].Sun.info));
      })
    }, [setData]);
  
    useEffect(()=>{
      if(essentialsNames) {
        setDignitiesNames(essentialsNames.slice(0, essentialsNames.length - 2));
        setDebilitiesNames(essentialsNames.slice(essentialsNames.length - 2, essentialsNames.length));
      }
    }, [essentialsNames]);
  
    function drawHeader() {
      if (data){
        let response = [];
        data.dignities && data.dignities.essentials.map((planet, index)=>{
          const planetName = Object.keys(planet)[index];
          const planetSign = planetSigns[index];
          if (index < 7) response.push(<td key={planetName + index} className={'planetSign'}>{planetSign}</td>);
        })
        return response;
      } else {
        return (<td>Loading...</td>);
      }
    }
  
    function drawEssentialsDescription(dignity, rowIndex) {
        let response = [];

        data.dignities && data.dignities.essentials.map((planet, planetIndex)=>{
          const planetPath = data.dignities.essentials[planetIndex];
          const planetName = Object.keys(planet)[0];
          const planetDignity = planetPath[planetName].info[dignity];
          console.log(planetPath, planetName, planetDignity);
          
          let partialScore = ((planetDignity === planetName) && dignity.includes('Trip')) ? 3
                            :((planetDignity === planetName) && dignity === 'term') ? 2
                            :((planetDignity === planetName) && dignity === 'face') ? 1
                            : (planetDignity === planetName) ? 5 - rowIndex : 0;

                            if(rowIndex < 2 && partialScore === 0) {
            const planetDebility = planetPath[planetName].info[debilitiesNames[rowIndex]];
            partialScore = (planetDebility === planetName) ? rowIndex - 5 : 0;
          }
          const classCondition = partialScore !== 0 && partialScore > 0 ? 'positive' : partialScore !== 0 ? 'negative' : partialScore === null ? 'disabled': null;
          if (planetIndex < 7) response.push(<td key={planetName + rowIndex} className={classCondition}>{partialScore === 0 ? '': partialScore}</td>);
        });
        return response;
    }
  
    function drawAccidentalsDescription(dignity, rowIndex) {
        let response = [];

        data.dignities && data.dignities.accidentals.forEach((planet, planetIndex) => {
          const planetName = Object.keys(planet)[0];
          const debility = ACCIDENTALS_DEBILITIES[rowIndex];
          
          const isDignified = dignity !== null ? dignity.value(data, planetName, planetIndex): null;
          const isDebilitated = debility !== null ? debility.value(data, planetName, planetIndex): null;

          console.log(planetName, planetIndex, dignity, isDignified, debility, isDebilitated);
          
          let partialScore = dignity === true ? dignity.score
                            :dignity === false ? 0 : null;
          partialScore = debility === true ? debility.score
                        :debility === false ? 0 : null;
  
        //   const partialScore = null
          const classCondition = partialScore !== 0 && partialScore > 0 ? 'positive'
                                : partialScore < 0 ? 'negative'
                                : partialScore === null ? 'disabled'
                                : null;
          if (planetIndex < 7) response.push(<td key={planetName + rowIndex} className={classCondition}>{partialScore === 0 ? '': partialScore}</td>);
        });
        return response;
    }
  
    function drawPartialScore() {
        let response = [];

        data.dignities && data.dignities.essentials.forEach((planet, planetIndex) => {
            const planetKey = Object.keys(planet)[0];
            const score = planet[planetKey].score;
            const classCondition = score !== 0 && score > 0 ? 'positive' : score !== 0 ? 'negative' : score === null ? 'disabled': null;
            if (planetIndex < 7) response.push(<td key={planetIndex} className={classCondition}>{score}</td>);
        })
        return response;
    }
  
    function drawTotalScore() {
      let response = [];
      data?.dignities && data.dignities.accidentals.map(planet=>{
          const index = data.dignities.accidentals.indexOf(planet);
          const planetKey = Object.keys(planet)[0];
          const score = planet[planetKey].score;
          console.log(planetKey, score);
          const classCondition = score !== 0 && score > 0 ? 'positive' : score !== 0 ? 'negative' : score === null ? 'disabled': null;
          if (index < 7) response.push(<td key={index} className={classCondition}>{score}</td>);
        })
        return response;
    }
  
    return (
        <header className="App-header">
          <table className='dignities'>
            <thead>
              <tr className={'header'}>
                <td colSpan="2">Dignities</td>
                { drawHeader() }
                <td colSpan="2">Debilities</td>
              </tr>
            </thead>
            <tbody>
              {
                data?.dignities && dignitiesNames?.map((dignity, i) =>{
                  return (<tr key={'dignity' + i}>
                            <td colSpan={2} key={dignity + 'Label'}>{dignity}</td>
                            { drawEssentialsDescription(dignity, i) }
                            { i < 2
                              ? (<td colSpan={2} key={debilitiesNames[i]+ 'Label'}>{debilitiesNames[i]}</td>)
                              : (<td colSpan={2} key={dignity + 'Label2'} className={'disabled'}></td>)}
                            </tr>)
                })
              }
  
              <tr className={'total'}>
              <td colSpan="2">Subtotal</td>
              { dignitiesNames && drawPartialScore() }
              <td colSpan="2" className={'disabled'}></td>
              </tr>
              
              {
                data?.dignities && ACCIDENTALS_DIGNITIES?.map((dignity, i) =>{
                  return (<tr key={'dignity' + i} className={HORIZONTAL_HR.some((stop) => stop === i) ? 'divider' : null }>
                            <td key={dignity?.name + 'Label'} colSpan={2} className={!dignity ? 'disabled' : null}>{dignity?.name}</td>
                            { data.dignities && drawAccidentalsDescription(dignity, i) }
                            { ACCIDENTALS_DEBILITIES[i] !== null
                              ? (<td colSpan={2} key={ACCIDENTALS_DEBILITIES[i]?.name + 'Label'}>{ACCIDENTALS_DEBILITIES[i]?.name}</td>)
                              : (<td colSpan={2} key={ i + 'Label2'} className={'disabled'}></td>)
                            }
                          </tr>)
                })
              }
              <tr className={'total'}>
              <td colSpan="2">Total</td>
              { drawTotalScore() }
              <td colSpan="2" className={'disabled'}></td>
              </tr>
              
            </tbody>    
          </table>
  
        </header>
    );
}

export default Dignities;