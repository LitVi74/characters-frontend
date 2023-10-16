/* eslint-disable no-param-reassign */
import { AxiosError } from "axios";

export interface Result<T> {
  hasError: boolean;
  errorMessage: string;
  data: T | null
}

export class ServicePrototype {
  static _handlerError<T>(result: Result<T>, err: AxiosError) {
    result.hasError = true;
    result.errorMessage = err.message || "Что-то сильно пошло не так";
  }
}