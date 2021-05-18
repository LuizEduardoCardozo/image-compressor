import { $log } from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';
import app from './app';

async function bootstrap() {
  try {
    $log.debug('Start server...');
    const platform = await PlatformExpress.bootstrap(app, {});
    await platform.listen();
    $log.debug('Server initialized');
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
