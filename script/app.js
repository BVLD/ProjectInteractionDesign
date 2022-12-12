let filter, chart, startup_r, overlay, chartcount
let currentElementId;
var htmlElementOverlay = ""
var planet_data_card
var density = [];
var mass = [];
var avgTemp = []
var gravity = []
var counts = [];
var counts_labels = ["Planets", "Comets", "Moons", "Dwarf planets"]
var labels = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"]


async function on(id) {
    overlay.classList.add('open-popup');

    const ENDPOINT = `https://api.le-systeme-solaire.net/rest/bodies/${id}`;

    console.log(ENDPOINT)

    const element = document.querySelector('.js-popup');

    const request = await fetch(`${ENDPOINT}`);
    const data = await request.json();

    console.log(data.name)

    let htmlElementOverlay = ""

    htmlElementOverlay += `
            <div class="text js-textf">
                    <div class="grid-container">
                        <div class="grid-item">
                            <h1>${data.name}</h1>
                            <canvas id="ChartDataDensity" width="5" height="2"></canvas>
                            <canvas id="ChartDataGravity" width="5" height="2"></canvas>
                            <canvas id="ChartDataTemp" width="5" height="2"></canvas>
                        </div>
                    </div>
                </div>`

    element.innerHTML = htmlElementOverlay;


    const ctx = document.getElementById('ChartDataDensity');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Density"],
            datasets: [{
                label: 'Body density in g.cm3',
                data: [data.density],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxd = document.getElementById('ChartDataGravity');
    chart = new Chart(ctxd, {
        type: 'bar',
        data: {
            labels: ["Gravity"],
            datasets: [{
                label: 'Surface gravity in m.s²',
                data: [data.gravity],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxdd = document.getElementById('ChartDataTemp');
    chart = new Chart(ctxdd, {
        type: 'bar',
        data: {
            labels: ["Avg temp"],
            datasets: [{
                label: 'Mean temperature in K.',
                data: [data.avgTemp],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

function off() {
    overlay.classList.remove('open-popup');
    // document.getElementById("overlay").style.display = "none";
}

const ListenToClickEvent = function () {
    console.log("Er is geklikt a neef")
    let cards = document.querySelectorAll('.js-cardje');

    for (let card of cards) {
        card.addEventListener('click', function () {
            console.log("click")

            currentElementId = card.getAttribute('data-typeid')
            console.log(currentElementId)

            on(currentElementId);
        })
    }


}






let showResultMercury = queryResponse => {


    const Mercury_Card = document.querySelector('.js-mercury')
    console.log(queryResponse.id)

    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    let htmlElementCard = ""
    let htmlOverlay = ""

    console.log(queryResponse)
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    htmlElementCard += `
                <a href="#" data-typeid = "${queryResponse.id}" class = "c-solar-card-mercurius js-mercury js-cardje">
                    <div class="c-solar-card__text-mercurius ">
                        <h2>${queryResponse.name}</h2>
                        <p>Mass: ${queryResponse.mass.massValue} * 10^24 kg</p>
                    </div>
                </a>
            `;


    density.push(queryResponse.density)
    mass.push(queryResponse.mass.massValue)
    var tempcelcius = queryResponse.avgTemp - 273.15
    avgTemp.push(tempcelcius)
    gravity.push(queryResponse.gravity)
    // console.log(queryResponse)

    Mercury_Card.innerHTML = htmlElementCard;
    console.log(queryResponse)

    var id = queryResponse.id

    console.log(id)

    ListenToClickEvent();

};


let showResultVenus = queryResponse => {
    const Venus_Card = document.querySelector('.js-venus')
    console.log(queryResponse.id)
    let htmlElement = ""
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    htmlElement += `
            <a href="#" data-typeid = "${queryResponse.id}"
                class = "c-solar-card-mercurius js-mercury js-cardje" >
                    <div class="c-solar-card__text-mercurius ">
                        <h2>${queryResponse.name}</h2>
                        <p>Mass: ${queryResponse.mass.massValue} * 10^24 kg</p>
                    </div>
            </a>
            `;

    density.push(queryResponse.density)
    mass.push(queryResponse.mass.massValue)
    var tempcelcius = queryResponse.avgTemp - 273.15
    avgTemp.push(tempcelcius)
    gravity.push(queryResponse.gravity)
    Venus_Card.innerHTML = htmlElement;

    ListenToClickEvent();

};

let showResultEarth = queryResponse => {
    const Earth_Card = document.querySelector('.js-earth')
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    let htmlElement = ""
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    htmlElement += `
                <a href="#" data-typeid = "${queryResponse.id}" class = "c-solar-card-mercurius js-mercury js-cardje">
                    <div class="c-solar-card__text-mercurius ">
                        <h2>${queryResponse.name}</h2>
                        <p>Mass: ${queryResponse.mass.massValue} * 10^24 kg</p>
                    </div>
                </a>
            `;

    density.push(queryResponse.density)
    mass.push(queryResponse.mass.massValue)
    var tempcelcius = queryResponse.avgTemp - 273.15
    avgTemp.push(tempcelcius)
    gravity.push(queryResponse.gravity)
    Earth_Card.innerHTML = htmlElement;

    ListenToClickEvent();
};

let showResultMars = queryResponse => {
    const Mars_Card = document.querySelector('.js-mars')
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    let htmlElement = ""
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    htmlElement += `
                <a href="#" data-typeid = "${queryResponse.id}" class = "c-solar-card-mercurius js-mercury js-cardje">
                    <div class="c-solar-card__text-mercurius ">
                        <h2>${queryResponse.name}</h2>
                        <p>Mass: ${queryResponse.mass.massValue} * 10^24 kg</p>
                    </div>
                </a>
            `;

    density.push(queryResponse.density)
    mass.push(queryResponse.mass.massValue)
    var tempcelcius = queryResponse.avgTemp - 273.15
    avgTemp.push(tempcelcius)
    gravity.push(queryResponse.gravity)
    Mars_Card.innerHTML = htmlElement;

    ListenToClickEvent();
};

let showResultJupiter = queryResponse => {
    const Jupiter_Card = document.querySelector('.js-jupiter')
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    let htmlElement = ""
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    htmlElement += `
                <a href="#" data-typeid = "${queryResponse.id}" class = "c-solar-card-mercurius js-mercury js-cardje">
                    <div class="c-solar-card__text-mercurius ">
                        <h2>${queryResponse.name}</h2>
                        <p>Mass: ${queryResponse.mass.massValue} * 10^24 kg</p>
                    </div>
                </a>
            `;

    density.push(queryResponse.density)
    mass.push(queryResponse.mass.massValue)
    var tempcelcius = queryResponse.avgTemp - 273.15
    avgTemp.push(tempcelcius)
    gravity.push(queryResponse.gravity)
    Jupiter_Card.innerHTML = htmlElement;

    ListenToClickEvent();
};

let showResultSaturn = queryResponse => {
    const Saturn_Card = document.querySelector('.js-saturne')
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    let htmlElement = ""
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    htmlElement += `
                <a href="#" data-typeid = "${queryResponse.id}" class = "c-solar-card-mercurius js-mercury js-cardje">
                    <div class="c-solar-card__text-mercurius ">
                        <h2>${queryResponse.name}</h2>
                        <p>Mass: ${queryResponse.mass.massValue} * 10^24 kg</p>
                    </div>
                </a>
            `;

    density.push(queryResponse.density)
    mass.push(queryResponse.mass.massValue)
    var tempcelcius = queryResponse.avgTemp - 273.15
    avgTemp.push(tempcelcius)
    gravity.push(queryResponse.gravity)
    Saturn_Card.innerHTML = htmlElement;

    ListenToClickEvent();
};

let showResultUranus = queryResponse => {
    const Uranus_Card = document.querySelector('.js-uranus')
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    let htmlElement = ""
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    htmlElement += `
                <a href="#" data-typeid = "${queryResponse.id}" class = "c-solar-card-mercurius js-mercury js-cardje">
                    <div class="c-solar-card__text-mercurius ">
                        <h2>${queryResponse.name}</h2>
                        <p>Mass: ${queryResponse.mass.massValue} * 10^24 kg</p>
                    </div>
                </a>
            `;

    density.push(queryResponse.density)
    mass.push(queryResponse.mass.massValue)
    var tempcelcius = queryResponse.avgTemp - 273.15
    avgTemp.push(tempcelcius)
    gravity.push(queryResponse.gravity)
    Uranus_Card.innerHTML = htmlElement;

    ListenToClickEvent();
};

let showResultNeptune = queryResponse => {
    const Neptune_Card = document.querySelector('.js-neptune')
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    let htmlElement = ""
    // We gaan eerst een paar onderdelen opvullen
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    htmlElement += `
                <a href="#" data-typeid = "${queryResponse.id}" class = "c-solar-card-mercurius js-mercury js-cardje">
                    <div class="c-solar-card__text-mercurius ">
                        <h2>${queryResponse.name}</h2>
                        <p>Mass: ${queryResponse.mass.massValue} * 10^24 kg</p>
                    </div>
                </a>
            `;


    density.push(queryResponse.density)
    mass.push(queryResponse.mass.massValue)
    var tempcelcius = queryResponse.avgTemp - 273.15
    avgTemp.push(tempcelcius)
    gravity.push(queryResponse.gravity)
    Neptune_Card.innerHTML = htmlElement;

    ListenToClickEvent();
};

let showResultCountPlanet = queryResponse => {

    counts.push(queryResponse.knownCount);
    console.log(counts)
}

// let showResultCountAstroid = queryResponse => {

//     counts.push(queryResponse.knownCount);
//     console.log(counts)
// }

let showResultCountComet = queryResponse => {

    counts.push(queryResponse.knownCount);
    console.log(counts)
}

let showResulCountMoon = queryResponse => {

    counts.push(queryResponse.knownCount);
    console.log(counts)
}

let showResultCountDwarfplanet = queryResponse => {

    counts.push(queryResponse.knownCount);
    console.log(counts)
}






let getAPI = async () => {
    // Eerst bouwen we onze url op

    /*** ⚠️☠️ API-key van Martijn Loth, misbruik zal bestraft worden ☠️️️️️⚠️ ***/
    const ENDPOINT_MERCURY = `https://api.le-systeme-solaire.net/rest/bodies/mercury`;
    const ENDPOINT_VENUS = `https://api.le-systeme-solaire.net/rest/bodies/venus`;
    const ENDPOINT_EARTH = `https://api.le-systeme-solaire.net/rest/bodies/earth`;
    const ENDPOINT_MARS = `https://api.le-systeme-solaire.net/rest/bodies/mars`;
    const ENDPOINT_JUPITER = `https://api.le-systeme-solaire.net/rest/bodies/jupiter`;
    const ENDPOINT_SATURN = `https://api.le-systeme-solaire.net/rest/bodies/saturn`
    const ENDPOINT_URANUS = `https://api.le-systeme-solaire.net/rest/bodies/uranus`;
    const ENDPOINT_NEPTUNE = `https://api.le-systeme-solaire.net/rest/bodies/neptune`;
    const ENDPOINT_COUNT_PLANET = `https://api.le-systeme-solaire.net/rest/knowncount/planet`
    const ENDPOINT_COUNT_ASTROID = `https://api.le-systeme-solaire.net/rest/knowncount/asteroid`
    const ENDPOINT_COUNT_COMET = `https://api.le-systeme-solaire.net/rest/knowncount/comet`
    const ENDPOINT_DWARD_PLANET = `https://api.le-systeme-solaire.net/rest/knowncount/dwarfPlanet`
    const ENDPOINT_MOON = `https://api.le-systeme-solaire.net/rest/knowncount/moonsPlanet`


    // Met de fetch API proberen we de data op te halen.
    const request_mercury = await fetch(`${ENDPOINT_MERCURY}`);
    const data_mercury = await request_mercury.json();
    // console.log(data_mercury);

    const request_venus = await fetch(`${ENDPOINT_VENUS}`);
    const data_venus = await request_venus.json();
    // console.log(data_venus);

    const request_earth = await fetch(`${ENDPOINT_EARTH}`);
    const data_earth = await request_earth.json();
    // console.log(data_earth);

    const request_mars = await fetch(`${ENDPOINT_MARS}`);
    const data_mars = await request_mars.json();
    // console.log(data_mars);

    const request_jupiter = await fetch(`${ENDPOINT_JUPITER}`);
    const data_jupiter = await request_jupiter.json();
    // console.log(data_jupiter);

    const request_saturn = await fetch(`${ENDPOINT_SATURN}`);
    const data_saturn = await request_saturn.json();
    // console.log(data_saturn);


    const request_uranus = await fetch(`${ENDPOINT_URANUS}`);
    const data_uranus = await request_uranus.json();
    // console.log(data_uranus);

    const request_neptune = await fetch(`${ENDPOINT_NEPTUNE}`);
    const data_neptune = await request_neptune.json();
    // console.log(data_neptune);

    const request_count_planet = await fetch(`${ENDPOINT_COUNT_PLANET}`);
    const data_count_planet = await request_count_planet.json();

    // const request_count_astroid = await fetch(`${ENDPOINT_COUNT_ASTROID}`);
    // const data_count_astroid = await request_count_astroid.json();

    const request_count_comet = await fetch(`${ENDPOINT_COUNT_COMET}`);
    const data_count_comet = await request_count_comet.json();

    const request_dward_planet = await fetch(`${ENDPOINT_DWARD_PLANET}`);
    const data_dward_planet = await request_dward_planet.json();

    const request_moon = await fetch(`${ENDPOINT_MOON}`);
    const data_moon = await request_moon.json();


    // console.log(data_neptune);

    showResultMercury(data_mercury);
    showResultVenus(data_venus);
    showResultEarth(data_earth);
    showResultMars(data_mars);
    showResultJupiter(data_jupiter);
    showResultSaturn(data_saturn);
    showResultUranus(data_uranus);
    showResultNeptune(data_neptune);


    showResultCountPlanet(data_count_planet);
    // showResultCountAstroid(data_count_astroid);
    showResultCountComet(data_count_comet);
    showResulCountMoon(data_moon);
    showResultCountDwarfplanet(data_dward_planet);



    var p_data = getDataPlanet();
    // console.log(p_data.density.data);
    // LoadChart();
    draw_chart(labels, p_data.gcm3.data)
    startup_r.checked = true
};


const getDataPlanet = function () {
    const planet_data = {
        gcm3: {
            labels: labels,
            data: [density[0], density[1], density[2], density[3], density[4], density[5], density[6], density[7]],
        },
        kg: {
            labels: labels,
            data: [mass[0], mass[1], mass[2], mass[3], mass[4], mass[5], mass[6], mass[7]],
        },
        Celcius: {
            labels: labels,
            data: [avgTemp[0], avgTemp[1], avgTemp[2], avgTemp[3], avgTemp[4], avgTemp[5], avgTemp[6], avgTemp[7]],
        },
        ms2: {
            labels: labels,
            data: [gravity[0], gravity[1], gravity[2], gravity[3], gravity[4], gravity[5], gravity[6], gravity[7]],
        },

    }

    return planet_data
}


const getDataCountPlanet = function () {
    console.log("ahhaha")
    console.log(counts[0]);
    const planet_countdata = {
        counts: {
            labels: counts_labels,
            data: [counts[0], counts[1], counts[2], counts[3]],
        },
    }

    return planet_countdata
}




const filterTypesPlanetData = function () {
    filter.forEach(element => {
        console.log(element)
        element.addEventListener('change', () => {
            // console.log(element.value)
            // console.log(element.id)
            //change also the label of the datasets with UpperCase
            chart.data.datasets[0].label = element.getAttribute("data-type").toUpperCase()
            var p_data = getDataPlanet();
            console.log(p_data[element.id].data);
            draw_chart(labels, p_data[element.id].data)
        })
    });
}



const draw_chart = function (label, data) {
    if (chart) {
        chart.data.labels = label
        chart.data.datasets[0].data = data
        return chart.update()
    }
    // console.log(data)
    // console.log(density)
    const ctx = document.getElementById('myChart');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: 'Body density in g.cm3',
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    // 1 We will query the API with longitude and latitude.
    console.log('DOM geladen');
    filter = document.querySelectorAll('.js-filter');
    startup_r = document.querySelector('.js-startup');
    planet_data_card = document.querySelector('.js-overlay')
    overlay = document.getElementById("popup")
    filterTypesPlanetData();
    getAPI();
});