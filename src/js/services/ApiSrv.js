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
/**
 * Create a bike with POST method
 * @param {Object} bike new bike to create
 */
function addBike(bike) {
  const options = {
    method: 'POST',
    body: JSON.stringify(bike),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    fetch(apiUrl, options)
      .then(res => res.json());
  } catch (error) {
    console.log(error);
  }
}

window.apiSrv = {
  getBikes,
  addBike
};

export default window.apiSrv;
