
module.exports = (api) => {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        'debug': false,
        'targets': {'ie':'11'},
        'useBuiltIns': 'usage',
        'corejs': 3,
        'modules': false
      }
    ],
    '@babel/preset-react',
  ]

  const plugins = [
    '@babel/proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ].filter(Boolean)

  return {
    presets,
    plugins
  }
}
