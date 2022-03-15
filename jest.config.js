module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^src/(.*)": "<rootDir>/src/$1",
        "^assets/(.*)": "<rootDir>/src/assets/$1",
        "^app/(.*)": "<rootDir>/src/app/$1",
        "^components/(.*)": "<rootDir>/src/app/components/$1",
        "^managers/(.*)": "<rootDir>/src/app/managers/$1",
        "^services/(.*)": "<rootDir>/src/app/services/$1",
        "^models/(.*)": "<rootDir>/src/app/models/$1",
        "^utils/(.*)": "<rootDir>/src/app/utils/$1",
        "^shared/(.*)": "<rootDir>/src/app/shared/$1",
    },
};
