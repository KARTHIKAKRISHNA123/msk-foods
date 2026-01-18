const sendToken = (user, statusCode, res) => {

    //Creating JWT Token
    const token = user.getJWTToken();

    //setting up cookie options
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),//converting days to milliseconds
        httpOnly: true,
    }

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user, 
        token
    })
}

export default sendToken;