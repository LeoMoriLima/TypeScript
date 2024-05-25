type Product = {
    id: number;
    status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
}

function printOrder (order: Product[]) {
    
    order.forEach((product, index) =>{
        setTimeout(() => {
            console.log("The product ID is : " + product.id + " and " + "the product status is: " + product.status)
        }, index * 3000);
    })
}

const orders: Product[] = [
    {id: 1, status: "pending"},
    {id: 2, status: "confirmed"},
    {id: 3, status: "preparing"},
    {id: 4, status: "ready"},
    {id: 5, status: "delivered"}
]

printOrder(orders);