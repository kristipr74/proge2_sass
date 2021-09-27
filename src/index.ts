import express, { Request, Response, Application, response } from "express";
const app: Application = express();
app.use(express.json());

const port = 3000;

const responseCodes = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  notFound: 404,
};

const db = {
  users: [
    {
      id: 1,
      userName: "kk",
      password: "abc1111",
      firstName: "Kalle",
      lastName: "Kuningas",
    },
    {
      id: 2,
      userName: "mm",
      password: "abc2222",
      firstName: "Malle",
      lastName: "Maasikas",
    },
  ],
};

app.get("/users", (req: Request, res: Response) => {
  res.status(responseCodes.ok).json({
    users: db.users,
  });
});

app.post("/users", (req: Request, res: Response) => {
  const { userName, password, firstName, lastName } = req.body;
  const id = db.users.length + 1;
  db.users.push({
    id,
    userName,
    password,
    firstName,
    lastName,
  });
  res.status(responseCodes.created).json({
    id,
  });
});

app.get("/users/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const user = db.users.find((element) => element.id === id); //võta 1 element ja kontrolli kas selline on massiivis olemas
  res.status(responseCodes.ok).json({
    user,
  });
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: "Sellist kasutajat ei ole",
    });
  }
  const index = db.users.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      message: `Sellise id-ga kasutajat ei leitud: ${id}`,
    });
  }
  db.users.splice(index, 1);
  return res.status(responseCodes.noContent).json({});
});

app.patch("/users/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { firstName, lastName } = req.body;
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: "Sellist kasutajat ei ole",
    });
  }
  if (!firstName && !lastName) {
    return res.status(responseCodes.badRequest).json({
      error: "Muudatusi ei ole",
    });
  }
  const index = db.users.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      error: `Sellise id-ga kasutajat ei leitud: ${id}`,
    });
  }
  if (firstName) {
    db.users[index].firstName = firstName;
  }
  if (lastName) {
    db.users[index].lastName = lastName;
  }
  return res.status(responseCodes.noContent).json({});
});

app.get("/game", (req: Request, res: Response) => {
  res.status(responseCodes.ok).json({
    message: "Paarikas",
  });
});

app.get("/result", (req: Request, res: Response) => {
  res.status(responseCodes.ok).json({
    message: "Tulemused",
  });
});

app.listen(port, () => {
  console.log("Server is running");
});
