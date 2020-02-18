import React from 'react';
import SearchHistoryListItem from '../SearchHistoryListItem/SearchHistoryListItem';
import './searchHistoryList.css';

export default props => {
  const { historyItems, deleteHistoryItem } = props;

  const onHistoryItemDelete = historyItem => {
    deleteHistoryItem(historyItem);
  };

  return (
    <section className="Search-History-Wrapper">
      {historyItems.length ? (
        <header className="Search-History-Header">Search History</header>
      ) : (
        <span></span>
      )}
      <dl>
        {historyItems.length ? (
          historyItems.map(item => (
            <dt key={item.name}>
              <SearchHistoryListItem
                deleteItem={historyItem => onHistoryItemDelete(historyItem)}
                historyItem={item}
              />
            </dt>
          ))
        ) : (
          <blockquote> No History </blockquote>
        )}
      </dl>
    </section>
  );
};
