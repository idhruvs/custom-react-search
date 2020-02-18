import React from 'react';
import './searchHistoryListItem.css';

export default props => {
  const { historyItem, deleteItem } = props;
  return (
    <section className="HistoryRow">
      <span className="HistoryItemName">{historyItem.name}</span>
      <time className="HistoryItemTime" dateTime={historyItem.date}>
        {historyItem.date}
      </time>
      <button
        aria-label="Close Account Info Modal Box"
        className="HistoryDeleteWrapper btn"
        onClick={() => deleteItem(historyItem)}
      >
        &times;
      </button>
    </section>
  );
};
