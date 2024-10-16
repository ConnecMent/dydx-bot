import { Plugin } from './types/plugin.js';
import download from 'download';
import fs from 'fs';
import os from 'os';

export default async function installPlugins(
  pluginURLs: string[],
): Promise<Record<string, Plugin>> {
  const plugins: Record<string, Plugin> = {};

  const saveDir = os.homedir() + '/dydx-bot/plugins';

  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
  }

  await Promise.all(
    pluginURLs.map(async (url) => {
      try {
        const fileName = url.split('/').pop();
        const filePath = `${saveDir}/${fileName}`;

        if (fs.existsSync(filePath) === false) {
          await download(url, saveDir, { filename: fileName });
        }

        const fileContent = await import(`file://${filePath}`);

        const plugin: Plugin = fileContent.default as Plugin;
        plugins[plugin.name] = plugin;
      } catch (e) {
        console.error('Failed to download plugin:', e);
      }
    }),
  );

  return plugins;
}
