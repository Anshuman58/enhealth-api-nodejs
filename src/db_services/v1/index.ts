import { Application } from '../../declarations';
import user from './user/user.service';
import otp from './otp/otp.service';
import userSession from './user-session/user-session.service';
import consultationChat from './consultation/consultation-chat/consultation-chat.service';
import productCategory from './master-data/product-category/product-category.service';
import consultationBooking from './consultation/consultation-booking/consultation-booking.service';
import vendorProfile from './profile/vendor-profile/vendor-profile.service';
import doctorProfile from './profile/doctor-profile/doctor-profile.service';
import doctorConsultationFee from './consultation/doctor-consultation-fee/doctor-consultation-fee.service';
import symptom from './master-data/symptom/symptom.service';
import surgeon from './master-data/surgeon/surgeon.service';
import speciality from './master-data/speciality/speciality.service';
import language from './master-data/language/language.service';

// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(user);
    app.configure(otp);
    app.configure(userSession);
    app.configure(consultationChat);
    app.configure(productCategory);
    app.configure(consultationBooking);
    app.configure(vendorProfile);
    app.configure(doctorProfile);
    app.configure(doctorConsultationFee);
    app.configure(symptom);
    app.configure(surgeon);
    app.configure(speciality);
    app.configure(language);
}
