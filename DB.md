# 1. Run this command                 //inside the postgres-pgadmin folder

     docker-compose up -d 



# 2. Go to LINK:  (http://localhost:8080/)

    ports:
      - "8080:80"



# 3. PgAdmin Credentials: 

    environment:
      - PGADMIN_DEFAULT_EMAIL=pgadminuser@gmail.com
      - PGADMIN_DEFAULT_PASSWORD=Database123!



# 4. Register Server

     1. SERVER NAME: "db"    

     2. HOSTNAME: "postgres-db"            //same as Service name

     3. PORT: "5432"

     4. Username: "postgres"

     5. Password: "Database123!"


# 5. "test_challenge" DB will be created automatically
