import { Box, Typography } from "@mui/material";
import Layout from "./Layout";

export default function Porcelana() {
  return (
    <Layout>
      <Box sx={sectionStyle}>
        <Box component="img" src="/img/porcelana.jpeg" sx={imageStyle} />

        <Box>
          <Typography sx={titleStyle}>✨ Facetas de Porcelana ✨</Typography>

          <Typography sx={textStyle}>
            A porcelana possui um charme único.
            <br /><br />
            Brilho sofisticado, naturalidade impecável e alta durabilidade para quem deseja um sorriso elegante e atemporal.
            <br /><br />
            Um tratamento que une estética, exclusividade e excelência em cada detalhe. 🤍🦷
          </Typography>
        </Box>
      </Box>
    </Layout>
  );
}

const sectionStyle = {
  px: { xs: 2, md: 6 },
  py: { xs: 4, md: 7 },
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: ".9fr 1.1fr" },
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