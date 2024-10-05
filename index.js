import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import { 
  createCustomer, 
  deleteCustomer, 
  getCustomerById, 
  getCustomers, 
  updateCustomer 
} from "./controllers/customer.js";
import { 
  createOffer,
  deleteOffer,
  getOfferById,
  getOffers,
  updateOffer, 
} from "./controllers/offer.js";

dotenv.config({ path: "./.env" });
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/customers/new", createCustomer);
app.get("/customers/all", getCustomers);
app
  .get("/customers/:id", getCustomerById)
  .put("/customers/:id", updateCustomer)
  .delete("/customers/:id", deleteCustomer);

app.post("/offers/new", createOffer);
app.get("/offers/all", getOffers);
app
  .get("/offers/:id", getOfferById)
  .put("/offers/:id", updateOffer)
  .delete("/offers/:id", deleteOffer);


connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch((error) => {
  console.log("DATABASE CONNECTION ERROR", error);
  process.exit(1);
});