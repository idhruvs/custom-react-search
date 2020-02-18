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

  /**
 * onSearchItemSelected
 * Associated with search-item selection functionality
 * Updates the searchHistory with new searchItems.
 * 
 * @param { searchItem } MapboxFeatureObject
 */
  onSearchItemSelected = searchItem => {
    const { place_name, center, id } = searchItem;
    const newLoc = {
      latitude: center[0],
      longitude: center[1],
      name: place_name
    };
    const { searchHistory } = this.state;
    const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    searchHistory.push({ name: place_name, date, id : `${id}-${new Date().getTime()}`});
    this.setState({ location: newLoc, searchHistory: searchHistory });
  };


  /**
   * clearSearchHistory
   * Clears the search history based on the item provided in the arguement
   * If the item provided in the arguement is null, it clears all the history stored in the state.
   * 
   * @param { item } MapboxFeatureObject || null
   */
  clearSearchHistory = item => {
    if (item) {
      const { searchHistory } = this.state;
      const updatedHistory = searchHistory.filter(
        historyItem => historyItem.id !== item.id
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
          <Search onSearchItemSelected={this.onSearchItemSelected} />
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
