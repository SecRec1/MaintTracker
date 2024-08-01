// const express = require('express');
// const port = process.env.PORT || 8080;
// const app = express();
// const cors = require("cors");
// const corsOptions ={
//    origin:'http://127.0.0.1:3000/search', 
   
              
//    optionSuccessStatus:200,
// }

// app.use(cors(corsOptions))


// app.use(express.static(__dirname + '/dist/'));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000/search");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, Content-Type, Accept"
//   );
//   next();
// });

// app.get(/.*/, function (req, res) {
//   res.sendFile(__dirname + '/dist/index.html');
//   res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000/search");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, Content-Type, Accept"
//   );
// })
// app.listen(port);
// console.log("server started");

const express = require('express');
const cors = require("cors");
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

// CORS configuration
const corsOptions = {
  origin: '*', // Allows access from any origin
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all requests and serve the index.html file
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on http://0.0.0.0:${port}`);
});
