function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await fetch('/account/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password, email}),
            });

            const {data, message, success} = await response.json();

            if (response.ok && success) {
                setUsername("")
                setEmail("")
                setPassword("")
                setResult(message);
                setError(null);
            } else {
                setResult(null);
                setError({...data.error, message});
            }
        } catch (err) {
            setError('Something went wrong');
            setResult(null);
        } finally {
            setLoading(false)
        }
    };

    return (<React.Fragment>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
            <div className="form-floating mb-3">
                <input
                    id="inputUsername"
                    className={"form-control" + (formatError(error, "username", true) && " is-invalid" || "")}
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="inputUsername">Username</label>
                {formatError(error, "username", true) && (
                    <div className="invalid-feedback">{formatError(error, "username")}</div>)}
            </div>

            <div className="form-floating mb-3">
                <input
                    id="inputEmail"
                    className={"form-control" + (formatError(error, "email", true) && " is-invalid" || "")}
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="inputEmail">Email</label>
                {formatError(error, "email", true) && (
                    <div className="invalid-feedback">{formatError(error, "email")}</div>)}
            </div>

            <div className="form-floating mb-3">
                <input
                    id="inputPassword"
                    className={"form-control" + (formatError(error, "password", true) && " is-invalid" || "")}
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="inputPassword">Password</label>
                {formatError(error, "password", true) && (
                    <div className="invalid-feedback">{formatError(error, "password")}</div>)}
            </div>

            <div className="d-flex flex-column justify-content-around">
                <button className="btn btn-success p-2" type="submit" disabled={loading}>Sign up</button>
                <span className="text-center mt-3 mb-2">Already have an account? <a className="text-brand"
                                                                                    href="/account/login">Login</a></span>
            </div>
        </form>
        {error && <span className="alert alert-danger">{formatError(error)}</span>}
        {result && <span className="alert alert-success">{result}</span>}
    </React.Fragment>);
}