/* Fonctions */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FORMATTAGE DU TEXTE

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Fonction formattant le texte
function formater(texte){
  //FORMATAGE DU TEXTE
  //On remplace les caractères spéciaux
  var accent = [
      /[\300-\306]/g, /[\340-\346]/g, // A, a
      /[\310-\313]/g, /[\350-\353]/g, // E, e
      /[\314-\317]/g, /[\354-\357]/g, // I, i
      /[\322-\330]/g, /[\362-\370]/g, // O, o
      /[\331-\334]/g, /[\371-\374]/g, // U, u
      /[\321]/g, /[\361]/g, // N, n
      /[\307]/g, /[\347]/g, // C, c
  ];
  var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
   
  for(var i = 0; i < accent.length; i++){
      texte = texte.replace(accent[i], noaccent[i]);
  }
   
  let chars = ['\'', '!', '?', ','];
  for(var i=0; i<chars.length; i++)
  {
      texte = texte.replaceAll(chars[i], ' ');
  }
  texte = texte.replaceAll('.', '\n');

  return texte;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// STYLE CLASSIQUE

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Fonction de conversion "classique"
function convertirClassique(texte){
  texte = texte.toLowerCase();

  //On formatte le texte
  texte = formater(texte);

  //CONVERTION
  var resultat = "";
  //On parcourt le texte
  for(var i=0; i<texte.length; i++)
  {
      if(texte[i] != " " && texte[i] != '\n')
      {
          resultat = resultat+":regional_indicator_"+texte[i]+": ";
      }
      else if(texte[i] == " ")
      {
          resultat = resultat+":blank:";
      }
      else if(texte[i] == '\n')
      {
          resultat = resultat+'\n';
      }
  }
  return resultat;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// STYLE ELECTRIQUE

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Fonction de conversion "electrique"
function convertirElectrique(texte){
  texte = texte.toLowerCase();

  //On formatte le texte
  texte = formater(texte);

  //CONVERTION
  var resultat = "";
  //On parcourt le texte
  for(var i=0; i<texte.length; i++)
  {
      if(texte[i] != " " && texte[i] != '\n')
      {
          resultat = resultat+":CH_Alphabet"+texte[i].toUpperCase()+":";
      }
      else if(texte[i] == " ")
      {
          resultat = resultat+":blank:";
      }
      else if(texte[i] == '\n')
      {
          resultat = resultat+'\n';
      }
  }
  return resultat;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// STYLE ELECTRIQUE (VERSION 2)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Fonction de conversion "electrique" version 2
function convertirElectrique2(texte){
  texte = texte.toLowerCase();

  //On formatte le texte
  texte = formater(texte);

  //CONVERTION
  var resultat = "";
  //On parcourt le texte
  for(var i=0; i<texte.length; i++)
  {
      if(texte[i] != " " && texte[i] != '\n')
      {
          resultat = resultat+":"+texte[i]+texte[i]+":";
      }
      else if(texte[i] == " ")
      {
          resultat = resultat+":blank:";
      }
      else if(texte[i] == '\n')
      {
          resultat = resultat+'\n';
      }
  }
  return resultat;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// STYLE STAR WARS

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Fonction de conversion "Star Wars"
function convertirStarWars(texte){
  texte = texte.toLowerCase();

  //On formatte le texte
  texte = formater(texte);
  
  //CONVERTION
  var resultat = "";
  const lettres = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  //On parcourt le texte
  for(var i=0; i<texte.length; i++)
  {
      if(texte[i] != " " && texte[i] != "\n")
      {
          index = lettres.length - lettres.indexOf(texte[i]);
          if(index < 10)
          {
              index = "0"+index;
          }
          resultat = resultat+":"+index+"_"+texte[i]+":";
      }
      else if(texte[i] == " ")
      {
          resultat = resultat+":blank:";
      }
      else if(texte[i] == '\n')
      {
          resultat = resultat+'\n';
      }
  }
  return resultat;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// STYLE BONBON

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Fonction de conversion "bonbon"
function convertirBonbon(texte){
  texte = texte.toLowerCase();

  //On formatte le texte
  texte = formater(texte);

  //CONVERTION
  var resultat = "";
  //On parcourt le texte
  for(var i=0; i<texte.length; i++)
  {
      if(texte[i] != " " && texte[i] != '\n')
      {
          resultat = resultat+":R_mal_"+texte[i].toUpperCase()+texte[i].toUpperCase()+":";
      }
      else if(texte[i] == " ")
      {
          resultat = resultat+":blank:";
      }
      else if(texte[i] == '\n')
      {
          resultat = resultat+'\n';
      }
  }
  return resultat;
}



/* Import des différent fichiers */
const Discord = require('discord.js');
const client = new Discord.Client({intents: [
  Discord.Intents.FLAGS.GUILDS,
  Discord.Intents.FLAGS.GUILD_MESSAGES,
  Discord.Intents.FLAGS.DIRECT_MESSAGES
]});
const token = 'OTU4MzAwODEzNjIzNzE3OTQ4.YkLVLg.8qE7gEezTQ1ynhjhx6ydWKGyH84'

client.once('ready', () => {
   console.log('Félicitations, votre bot Discord a été correctement initialisé !');
});

client.login(token);

const prefix = "!";


client.on("messageCreate", message => {
    // Si le bot est l'auteur du message
    if(message.author.bot)
    {
        // On interromp la fonction
        return
    }

    // Si on a tenté d'entrer une commande
    if(message.content.startsWith(prefix))
    {
        var texte = message.content.substring(1,message.content.length);
    
        // On regarde par quoi commence le message

        // Conversion Classique
        if(texte.startsWith("em "))
        {
            // On récupère le message à convertir
            texte = texte.substring(3);
            // On convertit le message
            resultat = convertirClassique(texte);
            // On répond au message
            message.reply(resultat);
            return;
        }

        // Conversion Star Wars
        if(texte.startsWith("sw "))
        {
            texte = texte.substring(3);
            resultat = convertirStarWars(texte);
            message.reply(resultat);
            return;
        }

        // Conversion Electrique V1
        if(texte.startsWith("el1 "))
        {
            texte = texte.substring(4);
            resultat = convertirElectrique(texte);
            message.reply(resultat);
            return;
        }

        // Conversion Electrique V2
        if(texte.startsWith("el2 "))
        {
            texte = texte.substring(4);
            resultat = convertirElectrique2(texte);
            message.reply(resultat);
            return;
        }

        // Conversion Bonbon
        if(texte.startsWith("bb "))
        {
            texte = texte.substring(3);
            resultat = convertirBonbon(texte);
            message.reply(resultat);
            return;
        }


        // Message d'aide
        if(texte === "help")
        {
            message.reply('***____Commandes de K-9____***\n\n!em => Conversion emote Classique\n!sw => Conversion emote Star Wars\n!el1 => Conversion emote ElectriqueV1\n!el2 => Conversion emote Electrique V2\n!bb => Conversion emote Bonbon');
            return;
        }

        // Si la commande est invalide
        else{
            message.reply('Bip boup commande invalide !');
            return;
        }

    }
    
})