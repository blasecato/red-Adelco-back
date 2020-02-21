
interface EnvConfig {
  [prop: string]: string;
}

export class ConfigService {

  constructor() { }

  get jwt(): string {
    return "mega_password"
  }

  get orm_config(): any {
    return {
      type: 'mysql',
      host: '25.84.87.106',
      port: 3306,
      username: 'tcsp_user',
      password: 'WdDdQlrc1oU2ebYV',
      database: 'tcsp_database',
      entities: ['dist/entities/*.js'],
      synchronize: true
    }
  }
}

export default new ConfigService()