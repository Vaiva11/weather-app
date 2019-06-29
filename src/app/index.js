import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Favorites } from "./pages";
import { Header, Footer } from "./components";
import "./index.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      error: null,
      selectedOption: "",
      cities: {},
      favCities: []
    };
  }

  //getting countries and setting localStorage
  componentDidMount() {
    //getting from localStorage
    let data = localStorage.getItem("favCities");
    this.setState({ favCities: data ? JSON.parse(data) : [] });

    //getting countries
    fetch("http://api.geonames.org/countryInfoJSON?username=spidee")
      .then(response => response.json())
      .then(json => {
        let countries = {};
        json["geonames"].forEach(country => {
          countries[country["countryName"]] = country["countryCode"];
        });

        this.setState({ countries });
      })
      .catch(() => this.setState({ error: "Something went wrong" }));
  }

  toggleFavorite = name => {
    const { cities } = this.state;
    let { favCities } = this.state;

    let city = cities[name];
    if (city) {
      let countryCode = city.countryCode;
      let temperature = city.temperature;
      let icon = city.icon;

      let wasDeleted = false;
      for (let index = 0; index < favCities.length; index++) {
        if (
          favCities[index].name === name &&
          favCities[index].countryCode === countryCode
        ) {
          Object.assign(favCities, {
            temperature: city.temperature
          });

          favCities.splice(index, 1);
          wasDeleted = true;
          break;
        }
      }

      if (!wasDeleted) {
        favCities.push({ name, countryCode, temperature, icon });
      }
    }

    this.setState(favCities);
  };

  //setting localStorage
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("favCities", JSON.stringify(this.state.favCities));
  }

  //getting cities and temperature
  callbackFunction = childData => {
    this.setState({ selectedOption: childData });

    //fetch cities
    fetch(
      `http://api.geonames.org/searchJSON?username=spidee&country=${
        childData.value
      }&style=SHORT`
    )
      .then(response => response.json())
      .then(json => {
        let cities = {};
        let tempLinks = [];
        json.geonames.forEach(city => {
          if (
            city.fcode === "PPL" ||
            city.fcode === "PPLA" ||
            city.fcode === "PPLA2" ||
            city.fcode === "PPLA3" ||
            city.fcode === "PPLA4" ||
            city.fcode === "PPLC"
          ) {
            cities[city.name] = {
              countryCode: city.countryCode,
              lng: city.lng,
              lat: city.lat,
              isFavorite: false
            };

            //fetching temperature
            tempLinks.push(
              `http://api.openweathermap.org/data/2.5/weather?lat=${
                city.lat
              }&lon=${city.lng}&appid=48e0a2181dd86eda5cce3dccb60d7805`
            ); //klp
          }
        });

        const promises = link =>
          fetch(link)
            .then(res => res.json())
            .then(res => {
              Object.assign(cities[res.name], {
                temperature: Math.round(res.main.temp - 273),
                icon: res.weather[0].icon
              });

              this.setState({ cities }); //kur geresne vieta?
            })
            .catch(notFound => {
              this.setState({ error: notFound });
            });

        return Promise.all(tempLinks.map(promises));
      })
      .then(res => console.log("good"))
      .catch(res => console.log("error"));
  };

  renderHome = () => {
    const { cities, countries, favCities } = this.state;

    return (
      <Home
        cities={cities}
        toggleFavorite={this.toggleFavorite}
        countries={countries}
        favCities={favCities}
        parentCallback={this.callbackFunction}
      />
    );
  };

  renderFavorites = () => {
    const { favCities } = this.state;
    return (
      <Favorites favCities={favCities} toggleFavorite={this.toggleFavorite} />
    );
  };

  render() {
    return (
      <div className="AppLayout">
        <Router>
          <Header />
          <main>
            <Switch>
              <Route exact path="/" component={this.renderHome} />
              <Route exact path="/favorites" component={this.renderFavorites} />
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
