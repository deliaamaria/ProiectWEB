import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./back-end/sqlite/disertatie.db'
})


sequelize.sync({alter:true}).then(()=>{
    console.log("All models has been synchronized");
}).catch((error) => {
    console.error('Eroare la crearea tabelelor:', error);
});

export { sequelize }