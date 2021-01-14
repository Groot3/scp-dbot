//Groot
//1/6/2021

const keys = require('./config.json')
const discord = require('discord.js')
const client = new discord.Client()
const SCPscrape = require('./scrape.js')

const cmds = ["!scp"]

client.once('ready', () => {
    console.log("Ready.")
})

try {
    client.on('message', msg => {

        // numeric function from StackOverflow to verify input
        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
    
        generateRandom = function(toNum) {
            generateRandom = Math.floor(Math.random() * toNum) + 1;
            return generateRandom
        };

        RandomSCP = generateRandom(4999)
        if (msg.author.bot == true) {
            return
        }
    
        for (cmd of cmds) {
            if (msg.content.includes(cmd) && msg.content != (cmd)) {
                ReqSCP = msg.content
                ReqSCP = ReqSCP.replace(`${cmd}`, "").replace(" ","")
                // formats spaces and the given command out of string

                function formatSCP(ReqSCP) {
                    if (ReqSCP < 5000) {
                        if (ReqSCP < 100 && ReqSCP > 10) {
                            ReqSCP = "0"+ReqSCP
                            return ReqSCP  
                        } else if (ReqSCP < 10) {
                            ReqSCP = "00"+ReqSCP
                            return ReqSCP
                        } else {
                            return ReqSCP
                        }
                    } else {
                        msg.channel.send(`Error. Try a number below 5000.`)
                    }
                }
                FReqSCP = formatSCP(ReqSCP)
                const description = async () => {
                    result = await SCPscrape (`${FReqSCP}`)
                    return result
                }
    
                if (isNumeric(FReqSCP) == true) {
                    async function msgSend(FReqSCP) {
                                let dsc = await description()
                                msg.channel.send(`http://www.scpwiki.com/scp-${FReqSCP}` + "\n" + dsc +".")    
                    }
                    msgSend(FReqSCP)
                }
            }
            
        }
    
            if (msg.content === (cmd)) { // if no condition is given:
                const description = async () => {
                    result = await SCPscrape (`${RandomSCP}`)
                    return result
                }
                async function msgSend(RandomSCP) {
                    let dsc = await description()
                        //console.log("Done waiting")
                        msg.channel.send(`http://www.scpwiki.com/scp-${RandomSCP}` + "\n" + dsc +".")
                }
                msgSend(RandomSCP)
            }
        }
    )}catch (error) {
    console.error(error)
}
//Makes sure bot doesnt die on one error
//client.login(`${keys.BOT_TOKEN}`)
const botToken = process.env.BOT_TOKEN
client.login(botToken)