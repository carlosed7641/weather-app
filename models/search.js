import axios from "axios"
import fs from 'fs'


export class Searches {
    historial = []
    dbPath = './db/database.json'

    constructor() {
        this.readDb()
    }

    get capitalizeHistory () {

        return this.historial.map(place => {
            let words = place.split(' ')
            words = words.map(w => w[0].toUpperCase() + w.substring(1))

            return words.join(' ')
        })
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es',
        }
    }

    async ciudad(place = '') {

        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            })

            const response = await instance.get()

            return response.data.features.map(({ id, place_name, center }) => ({
                id,
                name: place_name,
                lng: center[0],
                lat: center[1]
            }))


        } catch (error) {
            return []
        }
    }

    async weatherPlace(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon }
            })

            const response = await instance.get()

            const { weather, main } = response.data

            const { description } = weather[0]
            const { temp, temp_max, temp_min } = main

            return {
                description,
                temp_min,
                temp_max,
                temp
            }
        } catch (error) {
            console.log(error)
        }
    }


    addHistory(place = '') {


        if (this.historial.includes(place.toLocaleLowerCase())) return

        this.historial = this.historial.splice(0, 4)

        this.historial.unshift(place.toLocaleLowerCase())

        //Grabar en DB
        this.saveDb()
    }


    saveDb() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    readDb() {

        if (!fs.existsSync(this.dbPath)) return

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
        const data = JSON.parse(info)

        this.historial = data.historial

    }
}