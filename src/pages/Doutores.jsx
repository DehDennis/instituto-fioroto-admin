import { Box, Typography } from "@mui/material";
import Layout from "./Layout";

export default function Doutores() {
  return (
    <Layout>
      <Box sx={sectionStyle}>
        <Box component="img" src="/img/doutores.jpeg" sx={imageStyle} />

        <Box>
          <Typography sx={titleStyle}>Dra. Caroline Fiorotto e Dr. Gabriel Fiorotto</Typography>

          <Typography sx={textStyle}>
            São os responsáveis pelo Instituto Fiorotto, referência em estética dental e transformação de sorrisos.
            <br /><br />
            Com uma odontologia moderna, humanizada e focada na excelência, o casal une técnica, experiência e olhar artístico para entregar resultados naturais, sofisticados e personalizados.
            <br /><br />
            Especializados em lentes de porcelana, facetas estéticas e reabilitação oral, acreditam que cada sorriso deve transmitir identidade, confiança e elegância.
            <br /><br />
            No Instituto Fiorotto, cada paciente recebe um atendimento exclusivo, com planejamento individualizado e uma experiência premium em cada etapa do tratamento.
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
  maxHeight: { xs: 420, md: 560 },
  objectFit: "cover",
  borderRadius: "24px",
  border: "2px solid #FFD700",
};

const titleStyle = {
  color: "#FFD700",
  fontSize: { xs: "1.8rem", md: "2.6rem" },
  fontWeight: 900,
  fontFamily: "'Playfair Display', serif",
  mb: 2,
};

const textStyle = {
  color: "#fff",
  fontSize: { xs: "1rem", md: "1.12rem" },
  lineHeight: 1.8,
};