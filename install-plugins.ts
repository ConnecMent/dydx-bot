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
      await download(url, saveDir, { filename: 'temp' });

      const fileContent = fs.readFileSync(`${saveDir}/temp`);

      const plugin: Plugin = JSON.parse(fileContent.toString());
      plugins[plugin.name] = plugin;

      fs.writeFileSync(`${saveDir}/${plugin.name}.json`, fileContent);
    } catch (e) {
      console.error('Failed to download plugin:', e);
    } finally {
      fs.unlinkSync(`${saveDir}/temp`);
    }
  }

  return plugins;
}
