import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ReportsView() {
  const data = {
    labels: ["Janeiro", "Fevereiro", "Março"],
    datasets: [
      {
        label: "Acessos à Agenda",
        data: [30, 45, 60],
        backgroundColor: "#FFD700", // dourado
      },
      {
        label: "Reservas Confirmadas",
        data: [10, 20, 25],
        backgroundColor: "#333333", // preto
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#FFD700" },
      },
      title: {
        display: true,
        text: "Relatórios de Acessos e Reservas",
        color: "#FFD700",
      },
    },
    scales: {
      x: { ticks: { color: "#FFD700" } },
      y: { ticks: { color: "#FFD700" } },
    },
  };

  return (
    <div>
      <h2 style={{ color: "#FFD700" }}>Relatórios</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
