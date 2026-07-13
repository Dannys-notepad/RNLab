export const testRoute = async (req, res) => {
    try {
        res.json({msg: 'RNLabs is running'});
    } catch (e) {
        console.error(e)
    }
}