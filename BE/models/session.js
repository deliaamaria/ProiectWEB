import { sequelize } from "../sequelize.js";
import { DataTypes } from 'sequelize'; 


const Session = sequelize.define(
    'Session',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        start_date: {
            type: DataTypes.DATE
        },
        end_date: {
            type: DataTypes.DATE
        }       
    },
    {
        tableName: 'Session',
        timestamps: false
    }

)

export { Session }
