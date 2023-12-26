const {useState} = React

function App() {
    return (
        <React.Fragment>
            <div className="col-md-8 col-lg-6">
                <div className="card rounded border-0 shadow p-5 bg-brand text-white">
                    <div className="row">
                        <div className="col-sm">
                            <h3 className="card-title">Join BlogHub</h3>
                            <p className="card-text">Free blogging platform for everyone.</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>)
}

render(App);