'use strict';

import { sequelize } from "../sequelize.js";
import { DataTypes } from 'sequelize';

const Dissertation_request = sequelize.define(

    'Dissertation_request',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        student_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User', 
                key: 'id',        
            },
            validate: {
                isStudent: async function(value) {
                    if (value) {
                        const student = await models.User.findByPk(value);
                        if (!student) {
                            throw new Error('Id-ul studentului asociat nu există.');
                        }
                    }
                }
            }
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User', 
                key: 'id',        
            },
            validate: {
                isTeacher: async function(value) {
                    if (value) {
                        const teacher = await models.User.findByPk(value);
                        if (!teacher) {
                            throw new Error('Id-ul profesorului asociat nu există.');
                        }
                    }
                }
            }
        },
        status: {
            type: DataTypes.STRING,
            validate: {
                isIn: {
                    args: [['in asteptare', 'acceptata', 'respinsa']],
                    msg: "Tipul de status trebuie să fie 'in asteptare', 'acceptata' sau 'respinsa'."
                }
            }
        },
        title: {
            type: DataTypes.STRING(150)
        },       
    },
    {
        tableName: 'Dissertation_requests'
    }

)

export { Dissertation_request };
