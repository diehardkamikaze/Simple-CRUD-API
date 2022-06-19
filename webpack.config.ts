import { join } from 'path';


const config = {
  entry: join(__dirname, 'src', 'index.ts'),
  mode: 'production',
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
    ]
  },
  output: {
    path: join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: [".ts",  ".js"],
}
}

export default config;