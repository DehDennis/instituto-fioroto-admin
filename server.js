import express from "express";
import multer from "multer";
import cors from "cors";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const app = express();

const PORT = process.env.PORT || 4000;
const SECRET = process.env.JWT_SECRET || "chave-super-secreta";

const UPLOAD_DIR = path.resolve("uploads");
const DIST_DIR = path.resolve("dist");

// Garante que a pasta uploads exista
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());

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

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });

  return res.json({ token });
});

// Middleware de autenticação
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token ausente" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(403).json({ error: "Token inválido" });
  }
}

// Configuração do upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { files: 10 },
});

// Upload de imagens
app.post("/upload", authMiddleware, upload.array("images", 10), (req, res) => {
  const filePaths = req.files.map((file) => `/uploads/${file.filename}`);

  return res.json({
    message: "Upload realizado com sucesso",
    files: filePaths,
  });
});

// Listar imagens
app.get("/images", (req, res) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao listar imagens" });
    }

    const urls = files.map((file) => `/uploads/${file}`);

    return res.json(urls);
  });
});

// Deletar imagem
app.delete("/images/:filename", authMiddleware, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(UPLOAD_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Arquivo não encontrado" });
  }

  fs.unlinkSync(filePath);

  return res.json({ message: "Imagem excluída com sucesso" });
});

// Servir arquivos enviados
app.use("/uploads", express.static(UPLOAD_DIR));

// Servir React/Vite buildado
app.use(express.static(DIST_DIR));

// Fallback para rotas do React
app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});