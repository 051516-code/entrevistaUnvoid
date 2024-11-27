const tar = require('tar');
const fs = require('fs');
const path = require('path');
const ignore = require('ignore');

/**
 * Utility function to map over a generator.
 *
 * @param {Generator} generator - The input generator.
 * @param {Function} mapFn - The mapping function.
 * @returns {Generator} - The mapped generator.
 */
function* mapGenerator(generator, mapFn) {
  for (const value of generator) {
    yield mapFn(value);
  }
}

/**
 * Utility function to filter a generator.
 *
 * @param {Generator} generator - The input generator.
 * @param {Function} filterFn - The filtering function.
 * @returns {Generator} - The filtered generator.
 */
function* filterGenerator(generator, filterFn) {
  for (const value of generator) {
    if (filterFn(value)) {
      yield value;
    }
  }
}

/**
 * Utility function to compose multiple functions.
 *
 * @param {...Function} fns - The functions to compose.
 * @returns {Function} - The composed function.
 */
const pipe = (input, ...fns) => fns.reduce((acc, fn) => fn(acc), input);

/**
 * Walk through a directory and yield file paths.
 *
 * @param {string} dir - The directory to walk through.
 * @yields {string} - The file path.
 */
function* walk(dir) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      yield* walk(filePath);
    } else {
      yield filePath;
    }
  }
}

/**
 * Get the list of files to include in the tarball, excluding those ignored by
 * .gitignore.
 *
 * @returns {string[]} - The list of files to include.
 */
const getFilesToInclude = () => {
  const ig = ignore();
  const gitignorePath = path.join(__dirname, '.gitignore');

  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    ig.add(gitignoreContent);
  }

  return pipe(
    walk(__dirname),
    files => mapGenerator(files, file => path.relative(__dirname, file)),
    files => filterGenerator(files, file => !ig.ignores(file)),
    files => Array.from(files),
  );
};

/**
 * Ensure the uploads directory exists.
 *
 * @param {string} uploadsDir - The path to the uploads directory.
 */
const ensureUploadsDirExists = uploadsDir => {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }
};

/**
 * Get the next available tarball name with a numeric increment as a postfix.
 *
 * @param {string} uploadsDir - The path to the uploads directory.
 * @param {string} baseName - The base name of the tarball.
 * @param {string} extension - The extension of the tarball.
 * @returns {string} - The next available tarball name.
 */
const getNextTarballName = (uploadsDir, baseName, extension) => {
  const getTarballName = index => (index === 0 ? `${baseName}${extension}` : `${baseName}-${index}${extension}`);
  let index = 0;
  while (fs.existsSync(path.join(uploadsDir, getTarballName(index)))) {
    index++;
  }
  return getTarballName(index);
};

/** Main function to generate the tarball. */
const main = () => {
  const uploadsDir = path.join(__dirname, 'uploads');
  ensureUploadsDirExists(uploadsDir);

  const filesToInclude = getFilesToInclude();
  const baseTarballName = 'upload-me';
  const tarballExtension = '.tar.gz';
  const tarballName = getNextTarballName(uploadsDir, baseTarballName, tarballExtension);
  const tarballPath = path.join(uploadsDir, tarballName);

  tar
    .c(
      {
        gzip: true,
        file: tarballPath,
        cwd: __dirname,
      },
      filesToInclude,
    )
    .then(() => {
      console.log(`Tarball created: ${tarballName}`);
      console.log(`You can open the directory with the tarball here: file://${uploadsDir}`);

      import('open').then(open => {
        open.default(uploadsDir);
      });
    })
    .catch(err => {
      console.error('Error creating tarball:', err);
    });
};

main();
