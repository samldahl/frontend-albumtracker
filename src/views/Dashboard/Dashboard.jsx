const Dashboard = ({ user }) => {
	return (
		<main>
			<h1>DASHBOARD</h1>
			<p>Welcome, {user?.username || 'user'}.</p>
		</main>
	);
};

export default Dashboard;
