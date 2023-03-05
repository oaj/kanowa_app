import {IUser} from "@/types/user.type";
import prisma from "@/lib/prisma";
import {IResidenceSelect} from "@/lib/prisma/residences";
import {residenceTagsConnectDisconnect} from "@/lib/services/residenceTagService";
import {IResidenceTag} from "@/types/residence.tag.type";
import {userConnect, userConnectOrCreate} from "@/lib/services/userService";

export async function saveResidence(id: number | null,
                                    colonyId: number,
                                    doorNumber: string,
                                    residenceTags: IResidenceTag[],
                                    owner: IUser,
                                    tenant?: IUser | null,
                                    responsible?: IUser | null) {

    const creating = id == null;

    // Confirm that there is a colony
    const colony = await prisma.colony.findFirst({
        where: {id: colonyId},
    })
    if (!colony) {
        throw {field: 'colony', message: 'No colony found.'}
    }
    // validate that doorNumber is not taken
    const doorCheckResidence = await prisma.residence.findFirst({
        where: {
            colonyId: colonyId,
            id: {not: Number(id)},
            doorNumber: doorNumber,
        },
    })
    if (doorCheckResidence) {
        throw {field: 'doorNumber', message: (doorNumber + ' is already taken.')}
    }
    // They cant be null. If they are null choose owner
    tenant = tenant || owner
    responsible = responsible || owner

    // former
    let formerOwner: IUser | null = null
    let formerTenant: IUser | null = null
    let formerResponsible: IUser | null = null

    let formerResidence = null
    // residence is loaded to get the former contacts
    if (!creating) { // id != null
        formerResidence = await prisma.residence.findFirst({
            where: {id: id},
            include: {
                owner: true,
                tenant: true,
                responsible: true,
                formerOwner: true,
                formerTenant: true,
                formerResponsible: true,
                residenceTags: true,
            }
        })
        // old state is saved
        if (!formerResidence) {
            throw {field: 'id', message: 'Residence not found.'}
        }
        // Old state is saved
        const orgSaved = colony.roleNotificationsSuspended && formerResidence.savedDuringRoleNotificationsSuspended;
        formerOwner = orgSaved ? formerResidence.formerOwner as IUser | null : formerResidence.owner as IUser | null;
        formerTenant = orgSaved ? formerResidence.formerTenant as IUser | null : formerResidence.tenant as IUser | null;
        formerResponsible = orgSaved ? formerResidence.formerResponsible as IUser | null : formerResidence.responsible as IUser | null;
    }

    const savedDuringRoleNotificationsSuspended = colony.roleNotificationsSuspended

    // let balanceAccountNumber = residence.balanceAccountNumber
    // if (creating) {
    //     // make an account number for the balance
    //     balanceAccountNumber = getMaxBalanceAccountNumber(colony.id) + 1;
    // }

    // Now query for save residence
    const query: any = {}
    query.data = {
        doorNumber: doorNumber,
        colony: {connect: {id: Number(colonyId)}},
        savedDuringRoleNotificationsSuspended: savedDuringRoleNotificationsSuspended,
    }
    query.data.owner = owner.id ? {connect: userConnect(owner)} : {connectOrCreate: userConnectOrCreate(owner)}
    query.data.tenant = tenant.id ? {connect: userConnect(tenant)} : {connectOrCreate: userConnectOrCreate(tenant)}
    query.data.responsible = responsible.id ? {connect: userConnect(responsible)} : {connectOrCreate: userConnectOrCreate(responsible)}
    if (formerOwner) query.data.formerOwner = {connect: userConnect(formerOwner)}
    if (formerTenant) query.data.formerTenant = {connect: userConnect(formerTenant)}
    if (formerResponsible) query.data.formerResponsible = {connect: userConnect(formerResponsible)}
    const residenceTagsQuery = residenceTagsConnectDisconnect(residenceTags, formerResidence?.residenceTags)
    if (residenceTagsQuery != null) query.data.residenceTags = residenceTagsQuery
    query.select = IResidenceSelect
    console.log('save residence query', query)

    let savedResidence = null
    try {
        if (creating) {
            savedResidence = await prisma.residence.create(query)
        } else {
            query.where = {id: Number(id)}
            savedResidence = await prisma.residence.update(query)
        }
    } catch (error: any) {
        console.log(error.message)
        throw {message: error.message}
    }

    return savedResidence
}

// residence = residenceRepository.save(residence);
// log.debug("residence saved {}", residence);
//
// // detect role changes if not notifications are suspended
// NotificationList notificationList = null;
// log.debug("---------------------  colony.isRoleNotificationsSuspended() = {}", colony.isRoleNotificationsSuspended());
// // detect role changes
// if (!colony.isRoleNotificationsSuspended()) {
//     DetectContactChange detectContactChange = new DetectContactChange(contactRepository);
//     notificationList = detectContactChange.notifyResidenceRoleChanges(colony, residence, formerOwner, residence.getOwner(), ResidenceRole.OWNER);
//     notificationList.mergeList(detectContactChange.notifyResidenceRoleChanges(colony, residence, formerTenant, residence.getTenant(), ResidenceRole.TENANT));
//     notificationList.mergeList(detectContactChange.notifyResidenceRoleChanges(colony, residence, formerResponsible, residence.getResponsible(), ResidenceRole.RESPONSIBLE));
// }
//
// if (notificationList != null) {
//     notificationList.logMails();
//     // send mail
//     notificationList.sendMails(mailService);
// }
//
// return residenceMapper.fromEntity(residence);
