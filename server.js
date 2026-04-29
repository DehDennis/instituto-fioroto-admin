import express from "express";
import multer from "multer";
import cors from "cors";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET || "chave-super-secreta";

// Usuários fixos
const USERS = [
  { username: process.env.ADMIN_USER, password: process.env.ADMIN_PASS },
  { username: process.env.GABRIEL_USER, password: process.env.GABRIEL_PASS },
];

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ error: "Credenciais inválidas" });
});

// Middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "Token ausente" });

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Token inválido" });
  }
}

// Upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage, limits: { files: 10 } });

// Upload
app.post(
  "/upload",
  authMiddleware,
  upload.array("images", 10),
  (req, res) => {
    const filePaths = req.files.map(
      (file) => `/uploads/${file.filename}`
    );

    res.json({ message: "Upload realizado com sucesso", files: filePaths });
  }
);

// Listar imagens
app.get("/images", (req, res) => {
  fs.readdir("uploads/", (err, files) => {
    if (err)
      return res.status(500).json({ error: "Erro ao listar imagens" });

    const urls = files.map((f) => `/uploads/${f}`);
    res.json(urls);
  });
});

app.delete("/images/:filename", authMiddleware, (req, res) => {
  const filename = req.params.filename;

  const filePath = path.join(process.cwd(), "uploads", filename);


 
  if (!fs.existsSync(filePath)) {
    console.error("Arquivo NÃO existe");
    return res.status(404).json({ error: "Arquivo não encontrado" });
  }

  fs.unlinkSync(filePath);

  console.log("Arquivo deletado com sucesso");

  res.json({ message: "Imagem excluída com sucesso" });
});


app.use("/uploads", express.static(path.resolve("uploads")));

app.listen(4000, () =>
  console.log("Servidor rodando na porta 4000")
);