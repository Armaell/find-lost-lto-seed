import { LTO } from "lto-api"
import cliProgress from "cli-progress"
import fs from "fs"

const lto = new LTO()
let progressBar: cliProgress.SingleBar

export function bip39 (seed: string, target_address: string): string | null {
    const bip39_words = fs.readFileSync('bip39.txt', 'utf8').split('\n')

    const wrong_seed_words = seed.split(' ')
    if (wrong_seed_words.length !== 15)
        console.warn(`Saved seed phrase is not of the correct length: ${wrong_seed_words.length} words given, expected 15`)

    const incorrect_words_index: number[] = []
    wrong_seed_words.forEach((word, index) => {
        if (!bip39_words.includes(word))
            incorrect_words_index.push(index)
    })

    if (wrong_seed_words.length !== 0) {
        promptErrors(wrong_seed_words, incorrect_words_index)
        return tryFix (wrong_seed_words, incorrect_words_index, target_address, bip39_words)
    }
    return null
}

function promptErrors (wrong_seed_words: string[], incorrect_words_index: number[]) {
    let line = wrong_seed_words.map((word, index) => {
        if (incorrect_words_index.includes(index))
            return `\x1b[31m\x1b[4m~${word}~\x1b[0m`
        else
            return word
    }).join(' ')

    console.log("Incorrect words:")
    console.log(line)
}

function tryFix (wrong_seed_words: string[], incorrect_words_index: number[], target_address: string, bip39_words: string[]): string | null {
    let update_progress_bar = false
    if (progressBar === undefined) {
        progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
        progressBar.start(bip39_words.length, 0)
        update_progress_bar = true
    }

    for (const word of bip39_words) {
        let modified_seed = [...wrong_seed_words]
        modified_seed[incorrect_words_index[0]] = word

        const address = lto.createAccountFromExistingPhrase(modified_seed.join(' ')).address;
        if (address === target_address) {
            progressBar.stop();
            return modified_seed.join(' ');
        } else {
            let modified_incorrect_words_index = [...incorrect_words_index]
            modified_incorrect_words_index.shift()
            if (modified_incorrect_words_index.length > 0) {
                const result = tryFix(modified_seed, modified_incorrect_words_index, target_address, bip39_words)
                if (result)
                    return result
            }
        }

        if (update_progress_bar)
            progressBar.increment()
    }
    return null
}
