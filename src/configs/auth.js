module.exports = {
    jwt: {       // npm install jsonwebtoken
        secret: process.env.AUTH_SECRET || "default",
        expiresIn: "7d"  // 7 dias até a expiração do token
    }
}