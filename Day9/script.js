document.addEventListener("DOMContentLoaded", async () => {
    const url = "https://api.jikan.moe/v4/top/anime?filter=bypopularity"
    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }
        const json = await res.json();
        const table = document.getElementById('top-table-row')
        json.data.map((data, idx) => {
            table.append(addTabelList(data))
        })
        const ctx = document.getElementById('animeChart');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: popularityNameList(json.data),
                datasets: [{
                    label: '# of Votes',
                    data: popularityList(json.data),
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
    } catch (err) {
        console.error(err.message);
    }
})

function popularityList(data) {
    let popularityArray = []
    for (let idx = 0; idx <= 5; idx++) {
        popularityArray.push(data[idx].members)
    }
    return popularityArray
}

function popularityNameList(data) {
    let popularityNameArray = []
    for (let idx = 0; idx <= 5; idx++) {
        popularityNameArray.push(data[idx].title)
    }
    return popularityNameArray
}

function addTabelList(data) {
    const animeRank = document.createElement('td')
    animeRank.innerText = data.popularity
    const animeName = document.createElement('td')
    animeName.innerText = data.title
    const tablerow = document.createElement('tr')
    tablerow.append(animeRank, animeName)
    return tablerow
}