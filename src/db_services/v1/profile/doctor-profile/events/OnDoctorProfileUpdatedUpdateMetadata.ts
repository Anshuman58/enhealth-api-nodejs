// import { DoctorProfile_GET, DoctorProfile_PATCH } from '../interfaces/DoctorProfileInterfaces';
// import { HookContext } from '@feathersjs/feathers';
// import { DoctorProfileDbOperations } from '../utils/DoctorProfileDbOperations';
//
// const OnDoctorProfileUpdatedUpdateMetadata = async (result: DoctorProfile_GET, context: HookContext) => {
//     const { specialities, surgeonSpecializations, symptomSpecializations, languages } =
//         context.data as DoctorProfile_PATCH;
//
//     if (specialities || surgeonSpecializations || symptomSpecializations || languages) {
//         const specialityString = result.specialities.reduce((a, c) => a + `${c.replace(' ', '').toLowerCase()} `, '');
//         const symptomString = result.symptomSpecializations.reduce(
//             (a, c) => a + `${c.replace(' ', '').toLowerCase()} `,
//             '',
//         );
//         const surgeonString = result.surgeonSpecializations?.reduce(
//             (a, c) => a + `${c.replace(' ', '').toLowerCase()} `,
//             '',
//         );
//         const languageString = result.languages.reduce((a, c) => a + `${c.replace(' ', '').toLowerCase()} `, '');
//
//         await DoctorProfileDbOperations.modifyDatum({
//             id: result._id.toString(),
//             dbBody: {
//                 metadata: `${specialityString} ${symptomString} ${surgeonString || ''} ${languageString}`,
//             },
//         });
//     }
// };
//
// export default OnDoctorProfileUpdatedUpdateMetadata;
