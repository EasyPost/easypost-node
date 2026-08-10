type UserParams = Record<string, unknown>;
type BrandParams = Record<string, unknown>;
type UserCollection = Record<string, unknown> & {
    has_more?: boolean;
    _params?: Record<string, unknown>;
};
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create a {@link User child user}.
     * See {@link https://docs.easypost.com/docs/users/child-users#create-a-child-user EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a child user with.
     * @returns {User} - The created child user.
     */
    create(params: UserParams): Promise<unknown>;
    /**
     * Update a {@link User user}.
     * See {@link https://docs.easypost.com/docs/users#update-a-user EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the user to update (either the current authenticated user or a child user).
     * @param {Object} params - The parameters to update the user with.
     * @returns {User} - The updated user.
     */
    update(id: string, params: UserParams): Promise<unknown>;
    /**
     * Retrieve a {@link User child user}.
     * See {@link https://docs.easypost.com/docs/users#retrieve-a-user EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the child user to retrieve.
     * @returns {User} - The retrieved child user.
     */
    retrieve(id: string): Promise<unknown>;
    /**
     * Retrieve the {@link User current authenticated user}.
     * See {@link https://docs.easypost.com/docs/users#retrieve-a-user EasyPost API Documentation} for more information.
     * @returns {User} - The retrieved user.
     */
    retrieveMe(): Promise<unknown>;
    /**
     * Delete a {@link User child user}.
     * See {@link https://docs.easypost.com/docs/users/child-users#delete-a-child-user EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the child user to delete.
     * @returns {Promise|Promise<never>} - A promise that resolves when the child user is deleted successfully.
     */
    delete(id: string): Promise<void>;
    /**
     * Update the brand of a {@link User user}.
     * See {@link https://docs.easypost.com/docs/users/brand#update-a-brand EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the user to update the brand of.
     * @param {Object} params - The parameters to update the brand with.
     * @returns {Brand} - The updated brand.
     */
    updateBrand(id: string, params: BrandParams): Promise<unknown>;
    /**
     * Retrieve a paginated list of children user {@link User user}.
     * See {@link https://docs.easypost.com/docs/users/child-users#retrieve-all-child-users EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters to filter the list of children users.
     * @returns {Object} - An object containing a list of {@link Children User} and pagination information.
     */
    allChildren(params: Record<string, unknown>): Promise<unknown>;
    /**
     * Retrieve the next page of children collection.
     * @param {Object} children An object containing a list of {@link Children children} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    getNextPage(children: UserCollection, pageSize?: number | null): Promise<unknown>;
    _getNextPage(url: string, key: string, collection: UserCollection, pageSize?: number | null): Promise<unknown>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
};
export default _default;
