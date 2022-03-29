import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

import FilterCities from '../filter-cities';
import LogoHeader from '../logo-header';
import UserNavigation from '../user-navigation';

import styles from './header.m.less';
import imgMobil from './back-main-mobile.jpg';
import imgTab from './back-main-tablet.jpg';
import imgDesk from './back-main-desktop.jpg';

function Header() {

	useEffect(() => {

	});
		
	return (
		<header className={styles.mainheader}>

			<picture>
					<source media="(min-width: 1280px)" srcSet={imgDesk} />
					<source media="(min-width: 768px)" srcSet={imgTab} />
					<img src={imgMobil} alt="Belgium" />
			</picture>
			<LogoHeader />
			<UserNavigation />
			<FilterCities />
		</header>
	);
}

export default Header;
