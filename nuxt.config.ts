// ./nuxt.config.ts

import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/style-resources'],
    content: {
        // https://content.nuxtjs.org/api/configuration
        highlight: {
            theme: {
                // Default theme (same as single string)
                default: 'github-light',
                // Theme used if `html.dark`
                dark: 'github-dark',
            },
            preload: [
                'c',
                'python',
                'go',
                'bash',
            ]
        },
        markdown: {
            toc: {
                depth: 5,
                searchDepth: 5
            },
        }
    },
    tailwindcss: {
        cssPath: '~/assets/style/main.scss',
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "~/assets/style/variables.scss";',
                },
            },
        },
    }
})
