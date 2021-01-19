import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import CustomData from "../components/CustomData";
import '../style/SideBar.css';
import logo from '../coronavirus_logo.ico';

const SideBar = (stats) => {

    const [status, setStatus] = useState(true);
    const [selectedCountry, setCountry] = useState('Select a country');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [resultStatus, setResultStatus] = useState(false)

    const globalData = stats.stats[0]['Global'];
    const countryData = stats.stats[0]['Countries'];
    let countrySlugs = [];
    let currentDate = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    // console.log(currentDate)

    const addSlug = (slug) => {
        countrySlugs = [...countrySlugs, slug]
    }

    // eslint-disable-next-line
    const printGlobalStats = Object.entries(globalData).map(([key, value]) => {
        if (key !== "ID") {
            return (
                <tr>
                    <td style={{ width: "68.5%" }}><h4>{key}</h4></td>
                    <td><h4>{JSON.stringify(value)}</h4></td>
                </tr>
            )
        }
    })

    const printCountryStats = Object.entries(countryData).map(([key, value]) => {
        return (
            <tr>
                <td style={{ width: "60%" }}><h4>{value.Country}</h4></td>
                <td><h4>{JSON.stringify(value.TotalConfirmed)}</h4></td>
            </tr>
        )
    })

    const printOptions = Object.entries(countryData).map(([key, value]) => {
        return (
            <option>
                {value.Slug}
                {addSlug(value.Slug)}
            </option>
        )
    })


    function setStatusFalse() {
        setStatus(false)
        //console.log("Status changed to false")
    }

    function setStatusTrue() {
        setStatus(true)
        //console.log("Status changed to true")
    }

    function changeCountry(e) {
        setResultStatus(false)
        setCountry(e.target.value)
        //console.log(e.target.value)
    }

    function changeStartDate(e) {
        setResultStatus(false)
        setStartDate(e.target.value)
    }

    function changeEndDate(e) {
        setResultStatus(false)
        setEndDate(e.target.value)
    }

    function getCustomData() {
        setResultStatus(true)
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
                    <br /> <br />

                    <h2>Global:</h2>
                    <table>
                        <tbody>
                            {printGlobalStats}
                        </tbody>
                    </table>

                    <h2>Countries:</h2>
                    <div className="overflowContainer">
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

                    <h2>Select Range:</h2>
                    <div className="overflowContainer">
                        <select name="country" onChange={changeCountry} value={selectedCountry} required>
                            <option selected>Select a country</option>
                            {printOptions}
                            {/* {console.log(countrySlugs)} */}
                        </select>
                        <div className="dates">
                            <input type="date" name="startDate"
                                min="2020-01-01" max={currentDate}
                                onChange={changeStartDate}
                                value={startDate} required>
                            </input>
                            <input type="date" name="endDate"
                                min="2020-01-01" max={currentDate}
                                onChange={changeEndDate}
                                value={endDate} defaultValue={currentDate}>
                            </input>
                        </div>
                        <button className="getResult" onClick={getCustomData}>Get Result</button>
                        {resultStatus ?
                            <CustomData country={selectedCountry} startDate={startDate} endDate={endDate} />
                            :
                            <> </>
                        }
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