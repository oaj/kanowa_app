import {User, Colony, Residence} from "@prisma/client";
import {byChangeAndColonyRole, byChangeAndResidenceRole, NotificationType} from "@/lib/services/mail/NotificationType";
import {RoleChangeType} from "@/lib/services/mail/RoleChangeType";
import {ResidenceRole} from "@/lib/services/mail/ResidenceRole";
import {ColonyRole} from "@/lib/services/mail/ColonyRole";
import {MailService} from "@/lib/services/MailService";

class Notification {
    contact: User
    notificationType: NotificationType
    colony: Colony | null
    residence: Residence | null

    constructor(contact: User, notificationType: NotificationType, colony: Colony | null, residence: Residence | null) {
        this.contact = contact;
        this.notificationType = notificationType;
        this.colony = colony;
        this.residence = residence;
    }
}

export class MailNotificationList {
    private notifications: Notification[] = []

    addColonyCreation(colony: Colony, contact: User): void {
        if (!contact.username) {
            this.notifications.push(new Notification(contact, NotificationType.COLONY_CREATION_REGISTER, colony, null));
        } else {
            this.notifications.push(new Notification(contact, NotificationType.COLONY_CREATION, colony, null));
        }
    }

    addColonyRoleChangeNotification(colony: Colony, contact: User, roleChangeType: RoleChangeType, colonyRole: ColonyRole): void {
        this.notifications.push(new Notification(contact, byChangeAndColonyRole(roleChangeType, colonyRole), colony, null));
    }

    public addResidenceRoleChangeNotification(colony: Colony, residence: Residence, contact: User, roleChangeType: RoleChangeType, residenceRole: ResidenceRole): void {
        this.notifications.push(new Notification(contact, byChangeAndResidenceRole(roleChangeType, residenceRole), colony, residence));
    }

    public sendMails(mailService: MailService): void {
        this.notifications.filter(notification => notification.contact.email).forEach(notification => sendMail(notification, mailService));
    }

    public sendMail(notification: Notification, mailService: MailService): void {
        switch (notification.notificationType) {
            case NotificationType.COLONY_CREATION_REGISTER:
                mailService.sendColonyCreationEmail(notification.colony, notification.contact, true);
                break;
            case NotificationType.COLONY_CREATION:
                mailService.sendColonyCreationEmail(notification.colony, notification.contact, false);
                break;
            case NotificationType.PRESIDENT_ROLE:
                mailService.sendColonyRoleEmail(notification.colony, notification.contact, ColonyRole.PRESIDENT, false);
                break;
            case NotificationType.TREASURER_ROLE:
                mailService.sendColonyRoleEmail(notification.colony, notification.contact, ColonyRole.TREASURER, false);
                break;
            case NotificationType.SECRETARY_ROLE:
                mailService.sendColonyRoleEmail(notification.colony, notification.contact, ColonyRole.SECRETARY, false);
                break;
            case NotificationType.END_PRESIDENT_ROLE:
                mailService.sendEndColonyRoleEmail(notification.colony, notification.contact, ColonyRole.PRESIDENT);
                break;
            case NotificationType.END_TREASURER_ROLE:
                mailService.sendEndColonyRoleEmail(notification.colony, notification.contact, ColonyRole.TREASURER);
                break;
            case NotificationType.END_SECRETARY_ROLE:
                mailService.sendEndColonyRoleEmail(notification.colony, notification.contact, ColonyRole.SECRETARY);
                break;
            case NotificationType.REGISTER_AND_PRESIDENT_ROLE:
                mailService.sendColonyRoleEmail(notification.colony, notification.contact, ColonyRole.PRESIDENT, true);
                break;
            case NotificationType.REGISTER_AND_TREASURER_ROLE:
                mailService.sendColonyRoleEmail(notification.colony, notification.contact, ColonyRole.TREASURER, true);
                break;
            case NotificationType.REGISTER_AND_SECRETARY_ROLE:
                mailService.sendColonyRoleEmail(notification.colony, notification.contact, ColonyRole.SECRETARY, true);
                break;
            case NotificationType.OWNER_ROLE:
                mailService.sendResidenceRoleEmail(notification.colony, notification.residence, notification.contact, ResidenceRole.OWNER, false);
                break;
            case NotificationType.END_OWNER_ROLE:
                mailService.sendEndResidenceRoleEmail(notification.colony, notification.residence, notification.contact, ResidenceRole.OWNER);
                break;
            case NotificationType.REGISTER_AND_OWNER_ROLE:
                mailService.sendResidenceRoleEmail(notification.colony, notification.residence, notification.contact, ResidenceRole.OWNER, true);
                break;
            case NotificationType.TENANT_ROLE:
                mailService.sendResidenceRoleEmail(notification.colony, notification.residence, notification.contact, ResidenceRole.TENANT, false);
                break;
            case NotificationType.END_TENANT_ROLE:
                mailService.sendEndResidenceRoleEmail(notification.colony, notification.residence, notification.contact, ResidenceRole.TENANT);
                break;
            case NotificationType.REGISTER_AND_TENANT_ROLE:
                mailService.sendResidenceRoleEmail(notification.colony, notification.residence, notification.contact, ResidenceRole.TENANT, true);
                break;
            case NotificationType.RESPONSIBLE_ROLE:
                mailService.sendResidenceRoleEmail(notification.colony, notification.residence, notification.contact, ResidenceRole.RESPONSIBLE, false);
                break;
            case NotificationType.END_RESPONSIBLE_ROLE:
                mailService.sendEndResidenceRoleEmail(notification.colony, notification.residence, notification.contact, ResidenceRole.RESPONSIBLE);
                break;
            case NotificationType.REGISTER_AND_RESPONSIBLE_ROLE:
                mailService.sendResidenceRoleEmail(notification.colony, notification.residence, notification.contact, ResidenceRole.RESPONSIBLE, true);
                break;
        }
    }

    logMails(): void {
        console.log(">>>>>>>>>>>>>>>> NotificationList >>>>>>>>>>>>>>>>>>")
        this.notifications.forEach(notification => {
            console.log(notification.contact.email + ": " + notification.notificationType)
        });
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    }

    mergeList(mailNotificationList: MailNotificationList) {
        this.notifications.push(...mailNotificationList.notifications);
    }
}
