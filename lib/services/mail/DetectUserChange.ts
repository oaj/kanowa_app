import {Colony, User} from "@prisma/client";
import {ColonyRole} from "@/lib/services/mail/ColonyRole";
import {MailNotificationList} from "@/lib/services/mail/MailNotificationList";


class RoleChangeListener {
    role(user: User): void {}
    endRole(user: User): void {}
    register(user: User): void {}
}
export class DetectUserChange {

private detectChange(orgUser: User, user: User, roleChangeListener: RoleChangeListener) {
    let role: User | null = null
    let register: User | null = null
    let endRole: User | null = null

    // Check to see if user exists.
    if (user && !user.username) {
        register = user;
    }
    if (orgUser) {
        if (!user || user.id !== orgUser.id) {
            endRole = orgUser;
            if (user && user.id !== orgUser.id) {
                if (!register) {
                    role = user;
                }
            }
        }
    } else {
        if (user) {
            if (!register) {
                role = user;
            }
        }
    }
    if (role && roleChangeListener) roleChangeListener.role(role);
    if (register && roleChangeListener) roleChangeListener.register(register);
    if (endRole && roleChangeListener) roleChangeListener.endRole(endRole);
}

notifyColonyRoleChanges(colony: Colony, oldUser: User, newUser: User, role: ColonyRole): MailNotificationList {
    const mailNotificationList = new MailNotificationList();

    detectChange(oldUser, newUser, new RoleChangeListener() {
    @Override
        void role(User user) {
            if (!colony.isRoleNotificationsSuspended()) {
                mailNotificationList.addColonyRoleChangeNotification(colony, user, RoleChangeType.ROLE_BEGIN, role);
            }
        }
    @Override
        void endRole(User user) {
            if (!colony.isRoleNotificationsSuspended()) {
                mailNotificationList.addColonyRoleChangeNotification(colony, user, RoleChangeType.ROLE_END, role);
            }
        }
    @Override
        void register(User user) {
            if (!colony.isRoleNotificationsSuspended()) {
                mailNotificationList.addColonyRoleChangeNotification(colony, user, RoleChangeType.ROLE_REGISTER, role);
            }
        }
    });
    return mailNotificationList;
}

public MailNotificationList notifyResidenceRoleChanges(Colony colony, Residence residence, User oldUser, User newUser, ResidenceRole role) {
    MailNotificationList mailNotificationList = new MailNotificationList();
    detectChange(oldUser, newUser, new RoleChangeListener() {
    @Override
        void role(User user) {
            log.debug("begin - colony.isRoleNotificationsSuspended() = {}", colony.isRoleNotificationsSuspended());
            if (!colony.isRoleNotificationsSuspended()) {
                mailNotificationList.addResidenceRoleChangeNotification(colony, residence, user, RoleChangeType.ROLE_BEGIN, role);
            }
        }
    @Override
        void endRole(User user) {
            log.debug("end - colony.isRoleNotificationsSuspended() = {}", colony.isRoleNotificationsSuspended());
            if (!colony.isRoleNotificationsSuspended()) {
                mailNotificationList.addResidenceRoleChangeNotification(colony, residence, user, RoleChangeType.ROLE_END, role);
            }
        }
    @Override
        void register(User user) {
            log.debug("register - colony.isRoleNotificationsSuspended() = {}", colony.isRoleNotificationsSuspended());
            if (!colony.isRoleNotificationsSuspended()) {
                mailNotificationList.addResidenceRoleChangeNotification(colony, residence, user, RoleChangeType.ROLE_REGISTER, role);
            }
        }
    });
    return mailNotificationList;
}

}
