import app from './app.js'
import { server } from './config/env.js'

const PORT = server.PORT || 5000;

app.listen(PORT, () => console.log(`Application's up and running on port ${PORT}`));

