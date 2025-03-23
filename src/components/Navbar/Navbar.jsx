import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<>
			<nav>
				<div className='nav-left'>
					<h1>Project Shield</h1>
				</div>
				<ul className='nav-links'>
					<li>
						<Link to='/'>
							<i className='fas fa-home'></i> Home
						</Link>
					</li>
					<li>
						<Link to='/listings'>
							<i className='fas fa-list'></i> Listings
						</Link>
					</li>
					<li>
						<Link to='/threat-updates'>
							<i className='fas fa-shield-alt'></i> Threat Updates
						</Link>
					</li>
					<li>
						<Link to='/takedowns'>
							<i className='fas fa-file-alt'></i> Takedowns
						</Link>
					</li>
				</ul>
				<div className='user-profile tooltip'>
					<Link
						to='/login'
						id='sign-in-button'
					>
						Sign In
					</Link>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
