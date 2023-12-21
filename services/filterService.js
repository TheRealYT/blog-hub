class FilterService {
    /*
    * Filter model data based on allowed list of model property names
    * @param {Object} data Data to filter
    * @param {Array} allowedFields Allowed list of model property names
    * */
    filter(data, allowedFields) {
        return Object.keys(data).reduce((acc, key) => {
            if (allowedFields.includes(key)) {
                acc[key] = data[key] // TODO: sanitize for db query
            }
            return acc
        }, {})
    }
}

const filterService = new FilterService()

module.exports = {
    filterService,
    FilterService,
}