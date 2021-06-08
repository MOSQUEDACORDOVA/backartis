exports.walletDashboard = (req, res) => {
	const user = res.locals.user;

	if(user.basic) {
		return res.redirect('/dashboard');
	}

	res.render('wallet', {
		pageName: 'Billetera',
		dashboardPage: true,
		user
	})
}