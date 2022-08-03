import faker from 'faker';

faker.locale = "es";

export const productosFalsos = (cantidad? : Number) => {
    let arrayDeProds = [];
    if (cantidad) {
        for(let i = 0; i < cantidad ; i++ ) {
            arrayDeProds.push({
                name : faker.commerce.productName(),
                price : faker.commerce.price(),
                description : faker.commerce.productDescription(),
                thumbnail : faker.image.imageUrl(),
                stock : faker.datatype.number(),
                timestamp : faker.date.recent()
            })
        } 
    }

    for(let i = 0; i < 10 ; i++ ) {
        arrayDeProds.push({
            name : faker.commerce.productName(),
            price : faker.commerce.price(),
            description : faker.commerce.productDescription(),
            thumbnail : faker.image.imageUrl(),
            stock : faker.datatype.number(),
            timestamp : faker.date.recent()
        })
    } 

    return arrayDeProds
}