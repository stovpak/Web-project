import './style.css';
export { Login } from './login';
export { Register } from './register';

class Class extends React.Component {
	render() {
	return (
		<div className='App'>
			<div className='login'>
				<div className='container'>
					<Login />
				</div>
			</div>
		</div>
	);}
}

export default App;
