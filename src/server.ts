import './util/module-alias'
import { Server } from '@overnightjs/core'
import bodyParser from 'body-parser'
import * as database from '@src/database'
import { ForecastController } from './controllers/forecast'
import { Application } from 'express'
import { BeachesController } from './controllers/beaches'
import { UsersController } from './controllers/users'

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super()
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json())
  }

  public async init(): Promise<void> {
    this.setupExpress()
    this.setupControllers()
    await this.databaseSetup()
  }

  private setupControllers(): void {
    const forecastController = new ForecastController()
    const beachesController = new BeachesController()
    const usersController = new UsersController()
    this.addControllers([
      forecastController,
      beachesController,
      usersController,
    ])
  }

  private async databaseSetup(): Promise<void> {
    await database.connect()
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info('Server listening on port:', this.port)
    })
  }

  public async close(): Promise<void> {
    await database.close()
  }

  public getApp(): Application {
    return this.app
  }
}
