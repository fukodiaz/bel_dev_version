import React from 'react';
import { Link } from 'react-router-dom';

import  {openModal}  from '../../utils';
import url from './login.svg';
import styles from './user-navigation.m.less';

const UserNavigation = () => {

	return (
		<ul className={styles.userList}>
			<li>
				<Link to="/" className={styles.linkLogin}
						onClick={() => openModal('[class^="modalBox"]')}>
					<span>My account</span>
					
					<p className={styles.svgBox}>
						<svg width="32" height="32">
							<use href={`${url}#login`}></use>
						</svg>
					</p>
				</Link>
			</li>
		</ul>
	);
};

export default UserNavigation;