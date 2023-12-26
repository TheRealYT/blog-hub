function LoginForm() {
    const [usernameMail, setUsernameMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)
        api('/account/login', {usernameOrEmail: usernameMail, password}).then(() => {
            window.location.href = "/blog/my"
            setError(null);
        }).catch(({error, message}) => {
            setError({error, message});
        }).finally(() => setLoading(false))
    };

    return (<React.Fragment>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
            <div className="form-floating mb-3">
                <input
                    id="inputUsername"
                    className="form-control"
                    type="text"
                    value={usernameMail}
                    placeholder="Emaul / Username"
                    onChange={(e) => setUsernameMail(e.target.value)}
                    required
                />
                <label htmlFor="inputUsername">Email / Username</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    id="inputPassword"
                    className="form-control"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="inputPassword">Password</label>
            </div>

            <div className="d-flex flex-column justify-content-around">
                <button className="btn btn-success p-2" type="submit" disabled={loading}>Login</button>
                <span className="text-center mt-3 mb-2">New to BlogHub? <a className="text-brand"
                                                                                    href="/account/signup">Sign up</a></span>
            </div>
        </form>
        {error && <span className="alert alert-danger">{error.message}</span>}
    </React.Fragment>);
}