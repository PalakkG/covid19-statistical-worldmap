import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomData = (props) => {

    const [customData, setCustomData] = useState(null);
    // const [status, setStatus] = useState(false);
    let startDateData = {};
    let endDateData = {};
    let lengthOfData = -1;
    let filteredStartData = {};
    let filteredEndData = {};
    let resultData = {};


    useEffect(() => {

        const url = `https://api.covid19api.com/country/${props.country}?from=${props.startDate}T00:00:00Z&to=${props.endDate}T00:00:00Z`

        const fetchData = async () => {
            const result = await axios(url,);
            const res = [result.data]
            setCustomData(res);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const triggerUseEffect = () => {
    //     setStatus(!status)
    // }

    // function calculateData () {
    //     console.log(customData)
    //     console.log("Inside customDtata function")
    // }


    const filterData = () => {
        startDateData = customData[0][0]
        lengthOfData = customData[0].length
        endDateData = customData[0][lengthOfData - 1]

        //console.log(startDateData, lengthOfData, endDateData)
        filteredStartData = {
            'Active Cases': startDateData.Active,
            'Confirmed Cases': startDateData.Confirmed,
            'Deaths': startDateData.Deaths,
            'Recovered': startDateData.Recovered
        }

        filteredEndData = {
            'Active Cases': endDateData.Active,
            'Confirmed Cases': endDateData.Confirmed,
            'Deaths': endDateData.Deaths,
            'Recovered': endDateData.Recovered
        }

        calculateData()
    }

    const calculateData = () => {

        for (const k of Object.keys(filteredStartData)) {
            // console.log(k)
            resultData[k] = filteredEndData[k] - filteredStartData[k]
        }
    }

    const printResultData = () => {
        const printData = Object.entries(resultData).map(([key, value]) => {
            return (
                <tr>
                    <td style={{ width: "72%" }}><h4 style={{ fontWeight: '700' }}>{key}</h4></td>
                    <td><h4>{JSON.stringify(value)}</h4></td>
                </tr>
            )
        })
        return printData
    }


    return (
        <>
            {customData ?
                <div>
                    {filterData()}
                    {/* {console.log(resultData)} */}
                    <div>
                        <table>
                            <tbody>
                                {printResultData()}
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <> </>
            }
        </>
    )
}

export default CustomData;