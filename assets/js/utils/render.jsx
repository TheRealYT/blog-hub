
function render(Component) {
    return ReactDOM.createRoot(document.querySelector("main")).render(
        <React.StrictMode>
            <Component/>
        </React.StrictMode>
    )
}