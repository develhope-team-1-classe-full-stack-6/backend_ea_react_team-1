const message = "some enviroment settings are not setted";

const config = {
    PORT: process.env.PORT || message,
    SECRET_KEY: process.env.SECRET_KEY || message
}

export default config;
