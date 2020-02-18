import React from 'react';
import locationIcon from '../../assets/icons/icon-location.png';
import './locationComponent.css';

export default ({ location }) => {
	if (location.name) {
		return (
			<section className="LocationSection">
				<img className="LocationIcon" src={locationIcon} alt="Location" />
				<article className="LocationWrapper">
					<header className="LocationName">{location.name}</header>
					<section className="PositionWrapper">
						<p>Latitude {location.latitude}</p>
						<p>Longitude {location.longitude}</p>
					</section>
				</article>
			</section>
		);
	}
	return <span />;
};
