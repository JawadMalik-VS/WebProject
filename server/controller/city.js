const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CityController {
  async createCity(req, res) {
    try {
      const data = {
        name: req.body.name,
        temp: req.body.temp,
      };
      await prisma.city({
        data,
      });
      res.send("created");
      console.log("data is", res);
    } catch {
      console.log("error");
      res.send("Error");
    }
  }

  async getCity(req, res) {
    try {
      const result = await prisma.city.findMany();
      res.send(result);
      console.log(res);
    } catch {
      res.send("Error");
      console.log("error in get");
    }
  }
}

module.exports = new CityController();
