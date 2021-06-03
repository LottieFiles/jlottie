const fastify = require('fastify')();
const path = require('path');

async function globalSetup() {
  fastify.register(
    require('fastify-static'),
    {
      root: path.join(__dirname, 'public'),
    }
  );

  // Start server.
  await fastify.listen(8000);

  // Return the global teardown function.
  return async () => {
    await new Promise(done => fastify.close(done));
  };
}

module.exports = globalSetup;
