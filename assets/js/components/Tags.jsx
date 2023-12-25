const {useState, useRef} = React

function Tags({className, tags, setTags}) {
    const [input, setInput] = useState("");
    const inputEle = useRef(null)

    const tagging = (value) => {
        const tag = value
            .replace(/_+/g, "_")
            .replace(/^[^a-z0-9]+/i, "")
            .replace(/[^a-z0-9_]/ig, "")

        if (value.endsWith(",") && !tags.includes(tag)) {
            setTags(tags => tags.concat(tag.replace(/_$/g, "")))
            setInput("")
        } else {
            if (value.length > 15) return
            setInput(tag)
        }
    };

    const editing = (key) => {
        if (["Enter", " "].includes(key)) {
            tagging(input + ",")
        } else if (tags.length > 0 && input === "" && key === "Backspace") {
            setInput(tags[tags.length - 1])
            setTags(tags => tags.slice(0, -1))
        }
    }

    const focus = () => {
        inputEle.current.focus()
    }

    return (
        <div className={className} onClick={focus}>
            {
                tags.map((tag, i) => <span className="me-2 badge bg-primary" key={i}>{tag}</span>)
            }
            <input type="text"
                   ref={inputEle}
                   className="outline-0 rounded-1 border-0 w-100 position-sticky"
                   placeholder="Keywords"
                   value={input}
                   onKeyUp={(e) => editing(e.key)}
                   onChange={(e) => tagging(e.target.value)}
            />
        </div>
    )
}