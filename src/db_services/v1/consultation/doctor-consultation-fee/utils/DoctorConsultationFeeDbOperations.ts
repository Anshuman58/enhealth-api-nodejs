import { Params, ServiceAddons } from '@feathersjs/feathers';
import {
    DoctorConsultationFee_QUERY as Query,
    DoctorConsultationFee_PATCH as Body_Patch,
    DoctorConsultationFee_POST as Body,
    DoctorConsultationFee_GET as Datum,
    DoctorConsultationFee_FIND as Data,
} from '../interfaces/DoctorConsultationFeeInterfaces';
import { Document, Model } from 'mongoose';
import { DoctorConsultationFee } from '../doctor-consultation-fee.class';

export class DoctorConsultationFeeDbOperations {
    private static _service: DoctorConsultationFee & ServiceAddons<any>;
    static _model: Model<Document<any>>;
    static _servicePath = 'v1/consultation/doctor-consultation-fee';

    /**
     * Initialize service
     * @param service - Service value.
     */
    static initializeService(service: DoctorConsultationFee & ServiceAddons<any>) {
        DoctorConsultationFeeDbOperations._service = service;
        DoctorConsultationFeeDbOperations._model = service.Model;
    }

    /**
     * Get data.
     * @param dbQuery - Db fields related query.
     * @param specifiedQuery - Any other specified query like $sort, $limit etc.
     * @param params - Feathers params object from context.
     */
    static async getDataWithPagination({
        dbQuery,
        specifiedQuery = {},
        params = {},
    }: {
        dbQuery: Query;
        specifiedQuery?: any;
        params?: Params;
    }) {
        return await DoctorConsultationFeeDbOperations._service
            ._find({
                query: {
                    ...dbQuery,
                    ...specifiedQuery,
                    ...params,
                },
            })
            .then((res) => {
                return res as Data;
            });
    }

    /**
     * Get data.
     * @param dbQuery - Db fields related query.
     * @param specifiedQuery - Any other specified query like $sort, $limit etc.
     * @param params - Feathers params object
     */
    static async getDataWithoutPagination({
        dbQuery,
        specifiedQuery = {},
        params = {},
    }: {
        dbQuery: Query;
        specifiedQuery?: any;
        params?: Params;
    }) {
        return await DoctorConsultationFeeDbOperations._service
            ._find({
                query: {
                    ...dbQuery,
                    ...specifiedQuery,
                    ...params,
                },
                paginate: false,
            })
            .then((res) => {
                return res as Array<Datum>;
            });
    }

    /**
     * Get details.
     * @param id - Id of the data.
     * @param dbQuery - Db fields a related query.
     * @param specifiedQuery - Any other specified query like $sort, $limit etc.
     * @param params - Feathers params object
     */
    static async getDetails({
        id,
        dbQuery,
        specifiedQuery = {},
        params = {},
    }: {
        id: string;
        dbQuery: Query;
        specifiedQuery?: any;
        params?: Params;
    }) {
        return await DoctorConsultationFeeDbOperations._service
            ._get(id, {
                query: {
                    ...dbQuery,
                    ...specifiedQuery,
                    ...params,
                },
                paginate: false,
            })
            .then((res) => {
                return res as Datum;
            });
    }

    /**
     * create data.
     * @param dbBody - Body of the request.
     * @param dbQuery - Query related to fields.
     * @param specifiedQuery - Any other specified query like $sort, $limit etc.
     * @param params - Feathers params object
     */
    static async createDatum({
        dbBody,
        dbQuery = {},
        specifiedQuery = {},
        params = {},
    }: {
        dbBody: Body;
        dbQuery?: any;
        specifiedQuery?: any;
        params?: Params;
    }) {
        return await DoctorConsultationFeeDbOperations._service
            .create(
                {
                    ...dbBody,
                },
                {
                    ...params,
                    query: {
                        ...dbQuery,
                        ...specifiedQuery,
                    },
                    provider: 'server',
                },
            )
            .then((res) => {
                return res as Datum;
            });
    }

    /**
     * create data.
     * @param dbBody - Body of the request.
     * @param dbQuery - Query related to fields.
     * @param specifiedQuery - Any other specified query like $sort, $limit etc.
     * @param params - Feathers params object
     */
    static async createData({
        dbBody,
        dbQuery = {},
        specifiedQuery = {},
        params = {},
    }: {
        dbBody: Array<Body>;
        dbQuery?: any;
        specifiedQuery?: any;
        params?: Params;
    }) {
        return await DoctorConsultationFeeDbOperations._service
            .create(dbBody, {
                query: {
                    ...dbQuery,
                    ...specifiedQuery,
                    $limit: dbBody.length,
                },
                provider: 'server',
                ...params,
            })
            .then((res) => {
                return res as Array<Datum>;
            });
    }

    /**
     * Modify data.
     * @param id - datum id.
     * @param dbBody - Body of the request.
     * @param dbQuery - Query of the request.
     * @param specifiedQuery - Any other specified query like $sort, $limit etc.
     * @param params - Feathers params object
     */
    static async modifyDatum({
        id,
        dbBody,
        dbQuery = {},
        specifiedQuery = {},
        params = {},
    }: {
        id: string | null;
        dbBody: Body_Patch;
        dbQuery?: Query;
        specifiedQuery?: any;
        params?: Params;
    }) {
        return await DoctorConsultationFeeDbOperations._service
            .patch(
                id,
                {
                    ...dbBody,
                },
                {
                    ...params,
                    query: {
                        ...dbQuery,
                        ...specifiedQuery,
                    },
                    provider: 'server',
                },
            )
            .then((res) => {
                if (id) {
                    return res as Datum;
                } else {
                    return res as Array<Datum>;
                }
            });
    }

    /**
     * Delete data.
     * @param id - datum id.
     * @param dbQuery - Query of the request.
     * @param specifiedQuery - Any other specified query like $sort, $limit etc.
     * @param params - Feathers params object
     */
    static async deleteDatum({
        id,
        dbQuery = {},
        specifiedQuery = {},
        params = {},
    }: {
        id: string;
        dbQuery?: Query;
        specifiedQuery?: any;
        params?: Params;
    }) {
        return await DoctorConsultationFeeDbOperations._service
            .remove(id, {
                query: {
                    ...dbQuery,
                    ...specifiedQuery,
                },
                provider: 'server',
                ...params,
            })
            .then((res) => {
                return res as Datum;
            });
    }
}
