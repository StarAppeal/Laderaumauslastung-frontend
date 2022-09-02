const doGetCall = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const doCallWithBody = async (url, body, method = "POST") => {
    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
}

const doDeleteCall = async (url) => {
    const response = fetch(url, {
        method: "DELETE"
    });
    return response;
}