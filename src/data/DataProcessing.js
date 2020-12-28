const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


let max = 0;
let d = {};

const dataProcessing = (stats, geo) => {

    let data = stats.stats;

    for (const cntry in data) {
        let countryData = data[cntry].Countries;

        for (const prop in countryData) {
            let eachCountry = [countryData[prop]]
            let d_temp = eachCountry.find((s) => s['CountryCode'] === geo.properties.ISO_A2);
            if (d_temp !== undefined) {
                d = d_temp;
            }

            if (d['TotalConfirmed'] > max) {
                max = d['TotalConfirmed'];
            }
            // console.log(eachCountry)
        }
    }

    console.log(d)
    return d;
}


let info = '';
let countryName = '';
let countryStats = {};

const drawerInfo = (d) => {

    countryName = d.Country + ' (' + d.CountryCode + ')'
    countryStats = {
        'New Confirmed': d.NewConfirmed,
        'Total Confirmed': d.TotalConfirmed,
        'New Deaths': d.NewDeaths,
        'Total Deaths': d.TotalDeaths,
        'New Recovered': d.NewRecovered,
        'Total Recovered': d.TotalRecovered
    }

    info = Object.entries(countryStats).map(([key, value]) => {
        return (
            <tr>
                <td>{key}</td>
                <td>{JSON.stringify(value)}</td>
            </tr>
        )
    })

    return (
        <div className="drawerInfo">
            <h3>{countryName}</h3>
            <table>{info}</table>
        </div>
    )
}

export { geoUrl, dataProcessing, max, drawerInfo };