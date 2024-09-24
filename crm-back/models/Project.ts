import { DataTypes, Model, Optional } from 'sequelize';
import db from './index';
import Dropper from './Dropper';

interface ProjectAttributes {
  id: number;
  name: string;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> {
  public id: number;
  public name: string;

  // Método para definir associações
  public static associate(models: any) {
    Project.hasMany(models.Dropper, {
      foreignKey: 'fk_Project', // Chave estrangeira no modelo Dropper
      as: 'droppers', // Nome da associação
    });
  }
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db.sequelize,
    tableName: 'projects',
  }
);

export default Project;
