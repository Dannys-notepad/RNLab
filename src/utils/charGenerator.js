// USER ID GENERATOR
// Generates a unique alphanumeric identifier with the `RNLabs_` prefix.
export const userId = async () => {
    const alphaCharacters = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let code = 'RNLabs_';
    for(let i = 0; i < 20; i++){
        code += alphaCharacters.charAt(Math.random() * alphaCharacters.length);
    }
    return code;
}
