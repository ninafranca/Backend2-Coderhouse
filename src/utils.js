import {fileURLToPath} from 'url';
import {dirname} from 'path';
import faker from 'faker';

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export function makeId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const generate = (n) => {
    let products = [];
    for(let i = 0; i < n; i++) {
      products.push({
        id: i+1,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.lorem.sentence(),
        thumbnail: faker.image.image(),
        stock: faker.datatype.number()
      })
    }
    return products;
}

export default __dirname;