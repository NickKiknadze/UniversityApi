# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj files and restore dependencies
COPY ["University.Api/University.Api.csproj", "University.Api/"]
COPY ["University.Application/University.Application.csproj", "University.Application/"]
COPY ["University.Domain/University.Domain.csproj", "University.Domain/"]
COPY ["University.Persistence/University.Persistence.csproj", "University.Persistence/"]

RUN dotnet restore "University.Api/University.Api.csproj"

# Copy the rest of the source code
COPY . .

# Build and Publish
WORKDIR "/src/University.Api"
RUN dotnet build "University.Api.csproj" -c Release -o /app/build
RUN dotnet publish "University.Api.csproj" -c Release -o /app/publish

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "University.Api.dll"]
