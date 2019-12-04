# Chat App - IIC2173

Ignacio Acosta ~ iaacosta@uc.cl

## Stack

La aplicación se desarrollo con las siguientes herramientas:

| Servicio   | Lenguaje   | Framework | Source code      |
| ---------- | ---------- | --------- | ---------------- |
| API        | Python     | flask     | `~/api`          |
| Storage    | SQL        | sqlite3   | `~/api/database` |
| Frontend   | Typescript | React.js  | `~/client`       |
| Web server | nginx      | -         | `~/nginx.conf`   |

## Instrucciones

### Local
- Instalar `yarn@^1.13.0`, `node@^10.0.0` y `python@^3.7`
- Instalar `pipenv` en `python`
- En el directorio de la `api/`, correr los siguientes comandos para instalar
  ```sh
  pipenv shell
  pipenv install
  ```
  Y posteriormente correr `pipenv run seed` para hacer la base de datos inicial.
- En el directorio del `client/`, correr el siguiente comando:
  ```sh
  yarn
  ```
- Correr ambos servicios en paralelo con `pipenv run dev` en `api/` y `yarn start` en `client/`
  
### Docker
- Correr contenedores con `docker-compose up`

## Nginx

Se aplicó un proxy inverso de todas las requests `~/api` a el servidor de flask, mientras que `~/` envía el archivo `index.html`, que está servido directamente por nginx desde directorio local `/var/www/`.

Para el certificado SSL y el redireccionamiento, no se aplicó Certbot, sino que una configuración específica [(cortesía del crack EngineerMan)](https://youtu.be/IZmz39gGxCM?t=2864), donde se abren dos servidores:

- **:80** - Redirecciona todo a https://ignacioacostaj.com con status code 301.
- **:443** - Tiene configurado el reverse proxy y el root directory con el index.
