const jsonboxId = 'azertyuiopqsdfghjklm';
const apiUrl = `https://jsonbox.io/${jsonboxId}`;

/**
 * Get bikes data from jsonbox.io API
 */
async function getBikes() {
  let data = [];
  try {
    const res = await fetch(apiUrl);
    if (! res.ok) throw new Error(res.status);
    data = await res.json();
  } catch (error) {
    console.log(error);
  }
  return data;
}

/**
 * Create a bike with POST method
 * @param {Object} bike new bike to create
 */
async function addBike(bike) {
  const options = {
    method: 'POST',
    body: JSON.stringify(bike),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await fetch(apiUrl, options);
    if (! res.ok) throw new Error(res.status);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Delete a bike with DELETE method
 * @param {Integer} bikeId Id of bike to delete
 */
async function deleteBike(bikeId) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await fetch(`${apiUrl}/${bikeId}`, options);
    if (! res.ok) throw new Error(res.status);
  } catch (error) {
    console.log(error);
  }
}

window.apiSrv = {
  getBikes,
  addBike,
  deleteBike
};

export default window.apiSrv;
