import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corseOption = {
    origin:'http//localhost:5173',
    credentials:true,

}
app.use(cors(corseOption))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    
})