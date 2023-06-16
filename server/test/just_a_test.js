const even = (n) =>{
    //check if n is a number
    if(typeof n !== 'number') return 'n must be a number'
    //check if n is even
    if(n%2 === 0) return true
    //if n is odd
    return false

}

module.exports = {even}
