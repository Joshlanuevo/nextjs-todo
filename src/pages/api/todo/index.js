import Todo from "../../../../backend/models/todo";
import connectDB from "../../../../backend/services/db";

connectDB();

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case "GET":
        try {
          const todo = await Todo.find({});
          res.status(200).json({success: true, data:todo });
        } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, error });
        }
        break;
       
       case "POST": 
        try {
            const { text } = req.body;

            if (!text) throw "Invalid Data";
            const todo = await Todo.create({ text });

            res.status(201).json({success: true, data: todo});
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error });
        }
        break;
    }
}