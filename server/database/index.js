const mongoose = require("mongoose");

const connectMongoLocal = async () => {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const dbname = process.env.DB_NAME;
    const username = process.env.DB_USER_NAME;
    const password = process.env.DB_PASSWORD;
    const connectionString =
        username && password
            ? `mongodb://${username}:${password}@${host}:${port}/${dbname}`
            : `mongodb://${host}:${port}/${dbname}`;

    mongoose
        .connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("DB Connection Succesful!"))
        .catch((err) => console.error("App starting error:", err.stack));
};

const connectMongoAtlas = async () => {
    const DB = process.env.DATABASE_ATLAS.replace(
        "<PASSWORD>",
        process.env.DATABASE_ATLAS_PASSWORD
    );
    mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(() => {
            console.log("DB Connection Succesful!");
        });
};

const connectMongoDO = async () => {
    const DB = process.env.DATABASE_DIGITAL_OCEAN.replace(
        "PASSWORD",
        process.env.DATABASE_DIGITAL_OCEAN_PASSWORD
    );
    mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            tls: true,
            tlsCAFile: "./ca-certificate.crt",
        })
        .then(() => {
            console.log("DB Connection Succesful!");
        });
};

module.exports = {
    connectMongoLocal,
    connectMongoAtlas,
    connectMongoDO,
};
