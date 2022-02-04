process.on("message", (quantity) => {
    console.log(1);
    let numbers = [];
    for (let i = 0; i = quantity; i++) {
        let num = Math.floor(Math.random() * 1000);
        numbers = [...numbers, num]
    }
    console.log(2);
    process.send(numbers)
});