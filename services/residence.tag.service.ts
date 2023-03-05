const API_URL = "http://localhost:3000/api/tag/";

export const saveResidenceTag = async (
    id: number | null,
    colonyId: number,
    name: string,
) => {
    console.log('saveResidenceTag before fetch')

    return await fetch(API_URL, {
        method: id ? 'PUT' : 'POST',
        headers: {
            'Content-type': 'Application/json',
        },
        body: JSON.stringify({
            id: id,
            colonyId: colonyId,
            name: name,
        })
    }).then(response => {
        return response.json();
    }).catch(reason => {
        return reason.message
    });
};


