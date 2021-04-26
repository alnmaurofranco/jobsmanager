module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@database': './src/database',
        '@services': './src/services',
        '@controllers': './src/controllers',
        '@views': './src/views',
        '@errors': './src/errors',
        '@utils': './src/utils',
        '@middlewares': './src/middlewares',
      }
    }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
