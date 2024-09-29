import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface DropperAttributes {
  id: number;
  title: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
  fk_Project: number;
}

interface DropperCreationAttributes extends Optional<DropperAttributes, 'id'> {}

class Dropper extends Model<DropperAttributes, DropperCreationAttributes> {
  public id!: number;
  public title!: string;
  public position!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public fk_Project!: number;

  public static associate(models: any) {
    Dropper.belongsTo(models.Project, {
      foreignKey: 'fk_Project',
      as: 'project',
    });
    Dropper.hasMany(models.Cards, {
      foreignKey: 'fk_Dropper',
      as: 'cards',
    });
  }
}

export default (sequelize: Sequelize) => {
  Dropper.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        allowNull: false,
      },
      fk_Project: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'droppers',
    }
  );

  return Dropper;
};