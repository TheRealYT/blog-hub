const {useState} = React

function Cover({url, setUrl}) {
    const setImg = () => {
        const img = prompt("Image URL", url)
        if (img != null) {
            setUrl(img)
        }
    }

    if (url === "") {
        return (<div onClick={setImg}
                     className="img-box rounded mb-3 d-flex align-items-center justify-content-center">
            <button className="text-white fw-bold fs-1 bg-transparent border-0">+</button>
        </div>)
    }
    return (<div onClick={setImg}
                 className="img-box rounded border mb-3 d-flex align-items-center justify-content-center"
                 style={{backgroundImage: `url(${url})`}}></div>)
}