import { Box, Typography } from "@mui/material";
import Layout from "./Layout";

export default function Resina() {
  return (
    <Layout>
      <Box sx={sectionStyle}>
        <Box>
          <Typography sx={titleStyle}>✨ Facetas em Resina ✨</Typography>

          <Typography sx={textStyle}>
            Transformações naturais, rápidas e conservadoras.
            <br /><br />
            A resina composta é uma excelente opção para quem busca harmonizar o sorriso com beleza, praticidade e ótimo custo-benefício.
            <br /><br />
            Cada detalhe é planejado para valorizar a naturalidade e a identidade de cada paciente. 🦷✨
          </Typography>
        </Box>

        <Box component="img" src="/img/resina.jpeg" sx={imageStyle} />
      </Box>
    </Layout>
  );
}

const sectionStyle = {
  px: { xs: 2, md: 6 },
  py: { xs: 4, md: 7 },
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1.1fr .9fr" },
  gap: 4,
  alignItems: "center",
};

const imageStyle = {
  width: "100%",
  minHeight: { xs: 260, md: 420 },
  objectFit: "cover",
  borderRadius: "24px",
  border: "2px solid #FFD700",
};

const titleStyle = {
  color: "#FFD700",
  fontSize: { xs: "1.8rem", md: "2.5rem" },
  fontWeight: 900,
  fontFamily: "'Playfair Display', serif",
  mb: 2,
};

const textStyle = {
  color: "#fff",
  fontSize: { xs: "1rem", md: "1.12rem" },
  lineHeight: 1.8,
};