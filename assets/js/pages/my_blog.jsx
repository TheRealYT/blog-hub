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
    const [blogs, setBlogs] = useState(getData([]))

    const handleDel = (blogId) => {
        const del = confirm("Are you sure to delete the blog?")
        if (del) {
            api("/blog/del", {blogId}).then(() => {
                setBlogs(blogs.filter(blog => blog.blogId !== blogId))
            }).catch(({message}) => alert(message))
        }
    }

    return (<div className="border-brand py-5 px-2 px-md-5 px-lg-5">
        <div className="container row">
            {blogs.length === 0 &&
                <React.Fragment>
                    <div className="alert alert-secondary" role="alert">
                        You haven't posted any blog yet.
                    </div>
                    <div>
                        <a className="text-brand d-" href="/blog/new">Create</a> your first blog.
                    </div>
                </React.Fragment>
            }
            {blogs.map((blog, i) =>
                <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
                    <div className="card">
                        <img src={blog.cover} className="img-view card-img-top" alt={blog.cover}/>

                        <div className="card-body pt-1">
                            {<p className="mb-1 text-end">
                                {blog.tags.map((tag, i) => <span key={i}
                                                                 className="badge bg-secondary ms-2">{tag}</span>)}
                            </p>}
                            <h5 className="card-title wrap">{blog.title}</h5>
                            <p className="card-text mb-1">{parseDom("div", blog.content).textContent.substring(0, 60)}...</p>

                            <div className="mb-2">{dateFormat(new Date(blog.updatedAt))}</div>
                            <div className="d-flex gap-2">
                                <button onClick={() => handleDel(blog.blogId)}
                                        className="btn btn-outline-danger">Delete
                                </button>
                                <a href={blog.blogId} className="btn btn-success flex-grow-1">Edit</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>)
}

render(App)