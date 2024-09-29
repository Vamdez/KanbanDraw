import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ProjectAttributes {
  id: number;
  name: string;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> {
  public id!: number;
  public name!: string;

  // Método para definir associações
  public static associate(models: any) {
    Project.hasMany(models.Dropper, {
      foreignKey: 'fk_Project', // Chave estrangeira no modelo Dropper
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
    },
    {
      sequelize,
      tableName: 'projects',
    }
  );

  return Project;
};