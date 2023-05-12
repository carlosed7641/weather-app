import axios from "axios"


export class Searches {
    historial = ['Bogotá', 'Madrid', 'Nicosia']

    constructor() {
        //TODO: Leer DB si existe
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
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
}