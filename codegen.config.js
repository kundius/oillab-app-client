const { parsed: localEnv } = require('dotenv').config()
const fs = require('fs')
const path = require('path')

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const GRAPHQL_URL = localEnv.GRAPHQL_URL ? localEnv.GRAPHQL_URL : 'http://localhost:4000/graphql'

const featuresDir = path.join(process.cwd(), 'src', 'features')
const featureDirs = getDirectories(featuresDir)
const componentsGenerates = {}

for (const featureDir of featureDirs) {
  const componentDirs = getDirectories(path.join(featuresDir, featureDir, 'components'))
  for (const componentDir of componentDirs) {
    componentsGenerates[path.join(featuresDir, featureDir, 'components', componentDir, 'codegen.tsx')] = {
      plugins: [
        "typescript-operations",
        "typescript-react-apollo"
      ],
      config: {
        dedupeOperationSuffix: true,
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        withMutationFn: true,
        typesPrefix: 'Gql'
      },
      documents: path.join(featuresDir, featureDir, 'components', componentDir, '*.{graphql,ts,tsx}')
    }
  }
}

module.exports = {
  schema: GRAPHQL_URL,
  watch: true,
  documents: 'src/**/*.graphql',
  generates: {
    'src/types.ts': {
      plugins: ['typescript'],
      config: {
        dedupeOperationSuffix: true,
        skipTypename: false
      }
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'types.ts'
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        dedupeOperationSuffix: true,
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        withMutationFn: true
      }
    }
  }
}
