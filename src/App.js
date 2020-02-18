import React, { Component } from 'react';
import './App.css';
import { Search, LocationComponent } from './components/index';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { latitude: '', longitude: '', name: '' }
    };
  }

  onSearchConfirmed = loc => {
    const { place_name, center } = loc;
    const newLoc = {
      latitude: center[0],
      longitude: center[1],
      name: place_name
    };
    this.setState({ location: newLoc });
  };

  render() {
    const { location } = this.state;
    return (
      <main>
        <section className="Search-section">
          <Search onSearchConfirmed={this.onSearchConfirmed} />
          <LocationComponent location={location} />
        </section>
      </main>
    );
  }
}
