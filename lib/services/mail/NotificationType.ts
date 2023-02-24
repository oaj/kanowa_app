import { ColonyRole } from "./ColonyRole";
import { RoleChangeType } from "./RoleChangeType";
import {ResidenceRole} from "@/lib/services/mail/ResidenceRole";

export enum NotificationType {

    COLONY_CREATION_REGISTER,
    COLONY_CREATION,
    PRESIDENT_ROLE,
    TREASURER_ROLE,
    SECRETARY_ROLE,
    END_PRESIDENT_ROLE,
    END_TREASURER_ROLE,
    END_SECRETARY_ROLE,
    REGISTER_AND_PRESIDENT_ROLE,
    REGISTER_AND_TREASURER_ROLE,
    REGISTER_AND_SECRETARY_ROLE,
    OWNER_ROLE,
    END_OWNER_ROLE,
    REGISTER_AND_OWNER_ROLE,
    TENANT_ROLE,
    END_TENANT_ROLE,
    REGISTER_AND_TENANT_ROLE,
    RESPONSIBLE_ROLE,
    END_RESPONSIBLE_ROLE,
    REGISTER_AND_RESPONSIBLE_ROLE
}

export function byChangeAndColonyRole(type: RoleChangeType, role: ColonyRole): NotificationType  {

    if (type === RoleChangeType.ROLE_BEGIN) {
        if (role === ColonyRole.PRESIDENT) return NotificationType.PRESIDENT_ROLE;
        else if (role === ColonyRole.TREASURER) return NotificationType.TREASURER_ROLE;
        else if (role === ColonyRole.SECRETARY) return NotificationType.SECRETARY_ROLE;
    } else if (type === RoleChangeType.ROLE_END) {
        if (role === ColonyRole.PRESIDENT) return NotificationType.END_PRESIDENT_ROLE;
        else if (role === ColonyRole.TREASURER) return NotificationType.END_TREASURER_ROLE;
        else if (role === ColonyRole.SECRETARY) return NotificationType.END_SECRETARY_ROLE;
    } else if (type === RoleChangeType.ROLE_REGISTER) {
        if (role === ColonyRole.PRESIDENT) return NotificationType.REGISTER_AND_PRESIDENT_ROLE;
        else if (role === ColonyRole.TREASURER) return NotificationType.REGISTER_AND_TREASURER_ROLE;
        else if (role === ColonyRole.SECRETARY) return NotificationType.REGISTER_AND_SECRETARY_ROLE;
    }
    throw new Error("RoleChangeType {} and ColonyRole {} don't combine to a NotificationType");
}

export function byChangeAndResidenceRole(type: RoleChangeType, role: ResidenceRole): NotificationType {
    if (type === RoleChangeType.ROLE_BEGIN) {
        if (role === ResidenceRole.OWNER) return NotificationType.OWNER_ROLE;
        else if (role === ResidenceRole.TENANT) return NotificationType.TENANT_ROLE;
        else if (role === ResidenceRole.RESPONSIBLE) return NotificationType.RESPONSIBLE_ROLE;
    } else if (type === RoleChangeType.ROLE_END) {
        if (role === ResidenceRole.OWNER) return NotificationType.END_OWNER_ROLE;
        else if (role === ResidenceRole.TENANT) return NotificationType.END_TENANT_ROLE;
        else if (role === ResidenceRole.RESPONSIBLE) return NotificationType.END_RESPONSIBLE_ROLE;
    } else if (type === RoleChangeType.ROLE_REGISTER) {
        if (role === ResidenceRole.OWNER) return NotificationType.REGISTER_AND_OWNER_ROLE;
        else if (role === ResidenceRole.TENANT) return NotificationType.REGISTER_AND_TENANT_ROLE;
        else if (role === ResidenceRole.RESPONSIBLE) return NotificationType.REGISTER_AND_RESPONSIBLE_ROLE;
    }
    throw new Error("RoleChangeType {} and ColonyRole {} don't combine to a NotificationType");
}
