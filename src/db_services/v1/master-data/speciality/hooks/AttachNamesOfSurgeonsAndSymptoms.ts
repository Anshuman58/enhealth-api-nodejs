import { HookContext } from '@feathersjs/feathers';
import { Speciality_POST } from '../interfaces/SpecialityInterfaces';

const AttachNamesOfSurgeonsAndSymptoms = () => async (context: HookContext) => {
    const { data } = context;

    if (Array.isArray(data)) {
        const specialityData = data as Array<Speciality_POST>;

        specialityData.forEach((e) => {
            const { surgeonIdsData, symptomIdsData } = e;

            if (surgeonIdsData && surgeonIdsData?.length) {
                e.surgeonNames = surgeonIdsData.map((s) => s.name);
            }

            if (symptomIdsData && symptomIdsData.length) {
                e.symptomNames = symptomIdsData.map((s) => s.name);
            }
        });

        context.data = specialityData;
    } else {
        const specialityData = data as Speciality_POST;

        const { surgeonIdsData, symptomIdsData } = specialityData;

        if (surgeonIdsData && surgeonIdsData?.length) {
            specialityData.surgeonNames = surgeonIdsData.map((e) => e.name);
        }

        if (symptomIdsData && symptomIdsData.length) {
            specialityData.symptomNames = symptomIdsData.map((e) => e.name);
        }

        context.data = specialityData;
    }

    return context;
};

export default AttachNamesOfSurgeonsAndSymptoms;
