const ATLAS_USERNAME = "spaceomid-2";
const ATLAS_PASSWORD = "x3ocdTcDKaHgyI5a";
const ATLAS_DB_NAME = "financial";
const ATLAS_CLUSTER_NAME = "financial.e71nbei";

// const ATLAS_USERNAME = "space-omid-x";
// const ATLAS_PASSWORD = "AfSfwX7kilQYFgmU";
// const ATLAS_DB_NAME = "spaceomid";
// const ATLAS_CLUSTER_NAME = "cluster0.4kygakt";

export const ATLAS_CONFIG = {
    username: ATLAS_USERNAME,
    password: ATLAS_PASSWORD,
    database: ATLAS_DB_NAME,
    cluster: ATLAS_CLUSTER_NAME,
    uri: `mongodb+srv://${ATLAS_USERNAME}:${ATLAS_PASSWORD}@${ATLAS_CLUSTER_NAME}.mongodb.net/${ATLAS_DB_NAME}?retryWrites=true&w=majority`,
};
