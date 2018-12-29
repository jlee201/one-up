const passport = require('passport');

module.exports = (app) => {
    // Once user goes to the route below, the second argument is a function that is executed,
    // which is authentication via passport. The string 'google' is associated with the
    // Google Strategy above. At this point, this will kick the user into the oauth flow
    // and ask the user if they want to grant us persmission to access their information.
    // Scope is the information we want to retrieve
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    // At this point, the user has granted permission for our app to retrieve their information.
    // Passport will take the code we received and get the user's informaiton.
    // After the passport middleware fetches the user's information, the user is redirected to
    // the home page.
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/');
        }
    );

    app.get('/api/logout', (req, res) => {
        // takes out id within the cookie
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
