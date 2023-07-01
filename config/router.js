import express from "express";
import appController from "../controller/appController.js";

const Router = express.Router();

//Home Page
Router.route("/")
  .get(appController.showHome);

// Add Laptop form (post in index.js)  
Router.route("/laptop/add")
  .get(appController.newLaptop);

// Update Laptop form (post in index.js)
Router.route("/laptop/edit/:id")
    .get(appController.getLaptop);

// Delete Laptop
Router.route("/laptop/delete/:id")
  .get(appController.deleteLaptop)
  .post(appController.deleteLaptop);

Router.route("/laptops")
  .get(appController.getAllLaptops)
  .post(appController.addLaptop);

Router.route("/user/add")
    .get(appController.newUser);

Router.route("/user/edit/:id")
    .get(appController.getUser);

Router.route("/user/delete/:id")
    .get(appController.deleteUser)
    .post(appController.deleteUser);

Router.route("/users")
    .get(appController.getAllUsers)
    .post(appController.addUser);

Router.route("/users/staff")
    .get(appController.getStaff)



// ** Test Only **
Router.route("/laptop/update")
  .get(appController.updateLaptop);

Router.route("/user/update")
  .get(appController.updateUser);

Router.route("/laptops/:id")
  .get(appController.getLaptop)
  .put(appController.updateLaptop)
  .delete(appController.deleteLaptop);

Router.route("/users/:id")
  .get(appController.getUser)
  .put(appController.updateUser)
  .delete(appController.deleteUser);

export default Router;
