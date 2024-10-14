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

  for (const url of pluginURLs) {
    try {
      const fileName = url.split('/').pop();

      if (fs.existsSync(`${saveDir}/${fileName}`) === false) {
        await download(url, saveDir, { filename: fileName });
      }

      const fileContent = await import(`${saveDir}/${fileName}`);

      const plugin: Plugin = fileContent.default as Plugin;
      plugins[plugin.name] = plugin;
    } catch (e) {
      console.error('Failed to download plugin:', e);
    }
  }

  return plugins;
}

// TODO:
//  Promise.all
