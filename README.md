# Find wrong LTO seed

Made by Armaell\
Telegram: @armaelll\
Website: [Kahion node](https://node.kahion.com/lto)

-----

If you import your seed in the [LTO wallet](https://wallet.lto.network) but end up in an empty wallet which is not yours, here's the steps to take:

## Steps to follow before:

### Triple check what you typed

Of course you could have made a mistake when typing it. If you generated a bip39 compliant seed (meaning you generated one given you by default instead of writing a custom one), then you can check you with the [bip39 word list](bip39.txt) for typos in the words, or simply incorrect words.

### Disable Tidy seed

A correct LTO seed is made of a serie of words in lowercase separated by single spaces.

There is now the "tidy seed" option enforcing those rules. If you have used a badly formatted seed in the past, disabling the "tidy seed" may bring you the correct address

### Until now, you used the incorrect address

Or it could be that until you made a typo the last time you imported, and you used it without knowing. This tool will allow to find which typo you made last time.

## How to use this tool

### Necessary informations

You need:
- the seed phrase you think should be correct
- the public address containing your locked funds

#### How to find your public address if you did not write it down

Try to remember how much you leased last time, when you leased, and to which node.

Go to [ltonod.es](https://www.ltonod.es/) and find the node you leased to. On their detail page, open the "All leases" tab, and try to find your lease with the previous informations, this should give back you address

### Download the tool

Install [Node.JS](https://nodejs.org/en/)

At the top of this page, open the "Code" droplist and then "Download ZIP".

### Prepare the tool

Unzip the archive file.

Open a console in the folder containing the unzipped tool. (On windows, type "cmd" in the file explorer search bar while being in the correct folder)

type `npm install`

### How to use

In the previous console, type `npm start` end ENTER

You will enter your seed phrase, then your public address

Then you will be prompted to choose different kinds of scripts searching for different kind of typo

## Available scripts

### Bip39
If you used a bip39 seed, this will check if your seed phrase is correctly formatted. If an incorrect word is spotted, it will try replacements until the correct one is found.

If more than one incorrect word is found, it will be probably faster to compare those words with the [bip39 word list](bip39.txt) by hand

### Typo
This will try to find X typos in the seed by replacing X amount of characters with all combinations possible.

When selecting this script, you will be prompted how many typo to search for. one is really quick, two is really slow, three if for the lost cases.

### Spacing
This will not change the content of your seed, but only test if you did not made a spacing mistake like a double-space, used a break-line or forgot a space altogether. Or any combinations.

### Uppercases

Smartphones have a tendency to add uppercases. This script will check if you did not used uppercases in the seed but without any typo in the content


## Conclusion

If the script found your seed it will be prompted in the console and will be written in the file seed.out.\
While importing it in the wallet, don't forget to uncheck "Tidy seed".

Don't hesitate to tip me at @armaelll on telegram, or to my personal wallet 3JsyXbXF31rViu9UVT2gdGGdMs3VzCSeCKg with a little message.

In hoping to brighten a dark day.
