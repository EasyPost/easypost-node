export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type ParametersToOmitOnCreate = 'id' | 'object' | 'mode' | 'created_at' | 'updated_at';
