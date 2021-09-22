module.exports = {
  apps: [
    {
      name: 'nestjs-task-management',
      script: 'dist/main.js',
      env_development: {
        STAGE: 'dev',
        NODE_ENV: 'development',
      },
      env_production: {
        STAGE: 'prod',
        NODE_ENV: 'production',
      },
    },
  ],
};
