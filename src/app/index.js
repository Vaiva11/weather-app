import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Favorites } from "./pages";
import { Header, Footer } from "./components";
import "./index.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [
        {
          name: "Vilnius",
          temperature: 1,
          isFavorite: false
        },
        {
          name: "Kaunas",
          temperature: 2,
          isFavorite: false
        },
        {
          name: "Siauliai",
          temperature: 3,
          isFavorite: false
        },
        {
          name: "Varena",
          temperature: 4,
          isFavorite: false
        }
      ],
      error: null
    };
  }

  // componentDidMount() {
  //   fetch(
  //     "api.openweathermap.org/data/2.5/weather?q={city name},{country code}"
  //   )
  //     .then(response => response.json())
  //     .then(json => {
  //       const cities = json.map(cities => ({
  //         ...cities
  //       }));
  //       this.setState({ cities });
  //     })
  //     .catch(() => this.setState({ error: "Something went wrong" }));
  // }

  toggleFavorite = name => {
    this.setState(state => ({
      cities: state.cities.map(city => {
        if (city.name === name) {
          return { ...city, isFavorite: !city.isFavorite };
        }
        return city;
      })
    }));
  };

  renderHome = () => {
    const { cities } = this.state;

    return <Home cities={cities} toggleFavorite={this.toggleFavorite} />;
  };

  renderFavorites = () => {
    const { cities } = this.state;

    return (
      <Favorites
        cities={cities.filter(city => city.isFavorite)}
        toggleFavorite={this.toggleFavorite}
      />
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
