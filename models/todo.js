"use strict";
const { Model,Op} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    static gettodos(){
      return this.findAll({order:[["id","ASC"]]});
    }
    static Overdue(){
      return this.findAll({
        where:{
          dueDate:{
            [Op.lt]:new Date().toISOString()
          },
          completed:false,
        },
        order:[["id","ASC"]]
      })
    }
    static duelater(){
      return this.findAll({
        where:{
          dueDate:{
            [Op.gt]:new Date().toISOString()
          },
          completed:false,
        },
        order:[["id","ASC"]]
      })
    }
    static duetoday(){
      return this.findAll({
        where:{
          dueDate:{
            [Op.eq]:new Date().toISOString()
          },
          completed:false,
        },
        order:[["id","ASC"]]
      })
    }
    static completetodo(){
      return this.findAll({
        where:{
          completed:true,
        },
        order:[["id","ASC"]],
      })
    }
     setCompletionStatus(status) {
      return this.update({ completed: status });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
