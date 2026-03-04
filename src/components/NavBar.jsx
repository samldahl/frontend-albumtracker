import { Link } from 'react-router-dom';
import { signout } from '../services/authService';

const NavBar = ({ user, setUser }) => {
	const handleSignOut = () => {
		signout();
		setUser(null);
	};

	return (
		<nav>
			{user ? (
				<ul>
					<li><Link to='/'>HOME</Link></li>
                    <li><Link to='/albums'>ALBUMS</Link></li>
					<li><Link to='/' onClick={handleSignOut}>SIGN OUT</Link></li>
				</ul>
			) : (
				<ul>
					<li><Link to='/'>HOME</Link></li>
					<li><Link to='/sign-in'>SIGN IN</Link></li>
					<li><Link to='/sign-up'>SIGN UP</Link></li>
				</ul>
			)}
		</nav>
	);
};

export default NavBar;