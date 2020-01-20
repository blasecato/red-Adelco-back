
interface EnvConfig {
  [prop: string]: string;
}

export class ConfigService {

  constructor() {

  }
  
  

  get orm_config(): any {
    return {
      
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'redadelco',
      entities: ['dist/entities/*.js'],
      synchronize: true
    }
  }
}

export default new ConfigService()