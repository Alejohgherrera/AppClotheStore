module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|react-native-safe-area-context|react-native-screens|@react-native-async-storage/.*)',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/__tests__/**',
    '!babel.config.js',
  ],
};