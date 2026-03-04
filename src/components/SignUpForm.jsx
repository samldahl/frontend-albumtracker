import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';

const SignUpForm = ({ setUser }) => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
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
			const user = await signup({
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});
			setUser(user);
			navigate('/');
		} catch (error) {
			setMessage(error.message);
		}
	};

	return (
		<main>
			<h1>SIGN UP</h1>
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
				<label htmlFor='email'>Email</label>
				<input
					id='email'
					name='email'
					type='email'
					value={formData.email}
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
				<button type='submit'>SIGN UP</button>
			</form>
			{message && <p>{message}</p>}
		</main>
	);
};

export default SignUpForm;