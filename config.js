const message = "some enviroment settings are not setted";

const config = {
    PORT: process.env.PORT || message
}

export default config;
