import { Application } from '../../declarations';

import authenticate from './authenticate/authenticate.service';
import userManagement from './user-management/user-management.service';
import upload from './upload/upload.service';
import logout from './logout/logout.service';
import updateUserProfile from './update-user-profile/update-user-profile.service';
import updateAdminProfile from './update-admin-profile/update-admin-profile.service';
import resetPassword from './reset-password/reset-password.service';
import agoraTokenService from './generate-agora-token/generate-agora-token.service';
import vendorProfileManagement from './profile/vendor-profile-management/vendor-profile-management.service';
import doctorProfileManagement from './profile/doctor-profile-management/doctor-profile-management.service';

// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(authenticate);
    app.configure(userManagement);
    app.configure(upload);
    app.configure(logout);
    app.configure(updateUserProfile);
    app.configure(updateAdminProfile);
    app.configure(resetPassword);
    app.configure(agoraTokenService);
    app.configure(vendorProfileManagement);
    app.configure(doctorProfileManagement);
}
