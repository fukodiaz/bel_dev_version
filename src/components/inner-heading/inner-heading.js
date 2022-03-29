import React from 'react';
import {connect} from 'react-redux';

import styles from './inner-heading.m.less';

const InnerHeading = ({activeCity, visibleListOffers}) => {

	return <h2 className={styles.innerHeading}>
				{visibleListOffers.length} places to stay in {activeCity}
			</h2>;
};

const mapStateToProps = ({filterCities, visibleListOffers}) => ({
	activeCity: filterCities,
	visibleListOffers
});

export default connect(mapStateToProps)(InnerHeading);