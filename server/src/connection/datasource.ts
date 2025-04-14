import "reflect-metadata"
import { Event, Artist, Booking, Review, Ticket, User, Venue } from "../types/types.js"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
dotenv.config()
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "events",
    entities: [Event, Booking, Ticket, User, Venue, Artist, Review],
    synchronize: true,
    logging: true,
})

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected")
    })
    .catch((error) => console.log(error))