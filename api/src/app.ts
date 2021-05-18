import { Configuration, Inject, PlatformApplication } from '@tsed/common';
import { json } from 'express';

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ['application/json'],
  mount: {
    '/': '${rootDir}/entity/**/*.controller.ts',
  },
})
export default class Server {
  @Inject()
  app!: PlatformApplication;

  @Configuration()
  settings!: Configuration;

  public $beforeRoutesInit(): void | Promise<any> {
    this.app.use(json());
  }
}
