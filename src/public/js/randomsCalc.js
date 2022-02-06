process.on("message", (quantity) => {
    let numbers = [];
    for (let i = 0; i = quantity; i++) {
        let num = Math.floor(Math.random() * 1000);
        numbers = [...numbers, num]
    }
    process.send(numbers)
});