import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        // validate that name of colony is not taken
        // if (colonyRepository.existsByName(registerColonyRequest.getName())) {
        //     return ResponseEntity
        //         .badRequest()
        //         .body(new MessageResponse("Name is already taken!"));
        // }
        //
        // ColonyVM colonyVM = new ColonyVM();
        // colonyVM.setName(registerColonyRequest.getName());
        // colonyVM.setAddressLine1(registerColonyRequest.getAddressLine1());
        // colonyVM.setAddressLine2(registerColonyRequest.getAddressLine2());
        // colonyVM.setAddressLine3(registerColonyRequest.getAddressLine3());
        // colonyVM.setNearBy(registerColonyRequest.getNearBy());
        // colonyVM.setCity(registerColonyRequest.getCity());
        //
        // UserVM presidentVM = new UserVM();
        // presidentVM.setFirstName(registerColonyRequest.getFirstname());
        // presidentVM.setLastName(registerColonyRequest.getLastname());
        // presidentVM.setEmail(registerColonyRequest.getEmail());
        //
        // colonyVM.setPresident(presidentVM);
        // colonyVM.setCreatedBy(presidentVM);
        //
        // ColonyVM result = colonyService.save(colonyVM);
        // return ResponseEntity.created(new URI("/api/colonies/" + result.getId()))
        //     .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
        //     .body(result);

        const {name, address, nearBy, city, firstname, lastname, email}:
            { name: string, address: string, nearBy: string, city: string, firstname: string, lastname: string, email: string } = req.body

        console.log('POST')
        console.log('name', name)
        console.log('address', address)
        console.log('nearBy', nearBy)
        console.log('city', city)
        console.log('firstname', firstname)
        console.log('lastname', lastname)
        console.log('email', email)

        // validate that name of colony is not taken
        const colony = await prisma.colony.findFirst({
            where: {name: name},
        })
        if (colony) {
            res.status(500).json({
                field: 'name',
                message: 'Name is already taken!'
            })
        }

        // create or connect president
        let president = await prisma.user.findFirst({
            where: {email: email},
        })
        if (!president) {
            president = await prisma.user.create({
                data: {
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    role: 'USER',
                },
            })
        }
        const newColony = await prisma.colony.create({
            data: {
                name,
                address,
                nearBy,
                city,
                president: {connect: {id: president.id}},
            },
            include: {
                president: true,
                treasurer: true,
                secretary: true,
            }
        })
        return res.status(200).json({colony: newColony})
    }
}

export default handler
