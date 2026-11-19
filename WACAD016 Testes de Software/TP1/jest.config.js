module.exports = {
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/'],
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.js', '!src/**/*.spec.js', '!src/**/*.teste.js'],

}