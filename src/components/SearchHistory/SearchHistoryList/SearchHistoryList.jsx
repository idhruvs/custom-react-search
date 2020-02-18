import React from 'react';
import SearchHistoryListItem from '../SearchHistoryListItem/SearchHistoryListItem';
import './searchHistoryList.css';


/**
 * Search Component [Stateless Component]
 * 1. Renders the search history-list
 * 2. Dispatches items to clearHistory to the parent component
 * 
 * @prop { historyItems } Object
 * @prop { clearSearchHistory } Function
 */
export default props => {
  const { historyItems, clearSearchHistory } = props;

  return (
    <section className="Search-History-Wrapper">
      {historyItems.length ? (
        <main className="Search-History-Heading-Wrapper">
          <header className="Search-History-Header">Search History</header>
          <button
            onClick={() => clearSearchHistory(null)}
            className="btn small-text History-Clear-Action"
          >
            Clear Search History
          </button>
        </main>
      ) : (
        <span></span>
      )}
      <dl className="Search-History-List-Wrapper">
        {historyItems.length ? (
          historyItems.map(item => (
            <dt key={`${item.id}`}>
              <SearchHistoryListItem
                deleteItem={historyItem => clearSearchHistory(historyItem)}
                historyItem={item}
              />
            </dt>
          ))
        ) : (
          <blockquote> No Search History Exists </blockquote>
        )}
      </dl>
    </section>
  );
};
