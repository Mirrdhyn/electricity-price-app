// src/api.ts
export const fetchPriceData = async (biddingZone: string) => {
    const response = await fetch(`https://api.energy-charts.info/price?bzn=${biddingZone}`, { headers: { 'Accept': 'application/json' } });
    //console.log(await response.text())
    // if (!response.ok) {
    //     throw new Error(`Échec de la requête : ${response.status} ${response.statusText}`);
    // }
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text(); // Récupérer le texte pour diagnostic
        throw new Error(`La réponse n’est pas au format JSON : ${text}`);
    }

    const data = await response.json();
    return data;
};
