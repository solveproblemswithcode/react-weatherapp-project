
import React from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';




// api call api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const API_key = "423ec925fcbcab204011b35ff53b5f55";


class App extends React.Component{
  constructor() {
    super();
    this.state= {
      city: undefined,
      icon: undefined,
      name: undefined,
      celcius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    

    this.weathericon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  calCelsius(temp){
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_Weathericon(icons,rangeid){
    switch(true){
      case rangeid >= 200 && rangeid <= 232:
        this.setState({icon:this.weathericon.Thunderstorm});
        break;
        case rangeid >= 300 && rangeid <= 321:
        this.setState({icon:this.weathericon.Drizzle});
        break;
        case rangeid >= 500 && rangeid <= 532:
        this.setState({icon:this.weathericon.Rain});
        break;
        case rangeid >= 600 && rangeid <= 622:
        this.setState({icon:this.weathericon.Snow});
        break;
        case rangeid >= 701 && rangeid <= 781:
        this.setState({icon:this.weathericon.Atmosphere});
        break;
        case rangeid === 800:
        this.setState({icon:this.weathericon.Clear});
        break;
        case rangeid >= 801 && rangeid <= 804:
        this.setState({icon:this.weathericon.Clouds});
        break;
        default:
          this.setState({icon:this.weathericon.Clouds});
    }
  }

getWeather = async(e) =>{

  e.preventDefault();

  const city= e.target.elements.city.value;
  
  if (city){
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
  

  

  const response = await api_call.json();



this.setState({
  city:`${response.name}`,
  celsius: this.calCelsius(response.main.temp),
  temp_max: this.calCelsius(response.main.temp_max),
  temp_min: this.calCelsius(response.main.temp_min),
  description: response.weather[0].description,
  error: false
  
});

// Setting Icons
this.get_Weathericon(this.weathericon, response.weather[0].id);

console.log(response);

} else {
  this.setState({
    error:true
  });
}

};

    render() {
      return (
    <div className="App">
      <Form loadweather={this.getWeather} error={this.state.error}/>
      <Weather 
    
      city={this.state.city}
      weathericon={this.state.icon} 
      temp_celsius={this.state.celsius}
      temp_max={this.state.temp_max}
      temp_min={this.state.temp_min}
      description={this.state.description}
      />
    
    </div>
      );
    }

  }
  

export default App;
