import React, { Component } from 'react';
import { connect } from 'react-redux';

import { compose } from '../hoc';
import { withBelgoService } from '../hoc';
import { dataFormSending, dataFormSuccess, dataFormError
} from '../../actions';

import ModalBox from '../modal-box';
import Spinner from '../spinner';
import {hideModal} from '../../utils';
import styles from './modal.m.less';

class Modal extends Component {

	state = {
		objForm: null,
		dataForm: JSON.parse(window.localStorage.getItem('dataForm')) || null,
		loadingDataForm: JSON.parse(window.localStorage.getItem('loadingDataForm')) || false,
		errorDataForm: JSON.parse(window.localStorage.getItem('errorDataForm')) || false
	};

	componentDidUpdate(prevProps, prevState) {
		const {postDataForm, dataFormSend, dataFormSucc, dataFormErr, dataFormPosted} = this.props;
		const { objForm } = this.state;

		if (JSON.stringify(objForm) !== JSON.stringify(prevState.objForm)) {

			const json = JSON.stringify(objForm);
			this.setState({dataForm: null, loadingDataForm: true, errorDataForm:false});
			dataFormSend();
			window.localStorage.setItem('dataForm', null);
			window.localStorage.setItem('loadingDataForm', true);
			window.localStorage.setItem('errorDataForm', false);
			window.localStorage.setItem('resultPostRequest', null);
			postDataForm(json)
				.then((data) => {
					this.setState({dataForm: data, loadingDataForm: false, errorDataForm: false});
					window.localStorage.setItem('dataForm', JSON.stringify(data));
					window.localStorage.setItem('loadingDataForm', false);
					window.localStorage.setItem('errorDataForm', false);
					window.localStorage.setItem('resultPostRequest', "isSuccess");
					dataFormSucc(data);
					hideModal('[class^="modalBox"]');
					// console.log(data, 333333333333333);
					// console.log(this.state.dataForm, 999999999999);
					// console.log(this.props.dataFormPosted, 888888888888);
				}).catch(error => {
					this.setState({dataForm: null, loadingDataForm: false, errorDataForm: error});
					window.localStorage.setItem('dataForm', null);
					window.localStorage.setItem('loadingDataForm', false);
					window.localStorage.setItem('errorDataForm', JSON.stringify(error));
					window.localStorage.setItem('resultPostRequest', "isError");
					dataFormErr(errorDataForm);
					console.log(error);
					hideModal('[class^="modalBox"]');
				});
		}
	}
	
	handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const objForm = Object.fromEntries(formData.entries(formData));
		this.setState({objForm});
	}

	render() {
		const {dataForm, loadingDataForm} = this.state;	

		const login = dataForm ? Object.entries(dataForm)[0][1] : "example@gmail.com";
		const password = dataForm ? Object.entries(dataForm)[1][1].replace(/./ig, '*') : "password";

		const isLoading = loadingDataForm ? <Spinner /> : null;
		console.log(dataForm, 99, login, 11, password, 22);
		
		return <ModalBox 	handleSubmit={this.handleSubmit}
								login={login} password={password}
								isLoading={isLoading} />;
	}
}

const mapMethodsToProps = (belgoService) => ({
	postDataForm: belgoService.postDataForm
});

const mapStateToProps = ({dataFormPosted}) => ({
	dataFormPosted: dataFormPosted
});

const mapDispatchToProps = (dispatch) => ({
	dataFormSend: () => dispatch(dataFormSending()),
	dataFormSucc: (data) => dispatch(dataFormSuccess(data)),
	dataFormErr: (error) => dispatch(dataFormError(error))
});
//sendDataForm: (data) => sendDataForm(postDataForm, dispatch)(data)

export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(Modal);