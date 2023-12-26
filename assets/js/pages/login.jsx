const {useState} = React

function App() {
    return (
        <React.Fragment>
            <div className="offset-md-2 offset-lg-3 col-md-8 col-lg-6">
                <div className="card rounded border-0 shadow p-5 pb-3">
                    <div className="row">
                        <div className="col-sm mb-3">
                            <h3 className="card-title">Welcome back</h3>
                        </div>
                    </div>

                    <LoginForm/>
                </div>
            </div>
        </React.Fragment>)
}

render(App);