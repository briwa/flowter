module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'flowter',
      description: 'Flowchart made in Vue'
    }
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting started', link: '/getting-started/' },
      { text: 'API', link: '/api/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Github', link: 'https://github.com/briwa/flowter' }
    ],
    sidebar: [
      '/',
      '/getting-started/',
      '/api/',
      '/examples/'
    ]
  }
}
