
function Master({child}) {
    return (
        <div className="bg-brand p-5">
            <div className="container">
                <div className="row">
                    {child}
                </div>
            </div>
        </div>
    )
}

function render(Component) {
    return ReactDOM.createRoot(document.querySelector("main")).render(
        <React.StrictMode>
            <Master child={Component}/>
        </React.StrictMode>
    )
}