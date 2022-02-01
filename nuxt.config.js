require('dotenv').config();
import pkg from './package';
export default {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: `Patrick Huijten | ${pkg.description}`,
        htmlAttrs: {
            lang: 'en',
        },
        meta: [{
            charset: 'utf-8'
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            hid: 'description',
            name: 'description',
            content: pkg.description
        }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: '#fff'
    },

    /*
     ** Global CSS
     */
    styleResources: {
        scss: [
            '~/assets/main.scss'
        ]
    },
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [{
        src: '~plugins/aos.js',
        mode: 'client'
    }, '~plugins/directives.js'],

    /*
     ** Nuxt.js modules
     */

    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/sitemap',
        // Doc: https://bootstrap-vue.js.org/docs/        
        // With options
        ['cookie-universal-nuxt', { parseJSON: false }],
        //font awesome
        [
            'nuxt-fontawesome', {
                imports: [
                    {
                        set: '@fortawesome/free-regular-svg-icons',
                        icons: ['faMoon']
                    },
                    {
                        set: '@fortawesome/free-solid-svg-icons',
                        icons: ['faExternalLinkAlt', 'faChevronLeft', 'faAdjust', 'faSun']
                    },
                    {
                        set: '@fortawesome/free-brands-svg-icons',
                        icons: ['faGithub', 'faLinkedin', 'faFacebook', 'faInstagram', 'faArtstation']
                    }
                ]
            }
        ],
        //storyblok
        [
            'storyblok-nuxt',
            {
                accessToken: process.env.STORYBLOK_TOKEN,
                cacheProvider: 'memory'
            }
        ],
        ['@netsells/nuxt-hotjar', {
            id: process.env.HOTJAR_ID,
            sv: process.env.HOTJAR_SV,
        }],
        '@nuxtjs/style-resources'
    ],
    buildModules: [
        ['@nuxtjs/google-analytics', {
            id: process.env.GOOGLE_ANALYTICS_ID
        }]
    ],
    sitemap: {
        hostname: process.env.HOSTNAME,
        exclude: [
            '/projects',
            '/work',
            '/about'
        ],
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        fallback: true,
        extend(config) {
            config.resolve.alias['vue'] = 'vue/dist/vue.common'
        }
    },
    generate: {
        fallback: true,
        routes: [
            '/'
        ]
    },
    exclude: [
        /^(?=.*\work\b).*$/,
        /^(?=.*\about\b).*$/
    ]
}