const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");

const connectionDB = async () => {
  await mongoose.connect(
    "mongodb+srv://rajashekaras4900_db_user:sVQtFEZ4HklIHOsM@namastenode.h21g2qi.mongodb.net/devtinder",
  );
};

module.exports = {
  connectionDB,
};
