jest.mock("@/src/native/TurboModule", () => ({
    __esModule: true,
    default: {
        authorization: jest.fn().mockResolvedValue(true),
    },
}));

jest.mock("@/specs/NativeModule", () => ({
    __esModule: true,
    default: {
        getEnforcing: jest.fn().mockResolvedValue("NativeModule"),
        summuryPopulation: jest.fn().mockResolvedValue(1000),
    },
}));