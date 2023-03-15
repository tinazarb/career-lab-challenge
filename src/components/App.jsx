import './App.css';

import { searchArtworks } from '../utils/api';
import { SearchForm } from './SearchForm';
import { Footer } from './Footer';
import { ImageDetailsPage } from './ImageDetailsPage';
import { useState } from 'react';

export function App() {
	const [results, setResults] = useState();
	const [selectResult, setSelectResult] = useState(null);

	function onSearchSubmit(query) {
		// Search for the users's query.
		// TODO: render the results, instead of logging them to the console.
		// NOTE: `searchArtworks` currently returns local data, so that we
		// don't make too many requests to the API! Once we've built out
		// our UI, we need to make real requests!
		// @see: ./src/uitls/api.js
		searchArtworks(query).then((json) => {
			setResults(json.data);
		});
	}

	function handleArtSelect(result) {
		setSelectResult(result);
	}

	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>
			{!selectResult && <SearchForm onSearchSubmit={onSearchSubmit} />}
			{results &&
				!selectResult &&
				results.map((result) => (
					<label key={result.id}>
						<h4> Name: {result.title}</h4>
						<h5>
							Artist:{' '}
							{result.artist_title === null
								? '(Artist unknown)'
								: result.artist_title}
						</h5>
						<h6>{result.date_display}</h6>
						<button onClick={() => handleArtSelect(result)}>
							More Details
						</button>
					</label>
				))}
			{selectResult && <ImageDetailsPage artwork={selectResult} />}
			<Footer />
		</div>
	);
}
