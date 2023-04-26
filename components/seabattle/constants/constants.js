export const field = new Array(10).fill(
    new Array(10).fill('')
)

export const game = {
    ships: [],
    shipCount: 0,
    following: 'User',
    isBlock: false,
    isLost: false,
    modal: { value: '', isModal: false}
}

export const computer = {
    ships: [],
    shipCount: 0,
    isShip: [],
    isMiss: {},
    isHit: {},
    isDead: {},
}

export const isUsedId = []

export const privateUserLocation = []
export const privateComputerLocation = []