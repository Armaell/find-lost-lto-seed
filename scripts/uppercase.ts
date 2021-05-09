import { LTO } from "lto-api";
import cliProgress from "cli-progress";

const lto = new LTO();
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

export function badUppercases (seed: string, target_address: string, pos = 0): string | null {
    if (pos === 0)
        progressBar.start(2 * 2 ** seed.length, 0);

    if (pos < seed.length) {
        const lowercasedSeed = seed.slice(0, pos) + seed.charAt(pos).toLowerCase() + seed.slice(pos + 1);
        const uppercaseSeed = seed.slice(0, pos) + seed.charAt(pos).toUpperCase() + seed.slice(pos + 1);

        const address1 = lto.createAccountFromExistingPhrase(lowercasedSeed).address;
        const address2 = lto.createAccountFromExistingPhrase(uppercaseSeed).address;

        progressBar.increment(2);

        if (address1 === target_address) {
            progressBar.stop();
            return lowercasedSeed;
        }
        if (address2 === target_address) {
            progressBar.stop();
            return uppercaseSeed;
        }

        const result1 = badUppercases(lowercasedSeed, target_address, pos + 1);
        if (result1) {
            progressBar.stop();
            return result1;
        }

        const result2 = badUppercases(uppercaseSeed, target_address, pos + 1);
        if (result2) {
            progressBar.stop();
            return result2;
        }
    }

    if (pos === 0)
        progressBar.stop();
    return null;
}
