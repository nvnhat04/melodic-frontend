module.exports = {
    module: {
      rules: [
        {
          test: /\.worker\.js$/,   // Match any .worker.js files
          loader: 'worker-loader', // Use worker-loader for those files
          options: {
          },
        },
      ],
    },
  };
  