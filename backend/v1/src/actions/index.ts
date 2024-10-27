import { Request, Response } from "express";

interface dataType {
  id: number;
  value: string;
}

// Sample data (in-memory)
let data: dataType[] = [
  { id: 1, value: "First Item" },
  { id: 2, value: "Second Item" },
];

type CustomerProps = {
  req: Request;
  res: Response;
};

export const getCustomer: any = (req: Request, res: Response) => {
  const id = parseInt(req.params?.id); // Convert id to a number
  console.log("id", id);
  if (isNaN(id)) {
    res.json(data);
  } else if (!isNaN(id) && data[id]) {
    res.json(data[id]);
  } else {
    res.status(400).json({ error: "Customer does not exist" });
  }
};

// GET request handler
// app.get("/items", (req: Request, res: Response) => {
//   res.json(data);
// });

// POST request handler
//   app.post("/items", (req: Request, res: Response) => {
//     const newItem = req.body;
//     if (newItem && newItem.value) {
//       const id = data.length ? data[data.length - 1].id + 1 : 1;
//       const itemToAdd = { id, value: newItem.value };
//       data.push(itemToAdd);
//       res.status(201).json(itemToAdd);
//     } else {
//       res.status(400).json({ error: "Invalid item" });
//     }
//   });

// PUT request handler
//   app.put("/items/:id", (req: Request, res: Response) => {
//     const { id } = req.params;
//     const updatedValue = req.body.value;

//     const item = data.find((i) => i.id === parseInt(id));

//     if (item && updatedValue) {
//       item.value = updatedValue;
//       res.json(item);
//     } else {
//       res.status(404).json({ error: "Item not found or invalid value" });
//     }
//   });
