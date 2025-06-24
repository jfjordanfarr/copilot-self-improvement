//@ts-check
'use strict';
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

/**@type {import('webpack').Configuration}*/
const config = {
  target: 'node', // Important for both extension and server
  mode: 'none', // Or 'development' or 'production'
  entry: {
    extension: './src/extension.ts', // Your existing extension host script
    server: './src/server.ts'      // Your new MCP server script
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // This will create extension.js and server.js
    libraryTarget: 'commonjs2'
  },
  externals: {
    vscode: 'commonjs vscode' // For extension.ts
    // server.ts should NOT have vscode as an external if it's a standalone node process
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }]
      }
    ]
  },
  devtool: 'nosources-source-map',
  infrastructureLogging: {
    level: "log", // enables logging required for problem matchers
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' } // Copies CONVENTIONS.md
      ]
    })
  ]
};

// Configuration specific for the server entry point
const serverConfig = {
    ...config, // Inherit common settings
    entry: {
        server: './src/server.ts'
    },
    output: {
        ...config.output,
        filename: 'server.js', // Explicitly name the server output
        libraryTarget: 'commonjs2', // Node.js server
    },
    externals: {
        // NO 'vscode' external for the server, as it's a standalone Node process
        // Any node modules it needs (like vscode-jsonrpc) will be bundled or
        // should be in dependencies.
    },
    target: 'node', // Ensure server targets node environment
};

// Configuration specific for the extension entry point
const extensionConfig = {
    ...config,
    entry: {
        extension: './src/extension.ts'
    },
    output: {
        ...config.output,
        filename: 'extension.js', // Explicitly name the extension output
    },
    externals: {
        vscode: 'commonjs vscode' // Extension host part needs this
    },
    target: 'node', // Extension host runs in a Node.js-like environment
};


module.exports = [extensionConfig, serverConfig]; // Export both configurations