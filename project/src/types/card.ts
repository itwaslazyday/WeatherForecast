export type Weather = {
  id: number
  main: string
  description: string
  icon: string
}

export type Coord = {
  lat: number
  lon: number
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
  order: number;
  cod: number
  message: number
  cnt: number
  list: Condition[]
  city: {
    id: number
    name: string
    coord: Coord
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

export type ConditionServer = {
  dt: number
  main: {
    temp: number
    feels_like?: number
    temp_min?: number
    temp_max?: number
    pressure: number
    humidity: number
    sea_level?: number
    grnd_level?: number
    temp_kf?: number
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
  dt_txt?: string
}

