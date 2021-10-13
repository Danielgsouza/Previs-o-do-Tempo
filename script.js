document.querySelector('.busca').addEventListener('submit',async(event) =>{
    event.preventDefault()

    let input = document.querySelector('#searchInput').value
    if (input !== '') {
        showWarning('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=9812d3d112a064b71367b98015247c53&units=metric&language=pt_br`

        let results = await fetch(url)
        let json = await results.json()

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                Country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
                
            })
        }else{
            clearInfo()
            showWarning('Não encontramos esta localização.')
        }
    }
    else{
        clearInfo()
    }
})

function showInfo(json) {
    showWarning('')

    document.querySelector('.resultado').style.display = 'block'

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.Country}` 
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>°C</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`
    console.log(json)
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}

function clearInfo() {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}