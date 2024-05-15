export type IBatchCreateParameters = {
  shipments?: (
    | {
        id: string;
      }
    | string
  )[];
};
