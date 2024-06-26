import { Application } from '../../declarations';
import user from './user/user.service';
import otp from './otp/otp.service';
import userSession from './user-session/user-session.service';
import consultationChat from './consultation-chat/consultation-chat.service';
import productCategory from './master-data/product-category/product-category.service';
import consultationBooking from './consultation-booking/consultation-booking.service';
import vendorProfile from './profile/vendor-profile/vendor-profile.service';

// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(user);
    app.configure(otp);
    app.configure(userSession);
    app.configure(consultationChat);
    app.configure(productCategory);
    app.configure(consultationBooking);
    app.configure(vendorProfile);
}
