import React from 'react';
import MainPage from '../MainPage';

class Dashboard extends React.Component {

	render() {

		return (
			<div className="main_body text-gray">
				<h2 className="ta-center">EoD</h2>
				<MainPage />
			</div>
		);
	}

}

export default Dashboard;
