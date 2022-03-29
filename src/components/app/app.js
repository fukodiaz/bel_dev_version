import React, {Component} from 'react';
import {Routes, Route} from 'react-router-dom';

import Header from '../header';
import MainPage from '../main-page';
import PageDetails from '../page-details';
import Modal from '../modal';
import ModalMessage from '../modal-message';

import styles from './app.m.less';

export default class App extends Component {

	render() {
		return (
			<div className={styles.mainWrapper}>
				<Header />
				<Routes>
					<Route path="/" exact element={<MainPage />} />
					<Route path=":id" element={<PageDetails />} />
				</Routes>
				<Modal />
				<ModalMessage />
			</div>
		);
	}
}
