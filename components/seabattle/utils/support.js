export const generateModifyShipArray = (ship, shipIndex, partOfShip, ships) => {
  const hit = [...ship.hit]
  hit[partOfShip] = true
  const newShip = { ...ship, hit}
  const newShips = [...ships]
  newShips[shipIndex] = newShip

  return {newShips, newShip, hit}
}

export const findNeedShip = (ships, id) => {
  const ship = ships.find( ship => ship.location.includes(id)) // find need elem from array
  const shipIndex = ships.findIndex( ship => ship.location.includes(id)) // find need index for elem from array

  return {
    ship,
    shipIndex
  }
}