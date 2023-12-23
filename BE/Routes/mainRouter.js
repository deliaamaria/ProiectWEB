import express from "express";
import { sequelize } from "../sequelize.js";
import { userRouter } from "./userRouter.js";
import * as usersController from "../Controllers/usersController.js";
import { User } from '../models/user.js'
import { Dissertation_request } from '../models/dissertation_request.js'


const router = express.Router();

router.get("/users", usersController.getAllUsersFromDB);
router.get("/users/name", usersController.getAllUsersNamesFromDB);
router.get("/filterUsers", usersController.filterUsersFromDB);
router.post("/newUser", usersController.insertUsersIntoDB);
router.get("/users/:usersId", usersController.getUsersFromDBById);
router.put("/users/:usersId", usersController.updateUsersById); // update is associated to the HTTP PUT method
router.delete("/users/:usersId", usersController.deleteUsers); // delete is associated to the HTTP DELETE method



//ALTA VARIANTA

// Mount the usersRouter => all the routes defined there will start
// with /users/..

router.use("/users1", userRouter);

/**
 * Create a special GET endpoint so that when it is called it will
 * sync our database with the models.
 */
router.put("/createDatabase1", async (request, response, next) => {
  try {
    await sequelize.sync({ force: true }); // force:true will drop the tables first
    // call this endpoint to create the tables first => PUT http://localhost:5001/api/createDatabase
    response.sendStatus(204); // 204-No Content Status Code
  } catch (error) {
    next(error); // use the next optional parameter
    // to pass control to the next middleware function if defined (it is, in app.js)
  }
});

// import data from JSON object
// call POST on http://localhost:5001/data
router.post("/data1", async (request, response, next) => {
  try {
    const registry = {}; //temporary variable in order to resolve the enrollments
    // send the data inside data.json inside the request body
    // of a POST method => req/ body/ select "raw" / select "JSON" not "TEXT"

    for (let u of request.body) {
      // the objects inside the array would be users
      const user = await User.create(u);
      for (let d of u.dissertation_requests) {
        // iterate through the "dissertation_requests" array
        const dissertation_request = await Dissertation_request.create(d);
        registry[d.key] = dissertation_request;
        // create the link with the user
        // this will add the userId attribute to the new dissertation_request record
        user.addDissertation_request(dissertation_request); // sequelize names the method using 'add' + *uppercase modelName*
      }
      await user.save(); // save the status
    }
    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

//export data from database by calling a GET on http://localhost:5001/api/data
router.get("/data1", async (request, response, next) => {
  try {
    const result = [];
    for (let u of await user.findAll()) {
      const user = {
        name: u.name,
        dissertation_requests: [],
      };     
      for (let d of await u.getdissertation_requests()) {
        user.dissertation_requests.push({
          key: d.id,
          student_name: d.student_name,
          teacher_name: d.teacher_name,
          status: d.status,
          title: d.title,
        });
      }
      result.push(user);
    }
    if (result.length > 0) {
      response.json(result);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

export { router as mainRouter };
