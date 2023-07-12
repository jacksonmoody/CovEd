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
          <ul>
            <li>
              <a
                href="http://bit.ly/coved-service-learning-faq"
                target="_blank"
                rel="noopener noreferrer">
                Service Hours FAQ
              </a>
            </li>
            <li>
              Service Hours: Fill out{" "}
              <a href="http://bit.ly/coved-debrief" target="_blank" rel="noopener noreferrer">
                this form
              </a>{" "}
              regularly to keep track of your hours. If you need service hours, feel free to email
              yeji@coved.org with any questions. We&apos;re here to support you! Email
              yeji@coved.org at least 3 days before you need it signed off andreach out if you have
              any questions.
            </li>
            <li>
              <a
                href="https://docs.google.com/document/d/12mTLuFYoSHbLaSAt9dfYmTo2OQIH-tDf5tbRHhAVI5E/edit"
                target="_blank"
                rel="noopener noreferrer">
                CovEd Mentor Guidelines
              </a>
            </li>
          </ul>
        </Box>
      </Container>
    </Container>
  );
}
export default Resources;
