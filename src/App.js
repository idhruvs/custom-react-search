import React, { Component } from 'react';
import './App.css';
import {
  Search,
  LocationComponent,
  SearchHistoryList
} from './components/index';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { latitude: '', longitude: '', name: '' },
      searchHistory: []
    };
  }

  onSearchConfirmed = loc => {
    const { place_name, center } = loc;
    const newLoc = {
      latitude: center[0],
      longitude: center[1],
      name: place_name
    };
    const { searchHistory } = this.state;
    const date = new Date();
    searchHistory.push({ name: place_name, date: date.toDateString() });
    this.setState({ location: newLoc, searchHistory: searchHistory });
  };

  deleteHistoryItem = item => {
    const { searchHistory } = this.state;
    const updatedHistory = searchHistory.filter(
      historyItem => historyItem.name !== item.name
    );
    this.setState({ searchHistory: updatedHistory });
  };

  render() {
    const { location, searchHistory } = this.state;
    return (
      <main>
        <section className="Search-section">
          <Search onSearchConfirmed={this.onSearchConfirmed} />
          <LocationComponent location={location} />
        </section>
        <section className="Search-History-Section">
          <SearchHistoryList
            deleteHistoryItem={item => this.deleteHistoryItem(item)}
            historyItems={searchHistory}
          />
        </section>
      </main>
    );
  }
}
