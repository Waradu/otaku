import { exists, BaseDirectory, createDir, writeTextFile } from "@tauri-apps/api/fs";
import type { PetData } from "~/types/controller";

export default defineNuxtPlugin((nuxtApp) => {
  
  const file_manager = {
    async save(data: PetData) {
      await this.checkFiles()
      await writeTextFile('pet.json', JSON.stringify(data, null, 2), { dir: BaseDirectory.AppData });
    },
    async checkFiles() {
      const appDataExists = await exists('', { dir: BaseDirectory.AppData });
      if (!appDataExists) {
        await createDir('', { dir: BaseDirectory.AppData });
      }

      const dataFileExists = await exists('pet.json', { dir: BaseDirectory.AppData });
      if (!dataFileExists) {
        await writeTextFile('pet.json', "{}", { dir: BaseDirectory.AppData });
      }
    }
  }
  
  return {
    provide: {
      file_manager,
    },
  };
});
