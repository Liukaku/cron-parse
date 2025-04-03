module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  setupFilesAfterEnv: [],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  extensionsToTreatAsEsm: [".ts"],
};