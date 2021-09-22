import * as fs from 'fs';

import { promisify } from 'util';

/**
 * Check if a file exists at a given path.
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
export const checkIfFileOrDirectoryExists = (path: string): boolean => {
  return fs.existsSync(path);
};

/**
 * Gets file data from a given path via a promise interface.
 *
 * @param {string} path
 * @param options
 *
 * @returns {Promise<Buffer>}
 */
export const getFile = async (
  path: string,
  options?: {
    encoding?: null | undefined;
    flag?: string | undefined;
  } | null,
): Promise<Buffer | string> => {
  return fs.readFileSync(path, options);
  // const readFile = promisify(fs.readFile);
  // if (options) {
  //   return readFile(path, options);
  // }
  //
  // return readFile(path, {});
};

/**
 * Writes a file at a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} fileName
 * @param {string} data
 *
 * @return {Promise<void>}
 */
export const createFile = async (path: string, fileName: string, data: string): Promise<void> => {
  if (!checkIfFileOrDirectoryExists(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  return fs.writeFileSync(`${path}/${fileName}`, data, 'utf-8');

  // const writeFile = promisify(fs.writeFile);
  // return await writeFile(`${path}/${fileName}`, data, 'utf-8');
};

/**
 * Delete file at the given path via a promise interface
 *
 * @param {string} path
 *
 * @returns {Promise<void>}
 */
export const deleteFile = async (path: string): Promise<void> => {
  const unlink = promisify(fs.unlink);

  return await unlink(path);
};
