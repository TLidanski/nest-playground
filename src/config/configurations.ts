export default () => ({
    port: parseInt(process.env.PORT) || 5000,
    jwt: {
        secret: 'super-secret'
    }
})