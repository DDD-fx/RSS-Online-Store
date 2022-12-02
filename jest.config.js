module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    rootDir: './src/_tests',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|webp|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    resetMocks: false,
    setupFiles: ['jest-localstorage-mock'],
};
