import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { ForecastController } from './controllers/forecast';
import * as database from '@src/database'
import { Application } from 'express';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup()
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();
    this.addControllers([forecastController]);
  }

  private async databaseSetup() :Promise<void> {
    await database.connect()
  }

  public async close(): Promise<void> {
    await database.close()
  }

  public getApp(): Application {
    return this.app;
  }
}
