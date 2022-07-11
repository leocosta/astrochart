import {useEffect, useState} from 'react';
import api from '../services/api';
import { Stage, Layer, Group, Circle, Line, Text } from 'react-konva';

function Dignities() {
    const [data, setData] = useState(null);
    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState(`${date.getHours() === 0 ? '00': date.getHours()-1< 9 ? '0':''}${date.getHours()-1}${date.getMinutes()< 9 ? '0':''}${date.getMinutes()}`);
    const [lat, setLat] = useState('38n41');
    const [lng, setLng] = useState('9w18');
    const [stageDimention, setStageDimention] = useState(window.innerWidth);
    const center = (stageDimention)/2;
    const chartText = `Date:  ${date.toDateString()},\nHour:  ${date.toLocaleTimeString() },\nPlace:  ${lat + ';' + lng}`
    
    const lineArray = [0, 0, stageDimention * -0.45, 0];
    const termsArray = [0, 0, stageDimention * -0.38, 0];
    const anglesArray = [0, 0, stageDimention * -0.35, 0];
    const housesArray = [0, 0, stageDimention * -0.325, 0];
    
    const zodiacAngles = Array.from({length: 12}, (_, i) => i * -30);
    const facetsAngles = Array.from({length: 36}, (_, i) => i * -10);
    const fithsAngles = Array.from({length: 72}, (_, i) => i * -5);
    const unitsAngles = Array.from({length: 360}, (_, i) => -i);
    const termsAngles = [
        0,-6,-14,-21,-26,-30,
        -38,-45,-52,-56,-60,
        -67,-74,-81,-85,-90,
        -96,-103,-110,-117,-120,
        -126,-133,-139,-145,-150,
        -157,-163,-168,-174,-180,
        -186,-191,-199,-204,-210,
        -216,-224,-231,-237,-240,
        -248,-254,-260,-265,-270,
        -276,-282,-289,-295,-300,
        -306,-312,-320,-325,-330,
        -338,-344,-350,-356,-360];
    const [housesLon, setHousesLon] = useState();
    const [anglesLon, setAnglesLon] = useState();
    const [planetsLon, setPlanetsLon] = useState();
    
    // const circlesRatios = [60,100,200,240,260,280,500];
    const circlesRatios = [.9,.85,.76,.7,.65,.6,.3];

    const mercury = 'S'; const venus = 'T'; const mars = 'U';
    const jupiter = 'V'; const saturn = 'W';
    const zodiacSigns = ['A', 'B', 'C', 'D', 'E', 'F','G', 'H', 'I', 'J', 'K', 'L'];
    const planetSigns = ['Q', 'R', 'S', 'T','U','V','W', '<', '>', '@', '?'];
    const planetColors = ['gold', 'silver', 'lightgreen', 'lightyellow', 'red', '#CF9FFF',
                        'purple', '#6BA7CC', '#6BA7CC', '#6BA7CC', '#6BA7CC'];

    const planetsInFaces = [
        mars, 'Q',venus,
        mercury,'R',saturn,
        jupiter,mars,'Q',
        venus,mercury,'R',
        saturn,jupiter,mars,
        'Q',venus,mercury,
        'R',saturn,jupiter,
        mars,'Q',venus,
        mercury,'R',saturn,
        jupiter,mars,'Q',
        venus,mercury,'R',
        saturn,jupiter,mars];

    const planetsInTerms = [
        jupiter,venus,mercury,mars,saturn,
        venus,mercury,jupiter,saturn,mars,
        mercury,jupiter,venus,saturn,mars,
        mars,jupiter,mercury,venus,saturn,
        jupiter,mercury,saturn,venus,mars,
        mercury,venus,jupiter,saturn,mars,
        saturn,venus,jupiter,mercury,mars,
        mars,jupiter,venus,mercury,saturn,
        jupiter,venus,mercury,saturn,mars,
        venus,mercury,jupiter,mars,saturn,
        saturn,mercury,venus,jupiter,mars,
        venus,jupiter,mercury,mars,saturn];

    useEffect(()=>{
      const formatedDate = `${date.getFullYear()}${date.getMonth() < 9 ? '0' : ''}${date.getMonth()+1}${date.getDate() < 9 ? '0':''}${date.getDate()}`;
  
        api.get(`chart?date=${formatedDate}&hour=${hour}&lat=${lat}&lng=${lng}`)
            .then(res => {
                const data = res.data;
                const housesLon = data.houses.map(house => Math.round((house.lon  + Number.EPSILON) * -100) / 100);
                const anglesLon = data.angles.map(angle => Math.round((angle.lon  + Number.EPSILON) * -100) / 100);
                const planetsLon = data.objects.map(object => Math.round((object.lon  + Number.EPSILON) * -100) / 100);
                console.log(data);
                // console.log(housesLon[0]);
                setData(data);
                setHousesLon(housesLon);
                setAnglesLon(anglesLon);
                setPlanetsLon(planetsLon);
        });  
    },
    [setData]);
    
    useEffect(()=>{
            window.innerWidth > window.innerHeight
                ? setStageDimention(window.innerHeight)
                : setStageDimention(window.innerWidth);
        },
      [setStageDimention, window]
    );

    function drawCusps(array, points, color, strokeWidth) {
        return housesLon && array.map(angle =>
            <Line key={angle + strokeWidth}
                width={100} x={center} y={center}
                stroke={color} strokeWidth={strokeWidth}
                rotation={angle-housesLon[0]}
                closed={false} points={points}/>);
    }

    function drawCircle(ratio, fill, stroke, strokeWidth) {
        return <Circle
                    x={center}
                    y={center}
                    width={stageDimention * ratio}
                    height={stageDimention * ratio}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth = {strokeWidth}
                />
    }

    return (
        <Stage width={stageDimention} height={stageDimention}>
            <Layer key={'base'}>
                    { drawCircle(circlesRatios[0], '#282c34', '#6BA7CC', .3)}
                    { drawCusps(facetsAngles, lineArray, '#6BA7CC', .5) }
                    { drawCircle(circlesRatios[1], '#282c34', '#6BA7CC', .3)}
                    { drawCircle(circlesRatios[2], '#282c34', '#6BA7CC', .3)}
                    { drawCusps(termsAngles, termsArray, '#6BA7CC', .5) }
                    { drawCircle(circlesRatios[3], '#282c34', '#6BA7CC', .3)}
                    { drawCusps(zodiacAngles, lineArray, '#6BA7CC', 1.2) }
                    { drawCusps(facetsAngles, anglesArray, '#6BA7CC', .8) }
                    { drawCusps(fithsAngles, anglesArray, '#6BA7CC', .4) }
                    { drawCusps(unitsAngles, anglesArray, '#6BA7CC', .2) }
                    { drawCircle(circlesRatios[4], '#282c34', '#6BA7CC', .3)}
                    { planetsLon && drawCusps(planetsLon, housesArray, planetColors[8], 1)}
                    { drawCircle(circlesRatios[5], '#282c34', 'transparent', .3)}
            </Layer>

            <Layer key={'symbols'}>
                {   
                    housesLon && zodiacSigns.map((sign) => {
                        const i = zodiacSigns.indexOf(sign);
                        return <Text key={i}
                                x={(stageDimention)/2}
                                y={(stageDimention)/2}
                                offsetX={stageDimention * .425}
                                offsetY={0}
                                fontFamily={'Astro'}
                                fontSize={stageDimention * .03}
                                fill={'#3F7EB3'}
                                align="center"
                                text={zodiacSigns[i]}
                                width={30}
                                rotation={(-30*(i))-12-housesLon[0]}/>
                    })
                }  
                {   
                    housesLon && termsAngles.map((termAngle) => {
                        const i = termsAngles.indexOf(termAngle);
                        const align = (termsAngles[i] - termsAngles[i + 1])/2;
                        return <Text key={i}
                                x={(stageDimention)/2}
                                y={(stageDimention)/2}
                                offsetX={stageDimention * .384}
                                offsetY={0}
                                fontFamily={'Astro'}
                                fontSize={15}
                                fill={'#3F7EB3'}
                                align="center"
                                text={planetsInTerms[i]}
                                width={30}
                                rotation={termsAngles[i]-housesLon[0]-align + 1.5}/>
                    })
                }  
                {   
                    housesLon && facetsAngles.map((facetAngle) => {
                        const i = facetsAngles.indexOf(facetAngle);
                        return <Text key={i}
                                x={(stageDimention)/2}
                                y={(stageDimention)/2}
                                offsetX={stageDimention * .445}
                                offsetY={0}
                                fontFamily={'Astro'}
                                fontSize={15}
                                fill={'#3F7EB3'}
                                align="center"
                                text={planetsInFaces[i]}
                                width={15}
                                rotation={216 + (i * -10) - housesLon[0]}/>
                    })
                }  
            </Layer>

            <Layer key={'houses'}>
                { housesLon && drawCusps(housesLon, housesArray, '#AEDBF0', 1) }
                { anglesLon && drawCusps(anglesLon, housesArray, '#FAFEFF', 3) }
            </Layer>

            <Layer key={'planets'}>
                { planetsLon && planetSigns.map((sign) => {
                        const i = planetSigns.indexOf(sign);
                        return <Text key={i}
                                x={stageDimention/2}
                                y={stageDimention/2}
                                offsetX={stageDimention * .21}
                                offsetY={stageDimention* .21}
                                fontFamily={'Astro'}
                                fontSize={30}
                                fill={planetColors[i]}
                                strokeEnabled={true}
                                shadowForStrokeEnabled={true}
                                shadowColor={planetColors[i]}
                                shadowBlur={5}
                                text={sign}
                                angle={zodiacAngles[i]}
                                rotation={-44-housesLon[0]+planetsLon[i]}
                                />})
                }
            </Layer>
            
            <Layer key={'resume'}>
                { drawCircle(circlesRatios[6], '#282c34', '#6BA7CC', .8) }
                <Text x={(stageDimention/2)-125}
                        y={stageDimention/2-25}
                        width={250}
                        offsetX={0}
                        offsetY={0}
                        fontSize={16}
                        fill={'white'}
                        align="center"
                        text={chartText}></Text>
            </Layer>

        </Stage>
    );
}

export default Dignities;