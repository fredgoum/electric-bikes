const jsonboxId = 'azertyuiopqsdfghjklm';
const apiUrl = `https://jsonbox.io/${jsonboxId}`;

/**
 * Get bikes data from jsonbox.io API
 */
async function getBikes() {
  let apiData = [];
  try {
    const res = await fetch(apiUrl);
    if (! res.ok) throw new Error(res.status);
    const data = await res.json();
    if (data.length) apiData = data;
  } catch (error) {
    console.log(error);
  }
  const result = await apiData;
  return result;
}

window.apiSrv = {
  getBikes,
};

export default window.apiSrv;
