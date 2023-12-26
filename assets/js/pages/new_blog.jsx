const {useState, useEffect, useRef} = React

function App() {
    const data = getData({
        blogId: null,
        title: "",
        content: null,
        cover: "",
        tags: [],
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [result, setResult] = useState(null)
    const [url, setUrl] = useState(data.cover)
    const [title, setTitle] = useState(data.title);
    const [tags, setTags] = useState(data.tags);
    const [blogId, setBlogId] = useState(data.blogId);

    const editorRef = useRef(null);
    const toolbarRef = useRef(null);

    let loaded = false

    useEffect(() => {
        load()
    }, []);

    const load = () => {
        if (!loaded)
            DecoupledEditor
                .create(editorRef.current)
                .then(editor => {
                    const toolbarContainer = toolbarRef.current;
                    toolbarContainer.prepend(editor.ui.view.toolbar.element);
                    window.editor = editor;
                    if (data.content != null) {
                        editor.setData(data.content)
                    }
                })
                .catch(() => loaded = false);
        loaded = true
    }

    const handlePost = () => {
        setLoading(true)
        setResult(null)
        api("/blog/save", {title, blogId, cover: url, content: window.editor.getData(), tags})
            .then(({data, message}) => {
                setBlogId(data.blogId)
                setError(null)
                setResult(message)
            }).catch(({error, message}) => {
            setError({error, message})
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <React.Fragment>
            <div className="border-brand py-5 px-2 px-md-5 px-lg-5">
                <div className="col-md-6 col-md-8">
                    <div className="mb-3">
                        <input value={title} onChange={(e) => setTitle(e.target.value)}
                               className="form-control form-control-lg" type="text" placeholder="Title"/>
                    </div>

                    <div className="d-md-flex">
                        <Cover url={url} setUrl={setUrl}/>

                        <div className="col ms-md-3">
                            <Tags tags={tags} setTags={setTags}
                                  className="tag p-2 mb-3 border rounded focus-outline-1 h-100"/>
                        </div>
                    </div>

                    <div ref={toolbarRef} className="rounded"></div>
                    <div ref={editorRef} className="rounded-bottom border-top-0 border-1 mb-3" onClick={load}>
                        <h2>Type here</h2>
                    </div>

                    <div className="mb-3">
                        <button onClick={handlePost} className="btn btn-success"
                                disabled={loading}>{blogId ? "Update" : "Post"}</button>
                    </div>

                    {error &&
                        <div className="alert alert-danger">
                            <div>{error.message}</div>
                            <hr/>
                            {formatError(error, "cover", true) && (<div>{formatError(error, "cover")}</div>)}
                            {formatError(error, "title", true) && (<div>{formatError(error, "title")}</div>)}
                            {formatError(error, "content", true) && (<div>{formatError(error, "content")}</div>)}
                            {formatError(error, "tags", true) && (<div>{formatError(error, "tags")}</div>)}
                        </div>}
                    {result && <div className="alert alert-success">{result}</div>}
                </div>
            </div>
        </React.Fragment>)
}

render(App);