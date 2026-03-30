import { TextField, Button } from "@mui/material";

export default function DoctorsView() {
  return (
    <div>
      <h2 style={{ color: "#FFD700" }}>Cadastro de Doutores</h2>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <TextField label="Nome" variant="outlined" />
        <TextField label="Especialidade" variant="outlined" />
        <TextField label="Horário de Início" type="time" />
        <TextField label="Horário de Fim" type="time" />
        <Button variant="contained" color="primary">Cadastrar</Button>
      </form>
    </div>
  );
}
