/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    swcMinify: true,

    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: `
                            default-src 'self';
                            base-uri 'self';
                            font-src 'self' https: data:;
                            form-action 'self';
                            frame-ancestors 'self';
                            img-src 'self' data:;
                            object-src 'none';
                            script-src 'self' 'unsafe-eval';
                            script-src-attr 'none';
                            style-src 'self' 'unsafe-inline';
                            `
                            .replace(/\s{2,}/g, ' ').trim()
                    },
                    {
                        key: 'Cross-Origin-Embedder-Policy',
                        value: 'require-corp'
                    },
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin'
                    },
                    {
                        key: 'Cross-Origin-Resource-Policy',
                        value: 'same-origin'

                    },
                    {
                        key: 'Origin-Agent-Cluster',
                        value:  '?1'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'off'
                    },
                    {
                        key: 'X-Download-Options',
                        value: 'noopen'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Permitted-Cross-Domain-Policies',
                        value: 'none'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '0'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    },
                ],

            }
        ]
    }
}

module.exports = nextConfig
