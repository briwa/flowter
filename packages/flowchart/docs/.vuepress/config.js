module.exports = ctx => ({
  locales: {
    '/': {
      lang: 'en-US',
      title: 'flowter',
      description: 'Flowchart made in Vue'
    }
  },
  plugins: [
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          // All options of ts-loader
        },
      },
    ],
  ]
})
