import React, { Component } from 'react';
import dayjs from 'dayjs';
import {
  Search,
  LocationComponent,
  SearchHistoryList
} from './components/index';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { latitude: '', longitude: '', name: '' },
      searchHistory: []
    };
  }

  onSearchConfirmed = loc => {
    const { place_name, center, id } = loc;
    const newLoc = {
      latitude: center[0],
      longitude: center[1],
      name: place_name,
      id
    };
    const { searchHistory } = this.state;
    const date = dayjs().format('YYYY-MM-DD HH:mm');
    searchHistory.push({ name: place_name, date, id });
    this.setState({ location: newLoc, searchHistory: searchHistory });
  };

  clearSearchHistory = item => {
    if (item) {
      const { searchHistory } = this.state;
      const updatedHistory = searchHistory.filter(
        historyItem => historyItem.name !== item.name
      );
      this.setState({ searchHistory: updatedHistory });
    } else {
      this.setState({ searchHistory: [] });
    }
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
            clearSearchHistory={this.clearSearchHistory}
            historyItems={searchHistory}
          />
        </section>
      </main>
    );
  }
}
