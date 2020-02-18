import React, { Component } from 'react';
import PropTypes from 'prop-types'
import handleAPIErrors from '../../utils/handleAPIError';
import debounce from '../../utils/debounce';
import hasClickedOutside from '../../utils/hasClickedOutside';
import constants from '../../constants';
import { Loader } from '../index';
import './searchComponent.css';

const { search } = constants;

/**
 * SearchComponent
 * 1. Includes auto-complete component
 * 2. Includes functionality of making API call to autocomplete API
 * 3. Dispatches the selected search item to the parent component for further operations.
 * 
 * @example ./SearchComponent.md
 */
export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      queryText: '',
      suggestions: [],
      isLoaded: true,
      cursor: 0,
      error: false,
      
    };
    this.setNodeReference = this.setNodeReference.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.initiateSearch = debounce(this.initiateSearch.bind(this), 500)
  }

  /**
 * setNodeReference
 * Receives the node reference from the Ref API and stores it in the nodeReference attribute of the component.
 *
 * @param {node} Node
 * @public
 */
  setNodeReference(node) {
    this.nodeReference = node;
  }

  /**
 * handleClickOutside
 * Closes the suggestion list when click outside the component is detected.
 *
 * @param {event} Event
 * @public
 */
  handleClickOutside(event) {
    if(hasClickedOutside(event, this.nodeReference)){
      this.setState({suggestions: [], isLoaded: true})
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
 * handleKeyDown
 * Provides functionality to visualize selection of auto-complete suggestions
 * Listens to the keyDown event on the input element.
 *
 * @param {event} Event
 * @public
 */
  handleKeyDown(e) {
    const { cursor, suggestions } = this.state;
    const { onSearchItemSelected } = this.props;
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
      const selectedItem = suggestions[cursor];
      if(selectedItem && selectedItem.id) {
        const queryText =  selectedItem.place_name || selectedItem.text;
        onSearchItemSelected(selectedItem)
        this.setState({ queryText, suggestions: [], cursor: 0 });
      }
      
    }
  };

  /**
 * initiateSearch
 * Initiates a search for queryText provided in the arguement.
 * Executed whenever a user enters text in the input element.
 *
 * @param {queryText} String
 * @public
 */
  initiateSearch(queryText)  {
    if (queryText) {
      const cachebuster = new Date().getTime();
      fetch(
        `${search.api}/${queryText}.json?&access_token=${search.key}&cachebuster=${cachebuster}&autocomplete=true&types=place%2Ccountry`
      )
        .then(handleAPIErrors)
        .then(res => res.json())
        .then(result => {
          const { features } = result;
          if(features.length === 0){
            features.push({text: 'No Suggestions Found', id: null})
          }
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


 /**
 * handleChange
 * Monitors the input element for any change-event and initiates search on a valid query text.
 * Listens to the onChange event on the input element.
 *
 * @param {event} Event
 * @public
 */
  handleChange(event) {
    const queryText = event.target.value;
    this.setState({ queryText , isLoaded: false});
    this.initiateSearch(event.target.value);
  }

   /**
 * onSelect
 * Records the selected item from the suggestions list and dispatches it to the onSearchItemSelected function
 *
 * @param {item} MapboxFeatureObject
 * @public
 */
  onSelect(item) {
    const { onSearchItemSelected } = this.props;
    if(item.id !== null){
      this.setState({
        suggestions: [],
        queryText: item.place_name || item.text,
        cursor: 0
      });
      onSearchItemSelected(item);
    }
    
  }


  render() {
    const { suggestions, cursor, error, isLoaded } = this.state;

    return (
      <section ref={this.setNodeReference} className="Search-wrapper">
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <input
            type="search"
            className="Input-section"
            placeholder="Enter a place name to search"
            name="search"
            aria-label="Search"
            value={this.state.queryText}
            onChange={e => this.handleChange(e)}
            onKeyDown={e => this.handleKeyDown(e)}
          />
        </form>

        {/* Auto Complete Suggestions List */}
        <ol role="listbox" className="Autocomplete-items">
          {suggestions.map((item, i) => {
            const { place_name, text } = item;
            return (
              <li
                role="presentation"
                className={cursor === i ? 'active' : null}
                onClick={() => this.onSelect(item)}
                key={place_name || text}
              >
                {place_name || text}
              </li>
            );
          })}
        </ol>
        {/*  */}

        {/* API Loader Component */}
        {!isLoaded ? (
          <aside>
            <Loader />
          </aside>
        ) : (
          ''
        )}
        
        {/* Section enabled when API Response throws error */}
        {error ? (
          <blockquote>Error in fetching API Response</blockquote>
        ) : (
          <span></span>
        )}
        {/*  */}
      </section>
    );
  }
}


SearchComponent.propTypes = {
  onSearchItemSelected: PropTypes.func.isRequired
}