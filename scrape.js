const axios = require ('axios');
const cheerio = require ('cheerio');

SCPscrape = async function SCPscrape (SCP) {
    fURL = `http://www.scpwiki.com/scp-${SCP}`
    //formatted
    const response = await axios.get(fURL)
        $ = cheerio.load(response.data)
        content = $('p') // pull from content with cheerio
        fcontent = content.text() // format content

        s = fcontent.indexOf("Description")
        fcontent = fcontent.slice(`${s}`)
        // removes everything before description
        f = fcontent.indexOf(".")
        // grabs the end of the first sentence after description
        let desc = ''
        if (200 > f) { 
            f = fcontent.indexOf(".", f + 1)
            // if the first period yields less than 200 characters, slice second sentence as well.
    
            desc = fcontent.slice(0,`${f}`)
            // Guarantees more than 200 letter response.
            console.log(desc)
            return desc
        } else {
            desc = fcontent.slice(0,`${f}`)
            // if there's more than 200 letters in first sentence, uses it.
            console.log(desc)
            return desc
        }
}

// async function Test() {
//     result = await SCPscrape(556)
//     console.log("Result. Await." + result)
// }
// Test()
module.exports = SCPscrape