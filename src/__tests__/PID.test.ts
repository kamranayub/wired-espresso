import { applyRequestedTemperature, TemperatureContext } from "../PID";
import { DeviceMakeModel } from "../Devices";

let mockMakeAndModel: DeviceMakeModel;
let mockVersion: number;

jest.mock("../DeviceContext", () => ({
  DeviceContext: {
    get makeAndModel() {
      return mockMakeAndModel;
    },
    get version() {
      return mockVersion;
    }
  }
}));

describe("applyRequestedTemperature", () => {
  beforeEach(() => {
    // default make & model
    mockMakeAndModel = DeviceMakeModel.ECM_SYNCHRONIKA;
    mockVersion = 1;
  });

  it("should workaround temperature issue in LUCCA M58 v2 models", () => {
    mockMakeAndModel = DeviceMakeModel.LUCCA_M58;
    mockVersion = 2;

    applyRequestedTemperature(205);

    expect(TemperatureContext.requestedTemp).toBe(204);
  });

  it("should set temp context appropriately", () => {
    applyRequestedTemperature(205);

    expect(TemperatureContext.requestedTemp).toBe(205);
  });
});
