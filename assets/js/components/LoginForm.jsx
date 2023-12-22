function LoginForm() {
    const [usernameMail, setUsernameMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await fetch('/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({usernameOrEmail: usernameMail, password}),
            });

            const {data, message, success} = await response.json();

            if (response.ok && success) {
                // TODO: redirect
                setError(null);
            } else {
                setError({...data.error, message});
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false)
        }
    };

    return (<React.Fragment>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
            <div className="form-floating mb-3">
                <input
                    id="inputUsername"
                    className="form-control"
                    type="text"
                    value={usernameMail}
                    placeholder="Username"
                    onChange={(e) => setUsernameMail(e.target.value)}
                    required
                />
                <label htmlFor="inputUsername">Username</label>
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
        {error && <span className="alert alert-danger">{formatError(error)}</span>}
    </React.Fragment>);
}