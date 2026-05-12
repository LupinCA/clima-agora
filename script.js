const apiKey ="8230797b52989103e21460c8b22eb9f9"

const inputCidade = document.getElementById("inputCidade")
const output = document.getElementById("outputClima")

const btnPesquisar = document.getElementById("btnPesquisar")

function mudarTema(clima, isNight){
document.body.classList.remove(
    "sunny",
    "rainy",
    "cloudy",
    "night-clear",
    "night-rainy",
    "night-cloudy"
)
if(isNight){

    if(clima === "Clear"){
        document.body.classList.add("night-clear")
    }

    else if(clima === "Rain"){
        document.body.classList.add("night-rainy")
    }

    else if(clima === "Clouds"){
        document.body.classList.add("night-cloudy")
    }

} else{
    if(clima === "Clear"){
        document.body.classList.add("sunny")
    }

    else if(clima === "Rain"){
        document.body.classList.add("rainy")
    }

    else if(clima === "Clouds"){
        document.body.classList.add("cloudy")
    }
}}

function renderizarClima(data){
const descricao = data.weather[0].description

const descricaoFormatada =
descricao.charAt(0).toUpperCase() + descricao.slice(1)
        const icon = data.weather[0].icon

        output.innerHTML = `
        <div class="weather-box">

            <img src="https://openweathermap.org/img/wn/${icon}@2x.png">

            <h2>${data.name}</h2>

            <p class="temp">${Math.round(data.main.temp)}°C</p>
            <div class="details">
            <p> Sensação térmica: ${Math.round(data.main.feels_like)}°C</p>

            <p>${descricaoFormatada}</p>
            <p>${Math.round(data.main.humidity)}% de umidade</p>
            <p>${Math.round(data.wind.speed)} m/s de velocidade do vento</p>
            </div>
</div>
        `
}

async function buscarClima(){
    const cidade = inputCidade.value.trim()
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${apiKey}&units=metric&lang=pt_br`
    if(cidade === ""){
        output.innerHTML = "Digite uma cidade"
        return
    }
    output.innerHTML = `
    <div class="loading"></div>
`
  try{

        const response = await fetch(url)

        const data = await response.json()

        if(data.cod === 404){
            output.innerHTML = "Cidade não encontrada"
            return
        }
renderizarClima(data)
inputCidade.value = ""
inputCidade.focus()

const clima = data.weather[0].main
const agora = data.dt

const porDoSol = data.sys.sunset

const isNight = agora > porDoSol

mudarTema(clima, isNight)

    } catch(error){

        output.innerHTML = "Erro ao buscar clima"

    }
}



btnPesquisar.addEventListener("click", () => {
buscarClima()
})

inputCidade.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        buscarClima()
    }
})

