// import { Params, ServiceAddons } from '@feathersjs/feathers';
// import {
//     DoctorProfile_QUERY as Query,
//     DoctorProfile_PATCH as Body_Patch,
//     DoctorProfile_POST as Body,
//     DoctorProfile_GET as Datum,
//     DoctorProfile_FIND as Data,
// } from '../interfaces/DoctorProfileInterfaces';
// import { Document, Model } from 'mongoose';
// import { DoctorProfile } from '../doctor-profile.class';
//
// export class DoctorProfileDbOperations {
//     private static _service: DoctorProfile & ServiceAddons<any>;
//     static _model: Model<Document<any>>;
//     static _servicePath = 'v1/profile/doctor-profile';
//
//     /**
//      * Initialize service
//      * @param service - Service value.
//      */
//     static initializeService(service: DoctorProfile & ServiceAddons<any>) {
//         DoctorProfileDbOperations._service = service;
//         DoctorProfileDbOperations._model = service.Model;
//     }
//
//     /**
//      * Get data.
//      * @param dbQuery - Db fields related query.
//      * @param specifiedQuery - Any other specified query like $sort, $limit etc.
//      * @param params - Feathers params object from context.
//      */
//     static async getDataWithPagination({
//         dbQuery,
//         specifiedQuery = {},
//         params = {},
//     }: {
//         dbQuery: Query;
//         specifiedQuery?: any;
//         params?: Params;
//     }) {
//         return await DoctorProfileDbOperations._service
//             ._find({
//                 query: {
//                     ...dbQuery,
//                     ...specifiedQuery,
//                     ...params,
//                 },
//             })
//             .then((res) => {
//                 return res as Data;
//             });
//     }
//
//     /**
//      * Get data.
//      * @param dbQuery - Db fields related query.
//      * @param specifiedQuery - Any other specified query like $sort, $limit etc.
//      * @param params - Feathers params object
//      */
//     static async getDataWithoutPagination({
//         dbQuery,
//         specifiedQuery = {},
//         params = {},
//     }: {
//         dbQuery: Query;
//         specifiedQuery?: any;
//         params?: Params;
//     }) {
//         return await DoctorProfileDbOperations._service
//             ._find({
//                 query: {
//                     ...dbQuery,
//                     ...specifiedQuery,
//                     ...params,
//                 },
//                 paginate: false,
//             })
//             .then((res) => {
//                 return res as Array<Datum>;
//             });
//     }
//
//     /**
//      * Get details.
//      * @param id - Id of the data.
//      * @param dbQuery - Db fields a related query.
//      * @param specifiedQuery - Any other specified query like $sort, $limit etc.
//      * @param params - Feathers params object
//      */
//     static async getDetails({
//         id,
//         dbQuery,
//         specifiedQuery = {},
//         params = {},
//     }: {
//         id: string;
//         dbQuery: Query;
//         specifiedQuery?: any;
//         params?: Params;
//     }) {
//         return await DoctorProfileDbOperations._service
//             ._get(id, {
//                 query: {
//                     ...dbQuery,
//                     ...specifiedQuery,
//                     ...params,
//                 },
//                 paginate: false,
//             })
//             .then((res) => {
//                 return res as Datum;
//             });
//     }
//
//     /**
//      * create data.
//      * @param dbBody - Body of the request.
//      * @param dbQuery - Query related to fields.
//      * @param specifiedQuery - Any other specified query like $sort, $limit etc.
//      * @param params - Feathers params object
//      */
//     static async createDatum({
//         dbBody,
//         dbQuery = {},
//         specifiedQuery = {},
//         params = {},
//     }: {
//         dbBody: Body;
//         dbQuery?: any;
//         specifiedQuery?: any;
//         params?: Params;
//     }) {
//         return await DoctorProfileDbOperations._service
//             .create(
//                 {
//                     ...dbBody,
//                 },
//                 {
//                     query: {
//                         ...dbQuery,
//                         ...specifiedQuery,
//                     },
//                     provider: 'server',
//                     ...params,
//                 },
//             )
//             .then((res) => {
//                 return res as Datum;
//             });
//     }
//
//     /**
//      * create data.
//      * @param dbBody - Body of the request.
//      * @param dbQuery - Query related to fields.
//      * @param specifiedQuery - Any other specified query like $sort, $limit etc.
//      * @param params - Feathers params object
//      */
//     static async createData({
//         dbBody,
//         dbQuery = {},
//         specifiedQuery = {},
//         params = {},
//     }: {
//         dbBody: Array<Body>;
//         dbQuery?: any;
//         specifiedQuery?: any;
//         params?: Params;
//     }) {
//         return await DoctorProfileDbOperations._service
//             .create(dbBody, {
//                 query: {
//                     ...dbQuery,
//                     ...specifiedQuery,
//                     $limit: dbBody.length,
//                 },
//                 provider: 'server',
//                 ...params,
//             })
//             .then((res) => {
//                 return res as Array<Datum>;
//             });
//     }
//
//     /**
//      * Modify data.
//      * @param id - datum id.
//      * @param dbBody - Body of the request.
//      * @param dbQuery - Query of the request.
//      * @param specifiedQuery - Any other specified query like $sort, $limit etc.
//      * @param params - Feathers params object
//      */
//     static async modifyDatum({
//         id,
//         dbBody,
//         dbQuery = {},
//         specifiedQuery = {},
//         params = {},
//     }: {
//         id: string | null;
//         dbBody: Body_Patch;
//         dbQuery?: Query;
//         specifiedQuery?: any;
//         params?: Params;
//     }) {
//         return await DoctorProfileDbOperations._service
//             .patch(
//                 id,
//                 {
//                     ...dbBody,
//                 },
//                 {
//                     ...params,
//                     query: {
//                         ...dbQuery,
//                         ...specifiedQuery,
//                     },
//                     provider: 'server',
//                 },
//             )
//             .then((res) => {
//                 if (id) {
//                     return res as Datum;
//                 } else {
//                     return res as Array<Datum>;
//                 }
//             });
//     }
//
//     /**
//      * Delete data.
//      * @param id - datum id.
//      * @param dbQuery - Query of the request.
//      * @param specifiedQuery - Any other specified query like $sort, $limit etc.
//      * @param params - Feathers params object
//      */
//     static async deleteDatum({
//         id,
//         dbQuery = {},
//         specifiedQuery = {},
//         params = {},
//     }: {
//         id: string;
//         dbQuery?: Query;
//         specifiedQuery?: any;
//         params?: Params;
//     }) {
//         return await DoctorProfileDbOperations._service
//             .remove(id, {
//                 query: {
//                     ...dbQuery,
//                     ...specifiedQuery,
//                 },
//                 provider: 'server',
//                 ...params,
//             })
//             .then((res) => {
//                 return res as Datum;
//             });
//     }
// }
