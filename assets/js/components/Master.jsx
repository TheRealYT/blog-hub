function Master({children}) {
    return (
        <div className="bg-brand py-5 px-2 px-md-5 px-lg-5">
            <div className="container col-12">
                <div className="row">
                    {children}
                </div>
            </div>
        </div>
    )
}