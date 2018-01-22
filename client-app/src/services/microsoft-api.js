import { keys } from './keys';

export const emojify = imageUrl => {
  return fetch(
    'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Ocp-Apim-Subscription-Key': keys.microsoft_emotions.API_KEY
      },
      body: `{"url": "${imageUrl}"}`
    }
  ).then(resp => resp.json());
};
