import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Resources() {
  return (
    <Container component="main" sx={{ bgcolor: "white" }}>
      <Container maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginBottom: 0,
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2
          }}>
          <Typography component="h1" variant="h3">
            CovEd Resources
          </Typography>
        </Box>
        <Box
          sx={{
            marginBottom: 5,
            marginTop: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 2,
            flexGrow: 1
          }}>
          <Typography component="h4" align="center">
            Welcome to our resources page! Here you will be able to find links to more online
            learning resources. Don&apos;t have a mentor yet, but need help in a particular subject?
            No problem! Check out our Piazza page! To join the piazza forum, simply follow these
            written instructions, or follow the instructions in this video.
          </Typography>
        </Box>
        <Box
          sx={{
            marginBottom: 5,
            marginTop: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 2
          }}>
          <Typography component="h4" align="center">
            Links
          </Typography>
        </Box>
      </Container>
    </Container>
  );
}
export default Resources;
