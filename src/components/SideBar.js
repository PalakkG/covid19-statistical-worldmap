import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import '../style/SideBar.css';
import logo from '../coronavirus_logo.ico';

const SideBar = (stats) => {

    const [status, setStatus] = useState(true);

    const globalData = stats.stats[0]['Global'];
    const countryData = stats.stats[0]['Countries'];
    console.log(stats)

    const printGlobalStats = Object.entries(globalData).map(([key, value]) => {
        return (
            <tr>
                <td style={{ width: "68.5%" }}><h4>{key}</h4></td>
                <td><h4>{JSON.stringify(value)}</h4></td>
            </tr>
        )
    })

    const printCountryStats = Object.entries(countryData).map(([key, value]) => {
        return (
            <tr>
                <td style={{ width: "60%" }}><h4>{value.Country}</h4></td>
                <td><h4>{JSON.stringify(value.TotalConfirmed)}</h4></td>
            </tr>
        )
    })


    function setStatusFalse() {
        setStatus(false)
        console.log("Status changed to false")
    }

    function setStatusTrue() {
        setStatus(true)
        console.log("Status changed to true")
    }

    return (
        <>
            { status ?
                <div className="sideBar">
                    <button onClick={setStatusFalse}>
                        <div className="collapse">
                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                        </div>
                    </button>

                    <img src={logo} alt="Covid-19"></img>
                    <h1>Statistics</h1>
                    <br /> <br /><br />

                    <h2>Global:</h2>
                    <table>
                        <tbody>
                            {printGlobalStats}
                        </tbody>
                    </table>

                    <h2>Countries:</h2>
                    <div className="countryDataColumn">
                        <table>
                            <tbody>
                                <tr>
                                    <th style={{ width: "72%" }}>Country</th>
                                    <th>Total Cases</th>
                                </tr>
                                {printCountryStats}
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <button onClick={setStatusTrue}>
                    <div className="expand">
                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </div>
                </button>
            }
        </>
    )
}

export default SideBar;