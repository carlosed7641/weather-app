import { inquirerMenu, leerInput, listarLugares, pause } from "./helpers/inquirer.js"
import { Searches } from "./models/search.js"
import "dotenv/config.js";


//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const main = async () => {

    const searches = new Searches()

    let opt

    do {
        opt = await inquirerMenu()
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const place = await leerInput('Ciudad: ')

                // Buscar lugares
                const places = await searches.ciudad(place)
                const id = await listarLugares(places)

                const { name, lat, lng } = places.find(l => l.id === id)


                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad: ', name)
                console.log('Lat: ', lat)
                console.log('Lng: ', lng)
                console.log('Temperatura: ')
                console.log('Máxima: ')
                console.log('Mínima: ')

                break
        }

        if (opt !== 0) await pause()

    } while (opt !== 0)


}

main()