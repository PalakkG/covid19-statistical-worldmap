import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapChart from '../components/MapChart';
import SideBar from '../components/SideBar';
import '../style/DataFetching.css';


const DataFetching = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://api.covid19api.com/summary',
            );
            const res = [result.data]
            setData(res);
        };

        fetchData();
    }, []);

    return (
        <>
            { data ?
                <>
                    <MapChart className="MapChart" stats={data} />
                    <SideBar stats={data} />
                </>
                :
                <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            }
        </>
    )
}

export default DataFetching;