const {useState} = React

function App() {
    return (
        <React.Fragment>
            <div className="offset-md-2 offset-lg-3 col-md-8 col-lg-6">
                <div className="card rounded border-0 shadow p-5 pb-3">
                    <div className="row">
                        <div className="col-sm">
                            <h3 className="card-title">Join BlogHub</h3>
                            <p className="card-text">Hundreds of companies using Space to build their
                                business.</p>
                        </div>
                        <div className="col-sm-auto order-sm-2 mb-3 mb-sm-0">
                            <img
                                height="100"
                                src="https://htmlstream.com/preview/space-v2.3.1/assets/svg/illustrations/oc-chatting.svg"
                                alt="Image Description"/>
                        </div>
                    </div>

                    <LoginForm/>
                </div>
            </div>
        </React.Fragment>)
}

render(App);