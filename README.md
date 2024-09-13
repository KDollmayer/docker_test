# Message Service Project

This is a small messaging service project built with Node.js, Express, and TypeScript. It uses Docker, Prisma, and Postgres for database management.

## Prerequisites
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Development Setup with docker

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/message-service.git
   cd message-service
   ```

2. **Start the development environment:** \
   Run the following command to bring up the services defined in the development Docker Compose file:
   ```bash
   docker-compose up

   ```
3. **Migrate the database:** \
   After the Docker containers are up, run the following command to apply Prisma migrations to the database:
   ```bash
   npm run docker:db:migrate

   ```
4. **Seed the database:** \
   Populate the database with sample data by running:
   ```bash
   npm run docker:db:seed

   ```
5. **Rebuild the backend:** \
   Rebuild the backend container after migrating or installing new packages:
   ```bash
   npm run rebuild:be

   ```
## Additional Scripts

- `npm run docker:db:migrate` – Run database migrations.
- `npm run docker:seed:dev` – Seed the development database with initial data.
- `npm run rebuild:be` – Rebuild the backend Docker container.

---
## Nginx Setup

This project uses Nginx as a reverse proxy/load balancer.

### Development with docker

Nginx is used in the development environment to proxy traffic between services. Ensure that Nginx is properly configured within the `docker-compose.dev.yml` file.

---

Feel free to contribute or raise issues if you encounter any problems. Happy coding!

2. **Set up environment variables:**
   ```bash
   DATABASE_URL="postgres://postgres@localhost:5432/message_service_dev?schema=public"

   ```