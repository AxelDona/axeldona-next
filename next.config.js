/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        additionalData: `@import "app/styles/variables.scss";`,
    },
    reactStrictMode: true,
    images: {
        domains: ['localhost'],
    },
}

module.exports = nextConfig
