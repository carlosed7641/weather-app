import { inquirerMenu, leerInput, listarLugares, pause } from "./helpers/inquirer.js"
import { Searches } from "./models/search.js"
import "dotenv/config.js";


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
                
                if (id === '0') continue

                //Guardar en DB

                const { name, lat, lng } = places.find(l => l.id === id)

                searches.addHistory(name)


                const
                    {
                        description,
                        temp_min,
                        temp_max,
                        temp
                    } = await searches.weatherPlace(lat, lng)

   
                console.clear()
                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad: ', name.green)
                console.log('Lat: ', lat)
                console.log('Lng: ', lng)
                console.log('Temperatura: ', Math.round(temp))
                console.log('Máxima: ', Math.round(temp_max))
                console.log('Mínima: ', Math.round(temp_min))
                console.log('Cómo está el clima: ', description.green)

                break

                case 2:

                searches.capitalizeHistory.forEach((p, i) => {
                    const idx = `${i + 1}.`.green
                    console.log(`${idx} ${p}`)
                })


                break
        }

        if (opt !== 0) await pause()

    } while (opt !== 0)


}

main()