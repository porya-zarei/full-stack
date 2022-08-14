const ATLAS_USERNAME = "space-omid-x";
const ATLAS_PASSWORD = "AfSfwX7kilQYFgmU";
const ATLAS_DB_NAME = "spaceomid";

export const ATLAS_CONFIG = {
    username: ATLAS_USERNAME,
    password: ATLAS_PASSWORD,
    database: ATLAS_DB_NAME,
    uri: `mongodb+srv://${ATLAS_USERNAME}:${ATLAS_PASSWORD}@cluster0.4kygakt.mongodb.net/${ATLAS_DB_NAME}?retryWrites=true&w=majority`,
};
