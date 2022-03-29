import React, {useEffect} from 'react';

import { onClickModalBox, hideModal } from '../../utils';
import styles from './modal-box.m.less';

function ModalBox(props) {

	useEffect(() => {
			const modalBox = document.querySelector('[class^="modalBox"]');
	
			const onKeydown = (e) => {
				if (e.code === 'Escape' && modalBox.style.display === 'block') {
					hideModal('[class^="modalBox"]');
				}
			}
	
			document.addEventListener('keydown', onKeydown);
			return () => document.removeEventListener("keydown", onKeydown);
	}, []);

	return (
		<div className={styles.modalBox}
					onClick={(e) => onClickModalBox('[class^="modalBox"]', e)}>
					
			<ModalDialog {...props} />
		</div>
	);
}

const ModalDialog = (props) => {
	const {handleSubmit, login, password, isLoading} = props;

	return (
		<div className={styles.modalDialog}>
			<div className={styles.modalContent}>
				
				<form onSubmit={handleSubmit} >
					<button className={styles.modalClose} type='button'
								onClick={() => hideModal('[class^="modalBox"]')} />
					<p className={styles.modalTitle}>
						please enter your email and password
					</p>
					<input 	type="email" name="login" className={styles.modalInput}
								placeholder={login} required />
					<input 	type="password" name="password" className={styles.modalInput}
								placeholder={password} required />
					<button className={styles.modalEnter} type="submit">
						sign up
					</button>
				</form>
				{isLoading}
			</div>
		</div>
	);
};


export default ModalBox;