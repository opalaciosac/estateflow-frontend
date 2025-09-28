import { useState } from "react";
import { Button, TextField, Paper, Typography, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

function App() {
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState<"summary-only" | "summary-and-flowchart">("summary-only");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || !email) {
      setMessage("Por favor, sube un archivo y escribe tu email.");
      return;
    }

    const uploadedFiles = await Promise.all(
      Array.from(files).map(async (file) => {
        const content = await file.arrayBuffer();
        return {
          fileName: file.name,
          fileContent: Array.from(new Uint8Array(content)),
        };
      })
    );

    const body = { files: uploadedFiles, email, output };

    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setMessage(data.text);
    } catch (err) {
      console.error(err);
      setMessage("Error al conectar con el backend.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" gutterBottom align="center">
          EstateFlow Summarizer
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            style={{ margin: "1rem 0" }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Output</InputLabel>
            <Select
              value={output}
              label="Output"
              onChange={(e) => setOutput(e.target.value as "summary-only" | "summary-and-flowchart")}
            >
              <MenuItem value="summary-only">Summary Only</MenuItem>
              <MenuItem value="summary-and-flowchart">Summary and Flowchart</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" fullWidth>
            Enviar
          </Button>
        </form>
        <Typography color="text.secondary" sx={{ mt: 2 }} align="center">
          {message}
        </Typography>
      </Paper>
    </Box>
  );
}

export default App;
