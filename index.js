'use strict';

//////////////////////////////
// Requires
//////////////////////////////
const server = require('./libs/server');

//////////////////////////////
// Start the Server
//////////////////////////////
server.app.listen(server.port, () => {
  // Ignoring this console.log warning for ESLint because this is useful information for the user
  console.log(`Server starting on http://localhost:${server.port}`); // eslint-disable-line no-console
});
