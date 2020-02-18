import React from 'react';
import SearchHistoryListItem from '../SearchHistoryListItem/SearchHistoryListItem';
import './searchHistoryList.css';

/**
 * SearchHistoryList Component [Functional Component]
 * 1. Renders the search history-list
 * 2. Dispatches items to clearHistory to the parent component
 * 
 * @prop { historyItems } Object
 * @prop { clearSearchHistory } Function
 */
export default (props) => {
	const { historyItems, clearSearchHistory } = props;

	return (
		<section className="Search-History-Wrapper">
			{/* Conditionally rendering the Search History Title when there are items in the historyItems props */}
			{historyItems.length ? (
				<main className="Search-History-Heading-Wrapper">
					<header className="Search-History-Header">Search History</header>
					<button onClick={() => clearSearchHistory(null)} className="btn small-text History-Clear-Action">
						Clear Search History
					</button>
				</main>
			) : (
				<span />
			)}
			{/* Description List rendering the Search history items */}
			<dl className="Search-History-List-Wrapper">
				{historyItems.length ? (
					historyItems.map((item) => (
						<dt key={`${item.id}`}>
							<SearchHistoryListItem
								deleteItem={(historyItem) => clearSearchHistory(historyItem)}
								historyItem={item}
							/>
						</dt>
					))
				) : (
					// Conditionally Rendering the 'No Search history Exists' Notification
					<blockquote> No Search History Exists </blockquote>
				)}
			</dl>
		</section>
	);
};
