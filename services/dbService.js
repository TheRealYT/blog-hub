const mongoose = require("mongoose")

class DBService {
    connect() {
        return new Promise(async (res, rej) => {
            try {
                await mongoose.connect(process.env.MONGODB_URI)
                res()
            } catch (e) {
                rej(e)
            }
        })
    }
}

const dbService = new DBService()

module.exports = {
    dbService,
    DBService,
}