const apiUrl = `https://jsonbox.io/${process.env.VUE_APP_JSONBOX_ID}`;

/**
 * Get bikes data from jsonbox.io API
 */
async function getBikes() {
  let response = [];
  try {
    const res = await fetch(apiUrl);
    if (! res.ok) throw new Error(res.status);
    response = await res.json();
  } catch (error) {
    console.log(error);
  }
  return response;
}

/**
 * Create a bike with POST method
 * @param {Object} bike new bike to create
 */
async function addBike(bike) {
  const url = apiUrl;
  const options = {
    method: 'POST',
    body: JSON.stringify(bike),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await sendRequest(url, options);
  return response;
}

/**
 * Update a bike with PUT method
 * @param {Object} bike bike to update
 */
async function updateBike(bike) {
  const url = `${apiUrl}/${bike._id}`;
  const options = {
    method: 'PUT',
    body: JSON.stringify(bike),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await sendRequest(url, options);
  return response;
}

/**
 * Delete a bike with DELETE method
 * @param {Integer} bikeId Id of bike to delete
 */
async function deleteBike(bikeId) {
  const url = `${apiUrl}/${bikeId}`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await sendRequest(url, options);
  return response;
}

 /**
  * Send request to api
  * @param {String} url is the url to send
  * @param {Object} options is the method options
  */
async function sendRequest(url, options) {
  let response = null
  try {
    const res = await fetch(url, options);
    if (! res.ok) throw new Error(res.status);
    response = res;
  } catch (error) {
    console.log(error);
  }
  return response;
}

window.apiSrv = {
  getBikes,
  addBike,
  updateBike,
  deleteBike
};

export default window.apiSrv;
