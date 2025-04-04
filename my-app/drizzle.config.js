/** @type{import ("drizzle-kit").Config} */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url:"postgresql://ai-mocker_owner:YgZLCc9Tb0Gu@ep-winter-boat-a5i2enfi.us-east-2.aws.neon.tech/ai-mocker?sslmode=require"}
}
