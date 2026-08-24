export declare interface IFieldError {
  /**
   * Field of the request that the error describes
   */
  field: string;

  /**
   * Human readable description of the problem
   */
  message: string;

  /**
   * Occasional insight on how to correct the error
   */
  suggestion?: string;
}
