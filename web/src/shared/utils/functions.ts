import { AnyType, IErrorResponse, IOption } from "@shared/interfaces";

export const bytesToMegaBytes = (bytes: number): number => {
  return bytes / (1024 * 1024);
};

export const debounce = <F extends (...args: AnyType) => AnyType>(func: F, waitFor = 500) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  const debounced = (...args: AnyType) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export function getUniqueArray<T>(a: T[], property: keyof T) {
  return a.filter((item, pos, self) => self.findIndex((v) => v[property] === item[property]) === pos);
}

export const getUSFormattedDate = (date: Date | string | undefined | null, timeZone?: string) => {
  return date ? new Date(date).toLocaleString("en-US", { timeZone }).split(",")[0] : "-";
};

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result as string);
  });
}

export function downloadFile(data: Blob, name: string) {
  const blob = new Blob([data]);
  const url = window.URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.download = name;
  anchor.href = url;
  anchor.click();
}

export const openInNewTab = (url: string) => {
  window.open(url, "_blank", "noreferrer");
};

export const getOptionValueFromObject = <T>(
  obj: T | undefined,
  valueField: keyof T,
  labelField: keyof T,
): IOption<string> | null => {
  if (!obj) return null;

  return { value: String(obj[valueField]), label: obj[labelField] as string, object: obj };
};

export function getObjectPropertyValue<T, K extends keyof T>(obj: T, path: string): T[K] | undefined {
  try {
    const keys: string[] = path.split(".");
    let value: AnyType = obj;
    for (const key of keys) {
      value = value[key];
    }
    return value;
  } catch (error) {
    return undefined;
  }
}

export function prepareErrorResponsePayload(error: IErrorResponse): IErrorResponse {
  const DEFAULT_ERROR_MESSAGE = "Something Went Wrong. Try Again";

  return {
    ...error,
    message: error.message || DEFAULT_ERROR_MESSAGE,
    customMessageText: error.customMessageText || DEFAULT_ERROR_MESSAGE,
  };
}
