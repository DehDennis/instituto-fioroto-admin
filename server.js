import express from "express";
import multer from "multer";
import cors from "cors";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const app = express();

const PORT = process.env.PORT || 4000;
const SECRET = process.env.JWT_SECRET || "chave-super-secreta";

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.resolve("uploads");
const DIST_DIR = path.resolve("dist");

const CATEGORIES = {
  "resina-normal": "resinasNormais",
  "resina-estratificada": "resinasEstratificadas",
  porcelana: "porcelanas",
};

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

Object.keys(CATEGORIES).forEach((category) => {
  const dir = path.join(UPLOAD_DIR, category);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

app.use(cors());
app.use(express.json());

const USERS = [
  { username: "admin", password: "fiorotto290426!" },
  { username: "drfiorotto", password: "fiorotto290426!" },
];

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

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token ausente" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, SECRET);
    return next();
  } catch {
    return res.status(403).json({ error: "Token inválido" });
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category;

    if (!CATEGORIES[category]) {
      return cb(new Error("Categoria inválida"));
    }

    const categoryDir = path.join(UPLOAD_DIR, category);

    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    cb(null, categoryDir);
  },

  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: {
    files: 30,
    fileSize: 8 * 1024 * 1024,
  },
});

app.post("/upload", authMiddleware, upload.array("images", 30), (req, res) => {
  const category = req.body.category;

  const filePaths = req.files.map(
    (file) => `/uploads/${category}/${file.filename}`
  );

  return res.json({
    message: "Upload realizado com sucesso",
    category,
    files: filePaths,
  });
});

app.get("/images", (req, res) => {
  const result = {
    resinasNormais: [],
    resinasEstratificadas: [],
    porcelanas: [],
  };

  Object.entries(CATEGORIES).forEach(([folder, key]) => {
    const dir = path.join(UPLOAD_DIR, folder);

    if (fs.existsSync(dir)) {
      result[key] = fs
        .readdirSync(dir)
        .map((file) => `/uploads/${folder}/${file}`);
    }
  });

  return res.json(result);
});

app.delete("/images/:category/:filename", authMiddleware, (req, res) => {
  const { category, filename } = req.params;

  if (!CATEGORIES[category]) {
    return res.status(400).json({ error: "Categoria inválida" });
  }

  const filePath = path.join(UPLOAD_DIR, category, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Arquivo não encontrado" });
  }

  fs.unlinkSync(filePath);

  return res.json({ message: "Imagem excluída com sucesso" });
});

app.use("/uploads", express.static(UPLOAD_DIR));

app.use(express.static(DIST_DIR));

app.use((req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});