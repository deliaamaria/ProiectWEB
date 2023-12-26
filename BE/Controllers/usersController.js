import { User } from '../models/user.js'

//Controller example with SQLite Database => Sequelize Querying

export const loginUser = async (req, res, next) => {
  const { email: userEmail, password: userPassword } = req.body;

  try {
    // Validate email and password (add more validation as needed)
    if (!userEmail || !userPassword) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email: userEmail } });

    // Check if the user exists and the password is correct (add your password hashing logic)
    if (!user || user.password !== userPassword) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Successful login, return the user object (excluding sensitive information)
    const { id, name, email, account_type, student_number } = user;
    res.json({ id, name, email, account_type, student_number });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    // Optionally, call next(error) to pass control to the next middleware
  }
};

// get all users
const getAllUsersFromDB = async (req, res) => {
  try {
    //The findAll() method will return your table rows as an array of objects.
    //The Sequelize findAll() method is used to query data from your SQL table to your JavaScript application.
    const users = await User.findAll()
    return res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
    //The HTTP status code 500 is a generic error response.
    //It means that the server encountered an unexpected condition
    //that prevented it from fulfilling the request.
  }
}

// get all users but only some columns
const getAllUsersNamesFromDB = async (req, res) => {
  try {
    //The findAll() method will return your table rows as an array of objects.
    //The attributes key will limit the return value to specific columns of the records.
    const users = await User.findAll({ attributes: ['name'] })
    return res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
}

// the ID is the primary key => findByPk() sequelize method
const getUsersFromDBById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId) // find by primary key => findByPK()
    if (user) {
      return res.status(200).json(user)
    } else {
      // if no entity exists, null is returned;
      return res
        .status(404)
        .json({ error: `User with id ${req.params.userId} not found` })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

//INSERT INTO
const insertUsersIntoDB = async (req, res) => {
  try {
    //create is mapped by Sequelize to "INSERT INTO ..."
    const newUsers = await User.create(req.body)
    return res.status(200).json(newUsers)
  } catch (err) {
    return res.status(500).json(err)
  }
}

//UPDATE
const updateUsersById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (user) {
      const updatedUsers = await user.update(req.body) // update using the update() method provided by Sequelize on the returned PK object
      // OBS: update on the found object and not on the "Users" model
      return res.status(200).json(updatedUsers)
    } else {
      // if no entity exists, null is returned;
      return res
        .status(404)
        .json({ error: `User with id ${req.params.userId} not found` })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

//DELETE
const deleteUsers = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId) // find by primary key => findByPK()
    if (user) {
      // destroy() is mapped to "DELETE ... FROM ..."
      await user.destroy()
      return res.status(200).json('Entity deleted successfully!')
      //OBS: destroy() the found user and do not call destroy() on the "Users" model
    } else {
      // if no entity exists, null is returned;
      return res
        .status(404)
        .json({ error: `User with id ${req.params.userId} not found` })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

//FILTER

const filterUsersFromDB = async (req, res) => {
  try {
    const account_type = req.query.account_type;
    let whereClause = {};
    
    if (account_type) {
      // Dacă există un tip de cont specificat, adaugă condiția în whereClause
      whereClause.account_type = account_type;
    }
    
    const users = await User.findAll({
      
      where: whereClause
    })
    return res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  getAllUsersFromDB,
  getAllUsersNamesFromDB,
  getUsersFromDBById,
  filterUsersFromDB,
  insertUsersIntoDB,
  updateUsersById,
  deleteUsers
}
