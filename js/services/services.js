const postData = async (url, data) => {

    const res = await fetch (url, {
        method:'POST',
        body: data,
        headers:{
            'Content-type': 'application/json'
        },
    });
    
    return await res.json ();
};

//создаем фун-ию для GET запроса (ур. 59)
async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok){
        throw new Error (`Could not fetch ${url}, ${res.status}`);
    }
    
    return await res.json ();
}

export {postData};
export {getResource};

