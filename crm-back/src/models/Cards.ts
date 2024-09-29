import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize';

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

export class Cards extends Model<CardsAttributes, CardsCreationAttributes> {
  public id!: number;
  public titulo!: string;
  public content!: string;
  public position!: number;
  public fk_Dropper!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Cards.belongsTo(models.Dropper, {
      foreignKey: 'fk_Dropper',
      as: 'dropper',
    });
  }
}

export default (sequelize: Sequelize, DataTypes: any) => {
  Cards.init(
    {
      id: {
        type: DataTypes.INTEGER,
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
      sequelize,
      tableName: 'cards',
    }
  );

  return Cards;
};