# University API

This project contains a .NET 8 API, a React Frontend (Vite), and uses MSSQL.

## Project Structure
- `University.Api`: .NET 8 Web API
- `University.Web`: React + Vite + Tailwind CSS Frontend
- `University.Domain`: Domain models
- `University.Application`: Application logic
- `University.Persistence`: Database context

## Docker Support

You can run the entire application stack using Docker Compose.

### Prerequisites
- Docker Desktop installed and running.

### Running with Docker
1. Open a terminal in the solution root.
2. Run:
   ```bash
   docker-compose up -d --build
   ```
3. Access the application:
   - **Frontend**: http://localhost:5173
   - **API**: http://localhost:8080/swagger
   - **Database**: localhost:1433 (SA / Password123!)

### Stopping
Run `docker-compose down` to stop and remove containers.

## Manual Development

### Backend
1. Navigate to `University.Api`.
2. Run `dotnet run`.
3. API will be available at https://localhost:7000 (or http://localhost:5200).

### Frontend
1. Navigate to `University.Web`.
2. Run `npm install` (first time).
3. Run `npm run dev`.
4. App will be available at http://localhost:5173.
