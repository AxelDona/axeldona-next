/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        additionalData: `@import "styles/_variables.scss";`,
    },
    reactStrictMode: true,
    images: {
        domains: ['localhost'],
    },
}

module.exports = nextConfig
