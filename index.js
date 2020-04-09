const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const paypal = require("paypal-rest-sdk");

// View engine
app.set("view engine", "ejs");

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AanXona2ffYXMiZwLttM-M-f1-Mbpr7wpnNRsGTP4baxKMJYzn3TrxV2lCnkuaGX8S7kFStRAfF-pqf-",
  client_secret:
    "EF26nDBGKyDFsWvrYqQh7jv9McaJBsufHvc3mIPIYjH_bV814cuvY1va21ePrkNgbyqZjtns5Qr2k4eQ",
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/comprar", (req, res) => {
  var pagamento = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://return.url",
      cancel_url: "http://cancel.url",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Bola",
              sku: "bola_11",
              price: "5.00",
              currency: "BRL",
              quantity: 5,
            },
          ],
        },
        amount: {
          currency: "BRL",
          total: "25",
        },
        description: "Testando a venda da bola.",
      },
    ],
  };

  paypal.payment.create(pagamento, (err, payment) => {
    if (err) {
      console.log(err);
    } else {
      res.json(payment);
    }
  });
});

app.listen(45567, () => {
  console.log("Running!");
});
