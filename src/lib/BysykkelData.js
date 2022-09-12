// Author: fergus@mcdowall.no

// This module fetches information about Oslo Bysykkel
// API documentation -> https://oslobysykkel.no/apne-data/sanntid

// Fetch JSON in the approved way (with correct headers) and bump to JSON
const fetchJSON = url =>
  fetch(url, {
    headers: {
      // as per API docs
      'Client-Identifier': 'fergiemcdowall-Oslo-bysykkel'
    }
  }).then(item => item.json())

// Fetch the relevant API endpoints
const syncData = () =>
  Promise.all(
    [
      // station name
      'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json',
      // bike and dock status
      'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json'
    ].map(fetchJSON)
  )

// Join the two API responses such that we have a single array of data
// that contains name, dock status and bike status for each
// station. Assumption: that there are always the same number of
// stations with corresponding IDs in each API response.
const joinData = ([info, status]) =>
  info.data.stations
    .map(item => ({
      ...status.data.stations.filter(
        itemStatus => itemStatus.station_id == item.station_id
      )[0],
      ...item
    }))
    // sort alphabetically on 'name'
    .sort((a, b) => a.name > b.name)

export const getBysykkelData = () => syncData().then(joinData)
