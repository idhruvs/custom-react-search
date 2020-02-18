import React, { Component } from 'react';
import handleAPIErrors from '../../utlis/handleAPIError';
import debounce from '../../utlis/debounce';
import constants from '../../constants';
import { Loader } from '../index';
import './search.css';
const { search } = constants;

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryText: '',
      suggestions: [],
      isLoaded: true,
      cursor: 0,
      error: false
    };
  }

  handleKeyDown = e => {
    const { cursor, suggestions } = this.state;
    const { onSearchConfirmed } = this.props;
    if (e.keyCode === 38 && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }));
    } else if (e.keyCode === 40 && cursor < suggestions.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }));
    }
    if (e.keyCode === 13) {
      console.log(cursor, suggestions);
      const selectedItem = suggestions[cursor];
      const queryText = selectedItem.place_name || selectedItem.text;
      console.log(selectedItem);
      onSearchConfirmed(selectedItem);
      this.setState({ queryText, suggestions: [], cursor: 0 });
    }
  };

  initiateSearch = queryText => {
    if (queryText) {
      const cachebuster = new Date().getTime();
      fetch(
        `${search.api}/${queryText}.json?&access_token=${search.key}&cachebuster=${cachebuster}&autocomplete=true&types=place%2Ccountry`
      )
        .then(handleAPIErrors)
        .then(res => res.json())
        .then(result => {
          const { features } = result;
          this.setState({ suggestions: features, isLoaded: true, cursor: 0 });
        })
        .catch(error => {
          this.setState({
            isLoaded: true,
            suggestions: [],
            error
          });
        });
    } else {
      this.setState({ suggestions: [], isLoaded: true });
    }
  };

  handleChange(e) {
    const queryText = e.target.value;
    this.setState({ queryText });
    this.initiateSearch(e.target.value);
  }

  onSelect(item) {
    const { onSearchConfirmed } = this.props;
    this.setState({
      suggestions: [],
      queryText: item.place_name || item.text,
      cursor: 0
    });
    onSearchConfirmed(item);
  }

  render() {
    const { suggestions, cursor, error, isLoaded } = this.state;

    return (
      <section className="Search-wrapper">
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <input
            type="search"
            className="Input-section"
            placeholder="Enter a place name to search"
            name="search-query"
            label="Search Query"
            value={this.state.queryText}
            onChange={e => this.handleChange(e)}
            onKeyDown={this.handleKeyDown}
          />
        </form>
        <ul className="Autocomplete-items">
          {suggestions.map((item, i) => {
            const { place_name, text } = item;
            return (
              <li
                className={cursor === i ? 'active' : null}
                onClick={() => this.onSelect(item)}
                key={place_name || text}
              >
                {place_name || text}
              </li>
            );
          })}
        </ul>
        {!isLoaded ? (
          <aside>
            <Loader />
          </aside>
        ) : (
          ''
        )}
        {error ? (
          <blockquote>Error in fetching API Response</blockquote>
        ) : (
          <span></span>
        )}
      </section>
    );
  }
}
