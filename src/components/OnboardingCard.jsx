import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function OnboardingCard(props) {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 12,
          marginBottom: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 5,
          bgcolor: "white",
          borderRadius: "20px"
        }}>
        <Typography component="h2" variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
          {props.title}
        </Typography>
        <Typography component="p" variant="p" sx={{ marginTop: 3, textAlign: "center" }}>
          {props.subtitle}
        </Typography>
        {props.children}
      </Box>
    </Container>
  );
}
