module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '^@entities/(.*)$': '<rootDir>/src/domain/entities/$1',
    '^@repositories/(.*)$': '<rootDir>/src/domain/repositories/$1',
    '^@use-cases/(.*)$': '<rootDir>/src/application/use-cases/$1',
    '^@composition/(.*)$': '<rootDir>/src/composition/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation)/)',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
