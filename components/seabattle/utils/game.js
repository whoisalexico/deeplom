import {privateComputerLocation, privateUserLocation} from "../constants/constants";

//объект для генерации кораблей
export const gameOptions = {
    shipCount: [1, 2, 3, 4], // массив из количества кораблей
    shipSize:[4, 3, 2, 1],// массив из типов кораблей 4х палубный, 3х палубный и т.д.

    generateShips(type) {
        let privateLocation // зона вокруг корабля куда нельзя поставить новый
        if(type === 'user') {
            privateLocation = privateUserLocation
        } else {
            privateLocation = privateComputerLocation
        }
        const ships = []

        // генерирует шаблон для корабля (объект)
        this.shipCount.forEach(( count, index) => {
            const size = this.shipSize[index]
            for(let i = 0; i < count; i++) {
                const ship = this.generateShipOptions(size, privateLocation)
                ships.push(ship)
            }
        })

        return ships
    },
    // метод создает объект корабля
    generateShipOptions(shipSize, privateLocation) {
        const ship = {
            hit: new Array(shipSize).fill(''),
            location: [],
        }

        const direction = Math.random() < .5 // генерируем направление корабля
        let x, y

        // в зависимости от направления корабля генерируются его координаты
        if( direction ) {
            x = Math.floor(Math.random() * 10)
            y = Math.floor(Math.random() * (10 - shipSize) )
        } else {
            x = Math.floor(Math.random() * (10 - shipSize))
            y = Math.floor(Math.random() * 10 )
        }

        // координаты добавляются в поле location корабля
        for (let i = 0; i < shipSize; i ++) {
            if( direction ) { //горизонталльное
                ship.location.push(x + '' + (y + i))
            } else { //вертикальное
                ship.location.push((x + i) + '' + y)
            }
        }

        // проверка на безопасную зону вокруг корабля
        if(this.checkPrivateLocation(ship.location, privateLocation)) {
            return this.generateShipOptions(shipSize, privateLocation)
        }
        //добавляем, защищенные от расстановки корабля, ячейки в массив для хранения
        this.addPrivateLocation(ship.location, privateLocation)

        return ship
    },
    // метод проверки на безопасную зону вокруг корабля
    checkPrivateLocation(location, privateLocation) {
        for(const coordinate of location) {
            if (privateLocation.includes(coordinate)) {
                return true
            }
        }
    },

    // метод добавления координат в масив защищенной зоны
    addPrivateLocation(location, privateLocation) {
        for(let i = 0; i < location.length; i++) {
            const startCoordinateX = location[i][0] - 1
            const startCoordinateY = location[i][1] - 1
            for(let j = startCoordinateX; j < startCoordinateX + 3; j++) {
                for(let r = startCoordinateY; r < startCoordinateY + 3; r++) {
                    if( j >= 0 && j < 10 && r >= 0 && r < 10 ) {
                        const coordinate = j + '' + r
                        if(!privateLocation.includes(coordinate)){
                            privateLocation.push(coordinate)
                        }
                    }
                }
            }
        }
    },
}