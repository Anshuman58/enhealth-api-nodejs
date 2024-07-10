import { doctorProfilePath } from '../../../../../service_endpoints/services';
import { DoctorProfile_GET, DoctorProfile_PATCH } from '../interfaces/DoctorProfileInterfaces';
import { HookContext } from '@feathersjs/feathers';

const OnDoctorProfileUpdatedUpdateMetadata = async (result: DoctorProfile_GET, context: HookContext) => {
    const { app } = context;
    const { specialities, surgeonSpecializations, symptomSpecializations, languages } =
        context.data as DoctorProfile_PATCH;

    if (specialities || surgeonSpecializations || symptomSpecializations || languages) {
        const specialityString = result.specialities.reduce((a, c) => a + `${c.replace(' ', '').toLowerCase()} `, '');
        const symptomString = result.symptomSpecializations.reduce(
            (a, c) => a + `${c.replace(' ', '').toLowerCase()} `,
            '',
        );
        const surgeonString = result.surgeonSpecializations?.reduce(
            (a, c) => a + `${c.replace(' ', '').toLowerCase()} `,
            '',
        );
        const languageString = result.languages.reduce((a, c) => a + `${c.replace(' ', '').toLowerCase()} `, '');

        await app.service(doctorProfilePath)._patch(result._id.toString(), {
            metadata: `${specialityString} ${symptomString} ${surgeonString || ''} ${languageString}`,
        });
    }
};

export default OnDoctorProfileUpdatedUpdateMetadata;
