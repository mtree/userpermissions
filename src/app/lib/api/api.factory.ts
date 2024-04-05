import { IApiService } from "./api.service";
import { MockApiService } from "./mock-api.service";

/**
 * Factory class for creating instances of the `IApiService`.
 */
export class ApiServiceFactory {
  static create(): IApiService {
      // TODO: switch between real and mock services based on env
      return new MockApiService();
  }
}
