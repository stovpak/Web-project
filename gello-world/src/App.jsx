import React from 'react';
import './App.css';
import { Reservation } from './components/login/login';

class App extends React.Component {
	render() {
		return (
			<div className='App'>
				<div className='login'>
					<div className='container'>
						<Reservation />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
