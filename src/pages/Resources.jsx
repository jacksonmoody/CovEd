import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Resources() {
  return (
    <Container component="main" sx={{ bgcolor: "white", paddingBottom: 10 }}>
      <Container maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            alignText: "center",
            overflow: "scroll"
          }}>
          <Typography
            component="h1"
            variant="h3"
            sx={{ marginTop: 10, fontFamily: "Raleway", fontWeight: "bold" }}>
            CovEd Resources
          </Typography>
          <br />
          <Typography component="h5" variant="h5" sx={{ textAlign: "center" }}>
            🚧 This page is currently under construction. Check back later for resources exclusive
            to our mentors and mentees!
          </Typography>
        </Box>
      </Container>
    </Container>
  );
}
export default Resources;
