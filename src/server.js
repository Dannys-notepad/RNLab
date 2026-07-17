import app from './app.js'
import env from './config/env.js'

const PORT = env.PORT || 5000;

app.listen(PORT, () => console.log(`Application's up and running on port ${PORT}`));

