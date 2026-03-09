import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../services/authService';
import '../App.css'


const SignInForm = ({ setUser }) => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setMessage('');

		try {
			const user = await signin(formData);
			setUser(user);
			navigate('/');
		} catch (error) {
			setMessage(error.message);
		}
	};

	return (
		<main>
			<h1>SIGN IN</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>Username</label>
				<input
					id='username'
					name='username'
					type='text'
					value={formData.username}
					onChange={handleChange}
					required
				/>
				<label htmlFor='password'>Password</label>
				<input
					id='password'
					name='password'
					type='password'
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<button type='submit'>SIGN IN</button>
			</form>
			{message && <p>{message}</p>}
		</main>
	);
};

export default SignInForm;
