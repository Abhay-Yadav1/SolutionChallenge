import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import './App.css';
import Takedowns from './pages/Takedowns';
import ThreatUpdates from './pages/ThreatUpdates';
import Listings from './pages/Listings';
import Login from './pages/Login';

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route
						path='/'
						Component={Home}
					></Route>
					<Route
						path='/takedowns'
						Component={Takedowns}
					></Route>
					<Route
						path='/threat-updates'
						Component={ThreatUpdates}
					></Route>
					<Route
						path='/listings'
						Component={Listings}
					></Route>
					<Route
						path='/login'
						Component={Login}
					></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
