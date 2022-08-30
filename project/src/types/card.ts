export type Weather = {
  id: number
  main: string
  description: string
  icon: string
}

export type Condition = {
  dt: number
  main: {
    temp: number
    feelsLike: number
    tempMin: number
    tempMax: number
    pressure: number
    humidity: number
    seaLevel: number
    grndLevel: number
    tempKf: number
  },
  weather: Weather[]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  pop: number
  sys: {
    pod: string
  },
  dtTxt: string
}

export type WeatherCard = {
  cod: number
  message: number
  cnt: number
  list: Condition[]
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}
