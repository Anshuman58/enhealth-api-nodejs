import { Application } from "../declarations";
import v1 from "./v1";

import dbServicesV1MasterDataProductSubCategory from "./../db_services/v1/master-data/product-sub-category/product-sub-category.service";

import dbServicesV1ProductDetails from "./../db_services/v1/product-details/product-details.service";

import v1DoctorProfile from "../db_services/v1/profile/doctor-profile/doctor-profile.service";

// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(v1);
    app.configure(dbServicesV1MasterDataProductSubCategory);
    app.configure(dbServicesV1ProductDetails);
    app.configure(v1DoctorProfile);
}
