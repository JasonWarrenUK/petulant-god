const server = require("./server.js");

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`I HAVE AWOKEN. APPROACH ME ON ${PORT}`));