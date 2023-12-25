function pad(obj, fill = '0', len = 2) {
    return obj.toString().padStart(len, fill)
}

function dateFormat(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function parseDom(tagName, innerHtml) {
    const tag = document.createElement(tagName)
    tag.innerHTML = innerHtml
    return tag
}

function App() {
    const data = getData([])

    return (<div className="border-brand py-5 px-2 px-md-5 px-lg-5">
        <div className="container row">
            {data.map((blog, i) =>
                <div key={i} className="col">
                    <div className="card">
                        <img src={blog.cover} className="img-view card-img-top" alt={blog.cover}/>

                        <div className="card-body pt-1">
                            {<p className="mb-1 text-end">
                                {blog.tags.map((tag, i) => <span key={i}
                                                                 className="badge bg-secondary ms-2">{tag}</span>)}
                            </p>}
                            <h5 className="card-title">{blog.title}</h5>
                            <p className="card-text mb-1">{parseDom("div", blog.content).textContent.substring(0, 60)}...</p>

                            <div className="mb-2">{dateFormat(new Date(blog.updatedAt))}</div>
                            <a href={blog.blogId} className="btn btn-success d-block">Edit</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>)
}

render(App)