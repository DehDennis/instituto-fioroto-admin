import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        bgcolor: "#000",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(0,0,0,0.96)",
          borderBottom: "1px solid rgba(255,215,0,.35)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1.5,
            px: { xs: 1.5, md: 4 },
            py: 1,
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src="/img/logo.png"
              sx={{
                width: { xs: 42, md: 56 },
                height: { xs: 42, md: 56 },
                bgcolor: "#fff",
                borderRadius: 2,
                p: 0.5,
              }}
            />

            <Box>
              <Typography
                sx={{
                  color: "#FFD700",
                  fontWeight: 900,
                  fontSize: { xs: ".95rem", md: "1.45rem" },
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Instituto Fiorotto
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,.75)",
                  fontSize: ".65rem",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                Estética Odontológica
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "center",
            }}
          >
            {[
              ["Início", "/"],
              ["Doutores", "/doutores"],
              ["Resina", "/resina"],
              ["Porcelana", "/porcelana"],
            ].map(([label, path]) => (
              <Button key={path} component={Link} to={path} sx={navButtonStyle}>
                {label}
              </Button>
            ))}

            <Button component={Link} to="/login" sx={loginButtonStyle}>
              Área do Doutor
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          borderTop: "1px solid rgba(255,215,0,.35)",
          textAlign: "center",
          px: 2,
          py: 3,
        }}
      >
        <Typography sx={{ color: "#FFD700", fontWeight: 900 }}>
          Instituto Fiorotto
        </Typography>
        <Typography sx={{ color: "#fff", mb: 2, fontSize: ".9rem" }}>
          Excelência em estética odontológica • São Paulo - SP
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Box
            component="a"
            href="https://wa.me/5511959645994"
            target="_blank"
            sx={whatsStyle}
          >
            <WhatsAppIcon fontSize="small" /> WhatsApp Atendimento
          </Box>

          <Box
            component="a"
            href="https://wa.me/5511987880320"
            target="_blank"
            sx={whatsStyle}
          >
            <WhatsAppIcon fontSize="small" /> WhatsApp Recepção
          </Box>

          <Box
            component="a"
            href="https://www.instagram.com/drgabrielfiorotto"
            target="_blank"
            sx={instagramStyle}
          >
            <InstagramIcon fontSize="small" /> Instagram
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const navButtonStyle = {
  color: "#FFD700",
  border: "1px solid rgba(255,215,0,.35)",
  borderRadius: "999px",
  fontSize: { xs: ".68rem", md: ".8rem" },
  px: 1.5,
};

const loginButtonStyle = {
  background: "linear-gradient(135deg,#FFD700,#B8860B)",
  color: "#000",
  fontWeight: 900,
  borderRadius: "999px",
  fontSize: { xs: ".68rem", md: ".8rem" },
  px: 1.6,
};

const whatsStyle = {
  color: "#000",
  background: "linear-gradient(135deg,#09ff00,#f3f1ed)",
  textDecoration: "none",
  fontWeight: "bold",
  px: 2,
  py: 1,
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  gap: 1,
};

const instagramStyle = {
  color: "#fff",
  background: "linear-gradient(135deg,#ff00cc,#f3f1ed)",
  textDecoration: "none",
  fontWeight: "bold",
  px: 2,
  py: 1,
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  gap: 1,
};