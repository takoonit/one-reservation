module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    },
};
  