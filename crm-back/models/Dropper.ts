import { DataTypes, Model, Optional } from 'sequelize';
import db from './index';
import Cards from './Cards';

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
  public id: number;
  public title: string;
  public position: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public fk_Project: number;

  // Método para definir associações
  public static associate(models: any) {
    Dropper.belongsTo(models.Project, {
      foreignKey: 'fk_Project',
      as: 'project', // Nome da associação
    });
    Dropper.hasMany(models.Cards, {
      foreignKey: 'fk_Dropper', // Chave estrangeira no modelo Cards
      as: 'cards', // Nome da associação
    });
  }
}

Dropper.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    sequelize: db.sequelize,
    tableName: 'droppers',
  }
);

export default Dropper;
