/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        additionalData: `@import "app/styles/variables.scss";`,
    },
}

module.exports = nextConfig
