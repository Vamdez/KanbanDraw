import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface DropperAttributes {
  id: number;
  title: string;
  position: number;
  created_at: Date;
  updated_at: Date;
  fk_project: number;
}

interface DropperCreationAttributes extends Optional<DropperAttributes, 'id'> {}

class Dropper extends Model<DropperAttributes, DropperCreationAttributes> {
  public id!: number;
  public title!: string;
  public position!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public fk_project!: number;

  public static associate(models: any) {
    Dropper.belongsTo(models.Project, {
      foreignKey: 'fk_project',
      as: 'project',
    });
    Dropper.hasMany(models.Cards, {
      foreignKey: 'fk_dropper',
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
      created_at: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        field: 'updated_at',
        allowNull: false,
      },
      fk_project: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'droppers',
    }
  );

  return Dropper;
};