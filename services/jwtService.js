const jwt = require("jsonwebtoken")

class JwtService {
    static MAX_AGE = 60 * 60 * 1000

    sign(payload) {
        return new Promise((res, rej) => {
            jwt.sign(payload, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: JwtService.MAX_AGE}, (err, token) => {
                if (err) {
                    rej(err)
                } else {
                    res(token)
                }
            })
        })
    }

    verify(token) {
        return new Promise((res, rej) => {
            jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    rej(err)
                } else {
                    res(decoded)
                }
            });
        })
    }

    extractTokenAuth(req) {
        // Authorization: Bearer <token>
        const auth = req.header("Authorization")
        if (auth) {
            const [bearer, token] = auth.split(' ')
            if (bearer.toLowerCase() === "bearer") {
                return token
            }
        }
        return null
    }

    extractTokenCookie(req) {
        return req.cookies?.token
    }
}

const jwtService = new JwtService()

module.exports = {
    jwtService,
    JwtService,
}