import React from 'react';
import {Link} from 'react-router-dom';

import styles from './logo-header.m.less';
import urlMob from './logo-mobile-belgium.svg';
import urlTab from './logo-tablet-belgium.svg';
import urlDesk from './logo-desktop-belgium.svg';

const LogoHeader = () => {

	return (
		<Link to="/"
				className={styles.linkLogo}>
			<picture>
				<source media="(min-width: 1280px)" srcSet={urlDesk} />
				<source media="(min-width: 768px)" srcSet={urlTab} />
				<img 	src={urlMob} alt="logo image"
						className={styles.imageLogo} />
			</picture>
		</Link>
	);
};

export default LogoHeader;