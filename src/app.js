import express from "express";
import routes from "./routes";
import paypal from "paypal-rest-sdk";

class App {
  constructor() {
    this.server = express();

    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(
      paypal.configure({
        mode: "sandbox", //sandbox or live
        client_id:
          "AanXona2ffYXMiZwLttM-M-f1-Mbpr7wpnNRsGTP4baxKMJYzn3TrxV2lCnkuaGX8S7kFStRAfF-pqf-",
        client_secret:
          "EF26nDBGKyDFsWvrYqQh7jv9McaJBsufHvc3mIPIYjH_bV814cuvY1va21ePrkNgbyqZjtns5Qr2k4eQ",
      })
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
