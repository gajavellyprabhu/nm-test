module.exports = {
  apps: [
    {
      // Local Development (uses next dev if node_modules exists, else fallback to standalone server.js)
      name: 'new-murabba-local',
      script: process.env.USE_STANDALONE
        ? './server.js'
        : './node_modules/.bin/next',
      args: process.env.USE_STANDALONE ? '' : 'dev -p 10400',
      env: {
        NODE_ENV: 'development',
        PORT: 10400,
      },
      watch: process.env.USE_STANDALONE ? false : ['src', 'pages', 'components'],
    },
    {
      // UAT Cluster Configuration
      name: 'new-murabba-uat',
      script: './node_modules/.bin/next',
      args: 'start',
      instances: 3,
      exec_mode: 'cluster',
      instance_var: 'INSTANCE_ID',
      env_uat: {
        NODE_ENV: 'uat',
        PORT: 10400,
        instances: [
          { id: 0, port: 10400 },
          { id: 1, port: 10410 },
          { id: 2, port: 10420 },
        ],
      },
      max_memory_restart: '2G',
      error_file: './logs/uat-err.log',
      out_file: './logs/uat-out.log',
      log_file: './logs/uat-combined.log',
      time: true,
    },
    {
      // Production Cluster Configuration
      name: 'new-murabba-prod',
      script: './node_modules/.bin/next',
      args: 'start',
      instances: 5,
      exec_mode: 'cluster',
      instance_var: 'INSTANCE_ID',
      env_production: {
        NODE_ENV: 'production',
        PORT: 10400,
        instances: [
          { id: 0, port: 10400 },
          { id: 1, port: 10410 },
          { id: 2, port: 10420 },
          { id: 3, port: 10430 },
          { id: 4, port: 10440 },
        ],
      },
      max_memory_restart: '4G',
      error_file: './logs/prod-err.log',
      out_file: './logs/prod-out.log',
      log_file: './logs/prod-combined.log',
      time: true,
      kill_timeout: 5000,
      listen_timeout: 10000,
      wait_ready: true,
    },
  ],
};