import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ProjectAttributes {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> {
  public id!: number;
  public name!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Método para definir associações
  public static associate(models: any) {
    Project.hasMany(models.Dropper, {
      foreignKey: 'fk_project', // Chave estrangeira no modelo Dropper
      as: 'droppers', // Nome da associação
    });
  }
}

export default (sequelize: Sequelize) => {
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type:DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        field: 'updated_at',
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'projects',
    }
  );

  return Project;
};