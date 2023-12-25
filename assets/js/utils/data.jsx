function getData(defaultValue) {
    try {
        return JSON.parse(document.getElementById("data").textContent)
    } catch (e) {
        return defaultValue
    }
}