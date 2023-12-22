function render(Component) {
    return ReactDOM.createRoot(document.querySelector("main")).render(
        <React.StrictMode>
            <Master child={Component}/>
        </React.StrictMode>
    )
}