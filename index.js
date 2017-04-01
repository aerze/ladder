/* eslint-disable no-console */
require('babel-core/register')({
  presets: ['es2015', 'react']
});

require('dotenv').config();

const port = process.env.PORT || 8080;
const app = require('./server/app').default;

app.listen(port, (error) => {
  if (!error) {
    console.info(`
██╗      █████╗ ██████╗ ██████╗ ███████╗██████╗ 
██║     ██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
██║     ███████║██║  ██║██║  ██║█████╗  ██████╔╝
██║     ██╔══██║██║  ██║██║  ██║██╔══╝  ██╔══██╗
███████╗██║  ██║██████╔╝██████╔╝███████╗██║  ██║
╚══════╝╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝                                                                                           
PORT ${port}
    `);
  }
});
