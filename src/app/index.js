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
      selectedOption: null,
      cities: {},
      isLoaded: false
    };
  }

  //getting countries and setting localStorage
  componentDidMount() {
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

    //getting from localStorage

    let data = "";
    if (this.state.isLoaded) {
      data = localStorage.getItem("favCities");
    }
    let favCities = data ? JSON.parse(data) : [];

    let st = this.state;

    Object.keys(st.cities).forEach(key => {
      st.cities[key].isFavorite = false;
    });

    favCities.map(key => {
      let data = st.cities[key];
      if (data) {
        data.isFavorite = true;
      }
    });

    this.setState(st);
  }

  toggleFavorite = name => {
    let st = this.state;
    let city = st.cities[name];

    if (city) {
      city.isFavorite = !city.isFavorite;
    }

    this.setState(st);
  };

  //setting localStorage
  componentWillUpdate(nextProps, nextState) {
    let favCities = [];
    Object.keys(this.state.cities).forEach(key => {
      let value = this.state.cities[key];

      if (value.isFavorite) {
        favCities.push(key);
      }
    });

    localStorage.setItem("favCities", JSON.stringify(favCities));
  }

  //getting cities
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
        this.setState({ isLoaded: true });
        json["geonames"].forEach(city => {
          if (
            city.fcode === "PPL" ||
            city.fcode === "PPLA" ||
            city.fcode === "PPLA2" ||
            city.fcode === "PPLA3" ||
            city.fcode === "PPLA4" ||
            city.fcode === "PPLC"
          ) {
            cities[city["name"]] = {
              countryCode: city["countryCode"],
              lng: city["lng"],
              lat: city["lat"],
              isFavorite: false
            };

            tempLinks.push(
              `api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${
                city.lng
              }&appid=48e0a2181dd86eda5cce3dccb60d7805`
            );
          }
        });

        this.setState({ cities });

        const promises = link =>
          fetch(link)
            .then(res => res.text())
            .then(res => console.log(res))
            .catch(res => console.log(res));

        return Promise.all(tempLinks.map(promises));
      })
      .catch(res => console.log(res));
  };

  renderHome = () => {
    const { cities } = this.state;
    const { countries } = this.state;

    return (
      <Home
        cities={cities}
        toggleFavorite={this.toggleFavorite}
        countries={countries}
        parentCallback={this.callbackFunction}
      />
    );
  };

  renderFavorites = () => {
    const { cities } = this.state;

    return <Favorites cities={cities} toggleFavorite={this.toggleFavorite} />;
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
