const Landing = ({ user }) => {
	return (
		<main>
			<h1>ALBUM TRACKR</h1>
			{user ? (
				<div>
					<p>Welcome back, {user.username}!</p>
					<p>Click ALBUMS in the nav to view your collection.</p>
				</div>
			) : (
				<div>
					<p>Login or sign up to view and create albums</p>
				</div>
			)}
		</main>
	);
};

export default Landing;
