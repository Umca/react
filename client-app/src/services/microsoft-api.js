export const emojify = (imageUrl) => {
    return fetch('https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Ocp-Apim-Subscription-Key': 'b6da9087acbe4d348879679ffc5d04f5'
        },
        body: `{"url": "${imageUrl}"}`
    }).then(resp => resp.json());
}