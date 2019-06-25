import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Favorites } from "./pages";
import { Header, Footer } from "./components";
import "./index.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: {
        Vilnius: {
          temperature: 1,
          isFavorite: false
        },
        Kaunas: {
          temperature: 2,
          isFavorite: false
        },
        Siauliai: {
          temperature: 3,
          isFavorite: false
        },
        Varena: {
          temperature: 4,
          isFavorite: false
        }
      },
      countries: [],
      error: null
    };
  }

  componentDidMount() {
    fetch("http://api.geonames.org/countryInfoJSON?username=spidee")
      .then(response => response.json())
      .then(json => {
        let countries = {};
        json["geonames"].forEach(country => {
          countries[country["countryName"]] = country["countryCode"];
        });

        this.setState({ countries });
        //console.log(Object.keys(this.state.countries));
      })
      .catch(() => this.setState({ error: "Something went wrong" }));

    //getting from localStorage

    let data = localStorage.getItem("favCities");
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

  /*componentDidMount() {
    let data = localStorage.getItem("favCities");
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
  }*/

  renderHome = () => {
    const { cities } = this.state;
    const { countries } = this.state;

    return (
      <Home
        cities={cities}
        toggleFavorite={this.toggleFavorite}
        countries={countries}
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
