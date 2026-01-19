# Orbit CMS

**Orbit CMS** is a web-based code editor that has all file system functionallity you expect. 

## Overview

Orbit CMS is a self-hosted, web-based code editor designed for developers who want direct access to a remote filesystem through a browser.

It runs entirely on your own infrastructure and is intended to be deployed via Docker, Proxmox, or a bare server.

## Features 

- Web-based code editor with tree-based folder navigation

- Full filestystem functionallity, create / rename / delete files & folders

- Upload and download files

- FTP push back to the remote server

- Multi-user support

- Self-hosted by design

## Showcase

![dashboard](https://github.com/cactusniek/Orbit/blob/main/assets/dashboard.png "Dashboard page")
![login](https://github.com/cactusniek/Orbit/blob/main/assets/login.png "Login page")
![selecting](https://github.com/cactusniek/Orbit/blob/main/assets/selecting.png "Selecting folder view")

[Figma design](https://www.figma.com/design/Gd2qxspnrKTQLjloc0GOSF/Niek-CMS?node-id=2-1712&t=xS2UVMMV6y8GXald-1)

## Setup

1. **Clone and install**
```bash
git clone <github.com/cactusniek/orbit> orbit-cms && cd orbit-cms
```

2. **Create your .env file**
```
# website
websiteName = your_website_url

# server
serverPort = 8000

# mail server (setup using mailhog docker image)
mailHost = 0.0.0.0
mailPort = 55002
# mailEmail = for_production
# mailPassword = for_production

# database (sequalize will setup all tables)
host = your_database_ip
databasePort = your_database_port
database = your_database_name
user = your_database_username
password = your_database_password

# token
privateKey = your_jwt_privatekey

# separate file server (not implemmented yet)
```

3. **Run the application**
```cd server```

```npm install```

```npm run dev```

**&**

```cd client```

```npm install```

```npm run dev```

## Setting up a user: 

Open: http://localhost:<port>/register and create a user.
Open: http://localhost:<port>/login and login.
You’ll be redirected to: http://localhost:<port>/edit/dashboard and you are ready to start editing!
