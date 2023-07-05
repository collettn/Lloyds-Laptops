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

// Release Laptop 
Router.route("/laptop/release/:id")
  .get(appController.releaseLaptop)
  .post(appController.releaseLaptop);

Router.route("/laptops")
  .get(appController.getAllLaptops)
  .post(appController.addLaptop);

Router.route("/laptops/assigned")
  .get(appController.getAssignedLaptops);

Router.route("/laptops/unassigned")
  .get(appController.getUnassignedLaptops);

Router.route("/staff/unassigned")
  .get(appController.getStaffNeedingLaptops);

Router.route("/staff/laptops")
  .get(appController.getStaffLaptops);

Router.route("/client/laptops")
  .get(appController.getClientLaptops);

  Router.route("/client/unassigned")
  .get(appController.getClientNeedingLaptops);

Router.route("/user/laptop/assign/:id/:user")
  .get(appController.assignToUser);

//Users
Router.route("/user/add")
  .get(appController.newUser);

Router.route("/user/edit/:id")
  .get(appController.getUser);

Router.route("/user/assign/:id")
  .get(appController.confirmUnassignedLaptops );

Router.route("/user/delete/:id")
  .get(appController.deleteUser)
  .post(appController.deleteUser);

Router.route("/users")
  .get(appController.getAllUsers)
  .post(appController.addUser);

Router.route("/users/staff")
  .get(appController.getStaff)

Router.route("/users/clients")
  .get(appController.getClients)

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
