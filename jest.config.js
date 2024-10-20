module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
};
  