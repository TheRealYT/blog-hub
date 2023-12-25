function render(Component) {
    return ReactDOM.createRoot(document.querySelector("main")).render(
        <React.StrictMode>
            <Master>
                <Component/>
            </Master>
        </React.StrictMode>
    )
}