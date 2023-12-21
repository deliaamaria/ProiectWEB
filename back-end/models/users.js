'use strict';

import { sequelize } from "../sequelize.js";
import { DataTypes } from 'sequelize';

console.log("merge");

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                is: [/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}/.test(value)]
            }
        },
        account_type: {
            type: DataTypes.STRING,
            validate: {
                isIn: {
                    args: [['student', 'profesor']],
                    msg: "Tipul de cont trebuie să fie 'student' sau 'profesor'."
                }
            }
        },
        student_number: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            validate: {
                onlyForTeacher: function(value) {
                    if (this.account_type === 'profesor' && value === null) {
                        throw new Error("Numărul de studenti trebuie completat pentru tipul de cont 'profesor'.");
                    }
                }
            }
        }        
    },
    {
        tableName: 'Users'
    }

)

export { User }
