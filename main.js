const Discord = require('discord.js');
const bot = new Discord.Client();

var version = '3.0.1';

bot.on('ready', () => {
    console.log('It´s a owl! No it´s a Snickers! It´s CommunityBot!')
    bot.user.setActivity('?help', { type: 'PLAYING'}).catch(console.error)
    let statuses = [
        `?help | Community`,
        `?help`,
        `?help | Community`,
        `?help`

    ]

    setInterval(function(){
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: 'PLAYING'}).catch(console.error);
    }, 3000)
})

bot.on('message', message => {
    let parts = message.content.split(" ");
    
        if (parts[0] == '?help') {
            message.channel.send('**Commands**:\nuse ?userinfo for your info\n\n**AdminCommands**:\nuse ?clear 2-100 to clear messages\nuse ?ban @username to ban a user\nuse ?kick @username to kick a user')

        }
        else if (parts[0] == '?clear') {
            message.delete();
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('❌ You have no Permission to do that! (MANAGE_MESSAGES)')
            if(!parts[1]) return message.channel.send('Please enter a number from **2 to 100**!')
            message.channel.bulkDelete(parts[1])
        }
        else if (parts[0] == '?userinfo') {
            let userr = message.mentions.users.first() || message.author;
        
                let userinfo = {}
        
                userinfo.name = userr.username;
                userinfo.discrim = userr.discriminator;
                userinfo.id = userr.id;
                userinfo.status = userr.presence.status;
                userinfo.bot = userr.bot;
                userinfo.create = userr.createdAt;
        
                const userembed = new Discord.MessageEmbed()
                .setAuthor(userr.tag)
                .setColor("#98c9c3")
                .addField("Nutzername:", userinfo.name, true)
                .addField("#ID:", userinfo.discrim, true)
                .addField("User ID:", userinfo.id, false)
                .addField("Status:", userinfo.status, true)
                .addField("Bot:", userinfo.bot, true)
        
                return message.channel.send(userembed)
                
        }
        else if (parts[0] == '?say') {
            if (!parts[1]) return message.channel.send('❌ Please enter the text!')
            var text = message.content.split(" ").slice(1).join(" ");
            message.delete();
            message.channel.send(text)
        }
        else if (parts[0] == '?sayemb') {
            if(!parts[1]) return message.channel.send('❌ Please enter the text!')
            var text = message.content.split(" ").slice(1).join(" ");
            message.delete();

            const sayembed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField(message.member.displayName + ' says:', text, true)
            .setFooter('This message was from ' + message.author.username + '#' + message.author.discriminator + ' !')

            message.channel.send(sayembed)
        }
        else if (parts[0] == '?kick') {

            if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('❌ You have no permission to do that! (KICK_MEMBERS)')

            let kicked = message.mentions.members.first();
            if (!kicked) return message.channel.send('❌ This user doesn´t exist on this server!')

            message.guild.member(kicked).kick();

            const kickemb = new Discord.MessageEmbed()
            .setColor('RED')
            .addField(`The user`, `${message.mentions.members.first()} was succesfully kicked!`)
            .addField('')
            .setFooter(`This user got kicked by ${message.author.username}#${message.author.discriminator}!`)

            message.channel.send(kickemb)
        }
        else if (parts[0] == '?ban') {

            if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('❌ You have no permission to do that! (BAN_MEMBERS)')

            let banned = message.mentions.members.first();
            if (!banned) return message.channel.send('❌ This user doesn´t exist on this server!')

            message.guild.member(banned).ban();

            const banemb = new Discord.MessageEmbed()
            .setColor('RED')
            .addField(`The User`, `${message.mentions.members.first()} was succesfully banned!`)
            .setFooter(`The user got banned by ${message.author.username}#${message.author.discriminator}!`)

            message.channel.send(banemb)
        }
})


bot.login(process.env.token)