import { DataTypes, Model, Optional } from 'sequelize';
import db from './index';

interface CardsAttributes {
  id: number;
  titulo: string;
  content: string;
  position: number;
  fk_Dropper: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CardsCreationAttributes extends Optional<CardsAttributes, 'id'> {}

class Cards extends Model<CardsAttributes, CardsCreationAttributes> {
  public id: number;
  public titulo: string;
  public content: string;
  public position: number;
  public fk_Dropper: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  // Método para definir associações
  public static associate(models: any) {
    Cards.belongsTo(models.Dropper, {
      foreignKey: 'fk_Dropper', // Chave estrangeira no modelo Cards
      as: 'dropper', // Nome da associação
    });
  }
}

Cards.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_Dropper: {
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
  },
  {
    sequelize: db.sequelize,
    tableName: 'cards',
  }
);

export default Cards;
