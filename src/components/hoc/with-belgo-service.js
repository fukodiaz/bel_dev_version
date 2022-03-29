import React from 'react';
import { BelgoServiceConsumer } from '../belgo-service-context';

const withBelgoService = (mapMethodsToProps) => (Wrapped) => {
	return (props) => {
		return (
			<BelgoServiceConsumer>
				{
					(belgoService) => {
						const propsFromService = mapMethodsToProps(belgoService);
						return (<Wrapped {...props} {...propsFromService} />);
					}
				}
			</BelgoServiceConsumer>
		);
	};
};

export default withBelgoService;