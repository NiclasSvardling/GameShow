/** @type {import("@rtk-query/codegen-openapi").ConfigFile} */

//set NODE_TLS_REJECT_UNAUTHORIZED=0
// npx @rtk-query/codegen-openapi openapi-config.cjs

const config = {
    schemaFile: 'https://localhost:7044/swagger/v1/swagger.json',
    apiFile: './src/BaseApi.ts',
    apiImport: 'baseApi',
    outputFile: './src/generatedApi.ts',
    exportName: 'generatedApi',
    tag: false, // no auto generation of tags, since we need to mangage our state with more granular control
    hooks: {
        queries: true,
        mutations: true,
        lazyQueries: true,
    },
    flattenArg: true,
    mergeReadWriteOnly: true,
    endpointOverrides: [
        {
            pattern: /get/,
            type: 'query',
        },
    ],
};

module.exports = config;