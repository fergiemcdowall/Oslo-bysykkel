// API documentation -> https://oslobysykkel.no/apne-data/sanntid

const fetchJSON = url =>
  fetch(url, {
    headers: {
      'Client-Identifier': 'fergiemcdowall-Oslo-bysykkel'
    }
  }).then(item => item.json())

const syncData = () =>
  Promise.all(
    [
      'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json',
      'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json'
    ].map(fetchJSON)
  )

const joinData = ([info, status]) =>
  info.data.stations
    .map(item => ({
      ...status.data.stations.filter(
        itemStatus => itemStatus.station_id == item.station_id
      )[0],
      ...item
    }))
    .sort((a, b) => a.name > b.name)

export const getBysykkelData = () => syncData().then(joinData)
