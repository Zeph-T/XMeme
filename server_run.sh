cd backend

# Setup DB or any other environment variables you want to setup.
export DB_LOCAL=mongodb://localhost:27017/crioDB
export DB_PRODUCTION=mongodb+srv://admin-zeph:Hinatashoyo@crio.rlygl.mongodb.net/crioDB?retryWrites=true&w=majority
export NODE_ENV=development

npm start 