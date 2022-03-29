import React from 'react';

const {
	Provider: BelgoServiceProvider,
	Consumer: BelgoServiceConsumer
} = React.createContext();

export {
	BelgoServiceConsumer,
	BelgoServiceProvider
};