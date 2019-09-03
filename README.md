# Chat App - IIC2173

Ignacio Acosta ~ iaacosta@uc.cl

## Stack

La aplicación se desarrollo con las siguientes herramientas:

| Servicio   | Lenguaje   | Framework | Source code      |
| ---------- | ---------- | --------- | ---------------- |
| API        | Python     | flask     | `~/api`          |
| Storage    | SQL        | sqlite3   | `~/api/database` |
| Frontend   | Javascript | React.js  | `~/client`       |
| Web server | nginx      | -         | `~/nginx.conf`   |

El deploy se realizó con Docker.

## Nginx

Se aplicó un proxy inverso de todas las requests `~/api` a el servidor de flask, mientras que cualquier otra URL se redirige a `index.html`, que está servido directamente por nginx.

La configuración se aplicó directamente sobre el archivo `nginx.conf`.
