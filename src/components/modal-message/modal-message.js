import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import {onClickModalBox, hideModal} from '../../utils';
import styles from './modal-message.m.less';

function ModalMessage({resultPostRequest}) {

	const [message, setMessage] = useState("modal message");

	const clearLocalStorage = () => {
		if (window.localStorage.getItem('resultPostRequest')) {
			window.localStorage.removeItem('resultPostRequest');
		}
	};

	useEffect(() => {
		const modalContainer = document.querySelector('[class^="modalContainer"]');

		const onKeydown = (e) => {
			if (e.code === 'Escape' && modalContainer.style.display === 'block') {
				hideModal('[class^="modalContainer"]');
				clearLocalStorage();
			}
		}

		document.addEventListener('keydown', onKeydown);
		return () => document.removeEventListener("keydown", onKeydown);
	}, []);

	useEffect(() => {
		if (resultPostRequest === "isSuccess") {
			setMessage("you have been successfully logged in !");
			document.querySelector('[class^="modalContainer"]').style.display = "block";
		}

		if (resultPostRequest === "isError") {
			setMessage("Something went wrong...");
			document.querySelector('[class^="modalContainer"]').style.display = "block";
		}

		return null;
	}, [resultPostRequest]);

	const hideModalMessage = () => {
		hideModal('[class^="modalContainer"]');
		clearLocalStorage();
	};

	const onClickModalMessage = (e) => {
		onClickModalBox('[class^="modalContainer"]', e);
		clearLocalStorage();
	};

	return (
		<div className={styles.modalContainer} 
				onClick={onClickModalMessage}>
			<div className={styles.modalDialog}>
				<div className={styles.modalContent}>
					<button className={styles.modalClose} type='button'
								onClick={hideModalMessage} />
					<p className={styles.modalTitle}>
						{message}
					</p>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = ({resultPostRequest}) => ({
	resultPostRequest: resultPostRequest
});

export default connect(mapStateToProps)(ModalMessage);