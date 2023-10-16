declare module "*.svg";

declare module "*.scss" {
  const content: { [key: string]: any };
  export = content;
}
