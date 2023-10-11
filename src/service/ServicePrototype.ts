/* eslint-disable no-param-reassign */
import { AxiosError } from "axios";
import { objResult } from "../constants/constants";

export default class ServicePrototype {
  static _handlerError(result: objResult, err: AxiosError) {
    result.hasError = true;
    result.errorMessage = err.message || "Что-то сильно пошло не так";
  }
}