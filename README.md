[![linux build](https://api.travis-ci.org/iroy2000/react-redux-boilerplate.svg?branch=master)](https://travis-ci.org/iroy2000/react-redux-boilerplate)
[![Dependency Status][david_img]][david_site]
[![Join the chat at https://gitter.im/iroy2000-react-redux-boilerplate/Lobby](https://badges.gitter.im/iroy2000-react-redux-boilerplate/Lobby.svg)](https://gitter.im/iroy2000-react-redux-boilerplate/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### TL;DR

Before you dive into anything, see for yourself how easy you can setup a full workflow framework for your `development` and `deployment` for your real world project.

Step 1: Clone this repo
```
git clone https://github.com/CianCoders/react-redux-starter.git
cd react-redux-starter
```

Step 2: Create a virtualenv with python3 (BASE PYTHON 3.6)
- **IMPORTANT!** Before creating the virtual env, 
make sure the Python 3 version is 3.6 or higher.


```
mkvirtualenv starter --python=/usr/bin/python3
or 
mkvirtualenv starter --python=/usr/bin/python3.x
```

Step 3: Install the backend requirements

```
pip install -r requirements.txt
```

Step 4: Run the migrations

```
./manage.py migrate
```

Step 5: Start the backend

```
./manage.py runserver
```

Step 6: Start the frontend

```
cd frontend
npm i
npm start
```

And Done, as easy as 123!!

# Información sobre la aplicación
La aplicación cuenta con un vendedor inicial junto con 3 productos iniciales.
Al aplicar las migraciones, estos aparecerán en el catálogo.

Credenciales del usuario inicial:
- username: usuario
- password: 123456

## License ?!
Not really
