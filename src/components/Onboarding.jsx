import { useState, forwardRef } from "react";
import { auth } from "../helpers/firebase";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiAlert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { updateUser, deleteUser } from "../helpers/database";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CircularProgress from "@mui/material/CircularProgress";
import OnboardingCard from "./OnboardingCard";
import Snackbar from "@mui/material/Snackbar";
import { SUBJECTS } from "../helpers/constants";
import { GRADE_LEVELS } from "../helpers/constants";
import { TIMEZONES } from "../helpers/constants";
import { DAYS } from "../helpers/constants";
import { LANGUAGES } from "../helpers/constants";
import { SPECIAL_NEEDS } from "../helpers/constants";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250
    }
  }
};

function Onboarding(props) {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    onboarded: true,
    partnership: false,
    bio: "",
    school: "",
    image: props.currentUser.image,
    subjects: [],
    languages: [],
    location: "",
    timeZone: "",
    academicYear: "",
    gradeLevel: "",
    gradeLevels: [],
    startDate: "",
    endDate: "",
    days: [],
    startTime: "",
    endTime: "",
    specialNeeds: []
  });

  const nextPage = (params) => {
    if (params) {
      for (const param of params) {
        if (formData[param] === "" || formData[param].length === 0 || formData[param] === -1) {
          setError(true);
          return;
        }
      }
    }
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelect = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const values = typeof value === "string" ? value.split(",") : value;
    setFormData({ ...formData, [name]: values });
  };

  const handleDate = (e, param) => {
    const value = e.$d;
    setFormData({ ...formData, [param]: value });
  };

  const handleTime = (e, param) => {
    const value = e.$d;
    const time = value.toString().split(" ").slice(4).join(" ");
    setFormData({ ...formData, [param]: time });
  };

  function handleOnboarding() {
    props.setOnboarded(true);
    updateUser(props.currentUser.uid, props.currentUser.type, formData);
  }

  function handleImage(e) {
    setUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${props.currentUser.uid}`);
    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      setUploading(false);
      if (snapshot.state !== "error") {
        getDownloadURL(storageRef).then((url) => {
          setFormData({ ...formData, ["image"]: url });
          setSuccess(true);
        });
      }
    });
  }

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return (
          <OnboardingCard
            title="Welcome to CovEd!"
            subtitle="We can't wait to have you join us. Now, let's finish setting up your account:">
            <div
              style={{
                backgroundColor: "#ffe094",
                borderRadius: "10px",
                marginTop: "20px",
                padding: "20px"
              }}>
              <Typography component="h4" sx={{ textAlign: "center" }}>
                Note: You are currently registering{" "}
                {props.currentUser.type === "Mentor" ? "to mentor" : "for mentorship"}. If this is
                incorrect, please{" "}
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={async () => {
                    try {
                      if (props.currentUser.type === "Mentor") {
                        await deleteUser(props.currentUser.uid, "mentors");
                      } else {
                        await deleteUser(props.currentUser.uid, "mentees");
                      }
                      auth.signOut();
                    } catch (e) {
                      console.error(e);
                    }
                  }}>
                  restart the registration process.
                </span>
              </Typography>
            </div>
            <Button variant="contained" onClick={() => nextPage()} sx={{ mt: 3, mb: 1 }}>
              Next
            </Button>
          </OnboardingCard>
        );
      case 1:
        return (
          <OnboardingCard
            title="Tell us about yourself"
            subtitle={
              "First, tell us a little bit about yourself so that we can match you with the perfect " +
              (props.currentUser.type === "Mentor" ? " mentee:" : " mentor:")
            }>
            <TextField
              label="Input Bio"
              name="bio"
              multiline
              rows={4}
              variant="outlined"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself!"
              required
              sx={{ width: "100%", marginTop: 3 }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 3,
                width: "100%"
              }}>
              <Button variant="contained" onClick={previousPage}>
                Previous
              </Button>
              <Button variant="contained" onClick={() => nextPage(["bio"])}>
                Next
              </Button>
            </Box>
          </OnboardingCard>
        );
      case 2:
        return (
          <OnboardingCard
            title="Academic Information"
            subtitle={
              "The following information will help us get to know your academic interests " +
              (props.currentUser.type === "Mentee" ? "and needs." : "and strengths.")
            }>
            <Typography component="h2" sx={{ fontWeight: "bold", mt: 3, textAlign: "center" }}>
              What school do you attend?
            </Typography>
            <TextField
              variant="outlined"
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="School Name"
              required
              sx={{ mt: 1, width: "80%" }}
            />
            <Typography
              component="h2"
              sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
              What is your grade level?
            </Typography>
            <Select
              name="gradeLevel"
              required
              value={formData.gradeLevel}
              onChange={(e) => handleMultiSelect(e)}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              label="Grade Level"
              sx={{ mt: 1, width: "80%" }}
              MenuProps={MenuProps}>
              {GRADE_LEVELS.map((grade, i) => (
                <MenuItem key={grade} value={i}>
                  {grade}
                </MenuItem>
              ))}
            </Select>
            {props.currentUser.type === "Mentor" && (
              <>
                <Typography
                  component="h2"
                  sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
                  What grade levels do you feel most comfortable teaching?
                </Typography>
                <Select
                  name="gradeLevels"
                  multiple
                  value={formData.gradeLevels}
                  onChange={(e) => handleMultiSelect(e)}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  sx={{ width: "75%" }}>
                  {GRADE_LEVELS.map((grade, i) => (
                    <MenuItem key={grade} value={i}>
                      {grade}
                    </MenuItem>
                  ))}
                </Select>
                <Typography
                  component="h2"
                  sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
                  Would you be interested in working with one of CovEd&apos;s external partners?
                </Typography>
                <FormControl>
                  <RadioGroup
                    row
                    name="partnership"
                    value={formData.partnership}
                    onChange={handleChange}>
                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                    <FormControlLabel value={false} control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </>
            )}
            <Typography
              component="h2"
              sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
              Which subjects do you{" "}
              {props.currentUser.type === "Mentee"
                ? "want additional help in?"
                : "feel comfortable with?"}
            </Typography>
            <Select
              name="subjects"
              required
              multiple
              value={formData.subjects}
              onChange={(e) => handleMultiSelect(e)}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
              sx={{ width: "80%" }}>
              {SUBJECTS.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 3,
                width: "100%"
              }}>
              <Button variant="contained" onClick={previousPage}>
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={() => nextPage(["school", "gradeLevel", "subjects"])}>
                Next
              </Button>
            </Box>
          </OnboardingCard>
        );
      case 3:
        return (
          <OnboardingCard
            title="Availability"
            subtitle="The following information will help us find a match with a similar schedule.">
            <Typography component="h2" sx={{ fontWeight: "bold", mt: 3, textAlign: "center" }}>
              What time zone are you in? (It looks like you may be in{" "}
              {Intl.DateTimeFormat().resolvedOptions().timeZone})
            </Typography>
            <Select
              name="timeZone"
              value={formData.timeZone}
              onChange={(e) => handleMultiSelect(e)}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              MenuProps={MenuProps}
              sx={{ width: "80%" }}>
              {TIMEZONES.map((zone) => (
                <MenuItem key={zone} value={zone}>
                  {zone}
                </MenuItem>
              ))}
            </Select>
            <Typography component="h2" sx={{ fontWeight: "bold", mt: 3, textAlign: "center" }}>
              Where are you located? (City, State)
            </Typography>
            <TextField
              variant="outlined"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ex: San Francisco, CA"
              required
              sx={{ mt: 1, width: "80%" }}
            />
            <Typography
              component="h2"
              sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
              How is your academic year organized?
            </Typography>
            <FormControl>
              <RadioGroup
                row
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}>
                <FormControlLabel value={"trimester"} control={<Radio />} label="Trimester" />
                <FormControlLabel value={"quarter"} control={<Radio />} label="Quarter" />
                <FormControlLabel value={"semester"} control={<Radio />} label="Semester" />
              </RadioGroup>
            </FormControl>
            <Typography
              component="h2"
              sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
              When would you like to start tutoring?
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="startDate"
                label="Start Date"
                value={""}
                onChange={(e) => handleDate(e, "startDate")}
                sx={{ mt: 1, mb: 2, width: "80%" }}
              />
            </LocalizationProvider>
            <Typography
              component="h2"
              sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
              When would you like to stop tutoring?
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="endDate"
                label="End Date"
                value={""}
                onChange={(e) => handleDate(e, "endDate")}
                sx={{ mt: 1, mb: 2, width: "80%" }}
              />
            </LocalizationProvider>
            <Typography
              component="h2"
              sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
              What days of the week are you generally available?
            </Typography>
            <Select
              name="days"
              multiple
              value={formData.days}
              onChange={(e) => handleMultiSelect(e)}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
              sx={{ width: "80%" }}>
              {DAYS.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <Typography
              component="h2"
              sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
              What time does your availability generally start?
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopTimePicker
                name="startTime"
                label="Start Time"
                value={""}
                onChange={(e) => handleTime(e, "startTime")}
                sx={{ width: "80%" }}
              />
            </LocalizationProvider>
            <Typography
              component="h2"
              sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
              What time does your availability generally end?
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopTimePicker
                name="endTime"
                label="End Time"
                value={""}
                onChange={(e) => handleTime(e, "endTime")}
                sx={{ width: "80%" }}
              />
            </LocalizationProvider>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 3,
                width: "100%"
              }}>
              <Button variant="contained" onClick={previousPage}>
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={() => nextPage(["timeZone", "location", "academicYear"])}>
                Next
              </Button>
            </Box>
          </OnboardingCard>
        );
      case 4:
        return (
          <OnboardingCard
            title="Additional Information"
            subtitle="This additional information will help us find the most compatible match possible!">
            <Typography
              component="h2"
              sx={{ mt: 4, mb: 1, fontWeight: "bold", textAlign: "center" }}>
              {props.currentUser.type === "Mentor"
                ? "Which languages do you hold proficiency in?"
                : "What is your preferred language?"}
            </Typography>
            <Select
              name="languages"
              multiple
              value={formData.languages}
              onChange={(e) => handleMultiSelect(e)}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
              sx={{ width: "80%" }}>
              {LANGUAGES.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <Typography
              component="h2"
              sx={{ fontWeight: "bold", mt: 3, mb: 1, textAlign: "center" }}>
              {props.currentUser.type === "Mentor"
                ? "Do you have experience in / would you feel prepared to work with students in any of the following categories?"
                : "Do you need a mentor who has experience in any of the below?"}
            </Typography>
            <Select
              name="specialNeeds"
              multiple
              value={formData.specialNeeds}
              onChange={(e) => handleMultiSelect(e)}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
              sx={{ width: "80%" }}>
              {SPECIAL_NEEDS.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 3,
                width: "100%"
              }}>
              <Button variant="contained" onClick={previousPage}>
                Previous
              </Button>
              <Button variant="contained" onClick={() => nextPage()}>
                Next
              </Button>
            </Box>
          </OnboardingCard>
        );
      case 5:
        return (
          <OnboardingCard
            title="Upload Profile Picture"
            subtitle="Lastly, upload a profile picture so that other users can recognize you!">
            {!uploading && !success && (
              <Button variant="contained" color="primary" sx={{ mt: 3, mb: 1 }} component="label">
                Upload Profile Picture
                <input type="file" accept="image/*" hidden onChange={(e) => handleImage(e)} />
              </Button>
            )}
            {uploading && <CircularProgress sx={{ marginTop: 3 }} />}
            <Collapse in={success} sx={{ marginTop: 3 }}>
              <MuiAlert>Image upload success!</MuiAlert>
            </Collapse>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 3,
                width: "100%"
              }}>
              <Button variant="contained" onClick={previousPage}>
                Previous
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </OnboardingCard>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form onSubmit={handleOnboarding}>{renderPage()}</form>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => {
          setError(false);
        }}>
        <Alert
          onClose={() => {
            setError(false);
          }}
          severity="error"
          sx={{ width: "100%" }}>
          {"Please fill out all required fields before continuing."}
        </Alert>
      </Snackbar>
    </>
  );
}
export default Onboarding;
