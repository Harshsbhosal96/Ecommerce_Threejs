interface productDataType {
    brand: string,
    name: string,
    price: number,
    id: number,
    description: string
}

const productsData: productDataType[] = [
    {
        brand: 'boAt',
        name: 'Airdopes 141',
        price: 1499,
        id: 1,
        description: 'Powerful bass with long battery backup, perfect for daily music and calls.'
    },
    {
        brand: 'Noise',
        name: 'Buds VS104',
        price: 1299,
        id: 2,
        description: 'Lightweight earbuds with clear sound and comfortable fit for long usage.'
    },
    {
        brand: 'Realme',
        name: 'Buds Air 5',
        price: 2999,
        id: 3,
        description: 'Active noise cancellation with premium sound quality and fast pairing.'
    },
    {
        brand: 'Oraimo',
        name: 'Pro Buds FE',
        price: 2799,
        id: 4,
        description: 'Deep bass drivers with smooth connectivity and stylish design.'
    },
    {
        brand: 'OnePlus',
        name: 'Nord Buds 2',
        price: 5999,
        id: 5,
        description: 'Balanced sound with seamless integration for oneplus devices.'
    }
]

export default productsData;