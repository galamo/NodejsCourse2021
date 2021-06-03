
async function getFromServer() {
    console.log(4444)
    const result = await fetch("http://ynet.co.il")
    console.log(1234)

}
async function getFromServer2() {
    console.log(6666)
    const result = await fetch("http://google.co.il")
    console.log(8888)
}
console.log(9999)
getFromServer2()
getFromServer()
console.log(5555)

// Yonatan
9999 > 6666 > 4444 > 5555 > 8888 || 1234

