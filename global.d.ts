import {z} from 'zod';

export {};
declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (
      props: P,
      ref: import('react').ForwardedRef<T>,
    ) => import('react').ReactElement | null,
  ): (
    props: P & import('react').RefAttributes<T>,
  ) => import('react').ReactElement | null;
}
declare global {
  type ActionBase<T = undefined> = T extends undefined
    ? {
        type: string;
      }
    : {
        type: string;
        payload: T;
      };
  type ZodShape<T> = {
    // Require all the keys from T
    [key in keyof T]-?: undefined extends T[key]
      ? // When optional, require the type to be optional in zod
        z.ZodOptionalType<z.ZodType<T[key]>>
      : z.ZodType<T[key]>;
  };
  type CustomOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
  type ReOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  type NestedNavigatorParams<ParamList> = {
    [K in keyof ParamList]: undefined extends ParamList[K]
      ? {screen: K; params?: ParamList[K]}
      : {screen: K; params: ParamList[K]};
  }[keyof ParamList];

  type IncludeMatchingProperties<T, V> = Pick<
    T,
    {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T]
  >;

  type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
  > &
    {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
    }[Keys];
  type ResponseBase<T = any, TStatus = boolean> = {
    code: number;
  } & (TStatus extends true
    ? {
        data: T;

        status: true;
      }
    : {
        status: false;

        msg?: string | null;
      });

  interface String {
    /**
     * Convert string to camel case
     */
    capitalize(): string;

    /**
     * Convert all UTF-8 to ASCII lowercase.
     */
    changeAlias(): string;

    /**
     * Remove html tag from string
     */
    removeHtmlTag(): string;

    /**
     * Return true if string is empty
     */
    isEmpty(): boolean;

    /**
     * Remove all characters except 0-9
     */
    removeChar(): string;

    /**
     * Get all URL from string
     */
    getURL(): Array<string>;

    /**
     * Replaces all match with string
     */
    replaceAll(searchValue: string, replaceValue: string): string;

    /**
     * Convert string color to hex color
     */
    toHexColor(): string;

    /**
     * Convert japanese full width to half width
     */
    toHalfWidth(): string;

    /**
     * Convert japanese half width to full width
     */
    toFullWidth(): string;

    /**
     * Create random string ID
     */
    randomUniqueId(): string;
  }
}
