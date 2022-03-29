import React from 'react';

import ListItems from '../list-items';
import FilterCategory from '../filter-category';
import InnerHeading from '../inner-heading';
import MapMainPage from '../map-main-page';

import styles from './main-page.m.less';

const MainPage = () => {

	return (
		<main>
			<div className={styles.contentBox}>
				<InnerHeading />
				<FilterCategory />
				<div className={styles.containerOffers}>
					<ListItems />
				</div>
			</div>
			<div className={styles.mapWrapper}>
				<MapMainPage />
			</div>
		</main>
	);
};

export default MainPage;