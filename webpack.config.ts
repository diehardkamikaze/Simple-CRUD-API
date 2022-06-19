import { join } from 'path';


const config = {
  entry: join(__dirname, 'src', 'index.ts'),
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
    ]
  },
  output: {
    path: join(__dirname, 'build'),
    filename: 'bundle.js',
  }
}

export default config;