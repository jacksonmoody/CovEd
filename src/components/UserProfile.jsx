import { Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { updateUser } from "../helpers/database";
import { SUBJECTS } from "../helpers/constants";
import { GRADE_LEVELS } from "../helpers/constants";
import { LANGUAGES } from "../helpers/constants";
import { TIMEZONES } from "../helpers/constants";

export default function UserProfile(props) {
  const [editProfile, setEditProfile] = useState(false);
  const [name, setName] = useState(props.currentUser.displayName ?? "");
  const [school, setSchool] = useState(props.currentUser.school ?? "");
  const [gradeLevel, setGradeLevel] = useState(
    props.currentUser.gradeLevel >= 0 ? props.currentUser.gradeLevel : ""
  );
  const [bio, setBio] = useState(props.currentUser.bio ?? "");
  const [subjects, setSubjects] = useState(props.currentUser.subjects ?? []);
  const [gradeLevels, setGradeLevels] = useState(props.currentUser.gradeLevels ?? []);
  const [languages, setLanguages] = useState(props.currentUser.languages ?? []);
  const [location, setLocation] = useState(props.currentUser.location ?? "");
  const [timeZone, setTimeZone] = useState(props.currentUser.timeZone ?? "");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250
      }
    }
  };

  function handleMultiSelect(event, setFunction) {
    const {
      target: { value }
    } = event;
    setFunction(typeof value === "string" ? value.split(",") : value);
  }

  function saveProfile() {
    updateUser(props.currentUser.uid, props.currentUser.type, {
      displayName: name,
      school: school,
      gradeLevel: gradeLevel,
      bio: bio,
      subjects: subjects,
      gradeLevels: gradeLevels,
      languages: languages,
      location: location,
      timeZone: timeZone
    });
    setEditProfile(false);
  }

  return (
    <Stack direction="column" mt={4} ml={8} width="80%" sx={{ overflowY: "scroll" }}>
      <Box width="100%" height="140px" sx={{ display: "flex", direction: "row" }}>
        {!isMobile && (
          <Avatar
            alt="User Profile"
            src={props.currentUser.image}
            sx={{ height: "100px", width: "100px", marginTop: "20px" }}
          />
        )}
        <Stack spacing={1} ml={2} mt={editProfile ? -3 : 3}>
          {!editProfile ? (
            <Typography variant="h6">{name ? name : "No Name Provided"}</Typography>
          ) : (
            <TextField
              label={name ? name : "Input Name"}
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {!editProfile ? (
            <Typography variant="p">{school ? school : "No School Provided"}</Typography>
          ) : (
            <TextField
              label={school ? school : "Input School"}
              variant="standard"
              onChange={(e) => setSchool(e.target.value)}
            />
          )}
          {!editProfile ? (
            <Typography variant="p">
              {gradeLevel >= 0 ? "Grade " + gradeLevel : "No Grade Provided"}
            </Typography>
          ) : (
            <>
              <FormControl>
                <InputLabel id="grade-level" sx={{ marginTop: 2, marginRight: 10 }}>
                  Grade
                </InputLabel>
                <Select
                  labelId="grade-level"
                  id="grade-level"
                  value={gradeLevel}
                  onChange={(e) => handleMultiSelect(e, setGradeLevel)}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  label="Grade Level"
                  sx={{ marginTop: 2 }}
                  MenuProps={MenuProps}>
                  {GRADE_LEVELS.map((grade, i) => (
                    <MenuItem key={grade} value={i}>
                      {grade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </Stack>
      </Box>
      <Box mt={4} ml={1} width="100%">
        <Stack spacing={1}>
          <Typography variant="p" fontSize={14} sx={{ fontWeight: "bold" }}>
            Bio
          </Typography>
          {!editProfile ? (
            <Typography variant="p">{bio ? bio : "No Bio Provided"}</Typography>
          ) : (
            <TextField
              label={bio ?? "Input Bio"}
              multiline
              rows={2}
              variant="outlined"
              onChange={(e) => setBio(e.target.value)}
              sx={{ width: "88%" }}
            />
          )}
        </Stack>
      </Box>
      <Box
        display={!isMobile ? "flex" : "block"}
        direction="row"
        justifyContent="space-between"
        width="100%"
        ml={1}
        mt={4}>
        <Grid container item display="flex" direction="column">
          <Typography variant="p" fontSize={14} sx={{ fontWeight: "bold" }}>
            Subjects
          </Typography>
          {!editProfile ? (
            <Typography variant="h6" fontSize={14}>
              {subjects.length != 0 ? subjects.join(", ") : "No Subjects Provided"}
            </Typography>
          ) : (
            <Select
              multiple
              value={subjects}
              onChange={(e) => handleMultiSelect(e, setSubjects)}
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
              {SUBJECTS.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          )}
          {props.currentUser.type === "Mentor" && (
            <>
              <Typography variant="p" fontSize={14} mt={2} sx={{ fontWeight: "bold" }}>
                Grade Levels
              </Typography>
              {!editProfile ? (
                <Typography variant="h6" fontSize={14}>
                  {gradeLevels.length != 0 ? gradeLevels.join(", ") : "No Grade Levels Provided"}
                </Typography>
              ) : (
                <Select
                  multiple
                  value={gradeLevels}
                  onChange={(e) => handleMultiSelect(e, setGradeLevels)}
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
              )}
            </>
          )}
          <Typography variant="p" fontSize={14} mt={2} sx={{ fontWeight: "bold" }}>
            {"Language(s)"}
          </Typography>
          {!editProfile ? (
            <Typography variant="h6" fontSize={14}>
              {languages.length != 0 ? languages.join(", ") : "No Language(s) Provided"}
            </Typography>
          ) : (
            <Select
              multiple
              value={languages}
              onChange={(e) => handleMultiSelect(e, setLanguages)}
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
              {LANGUAGES.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          )}
        </Grid>
        <Grid container item display="flex" direction="column" mt={isMobile ? 2 : 0}>
          <Typography variant="p" fontSize={14} sx={{ fontWeight: "bold" }}>
            {"Location"}
          </Typography>
          {!editProfile ? (
            <Typography variant="h6" fontSize={14}>
              {location ? location : "No Location Provided"}
            </Typography>
          ) : (
            <TextField
              label={location ? location : "Input Location (City, State)"}
              variant="standard"
              onChange={(e) => setLocation(e.target.value)}
              sx={{ width: "75%" }}
            />
          )}
          <Typography variant="p" fontSize={14} mt={2} sx={{ fontWeight: "bold" }}>
            Time Zone
          </Typography>
          {!editProfile ? (
            <Typography variant="p">
              <Typography variant="h6" fontSize={14}>
                {timeZone ? timeZone : "No Time Zone Provided"}
              </Typography>
            </Typography>
          ) : (
            <Select
              value={timeZone}
              onChange={(e) => handleMultiSelect(e, setTimeZone)}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              MenuProps={MenuProps}
              sx={{ width: "75%" }}>
              {TIMEZONES.map((zone) => (
                <MenuItem key={zone} value={zone}>
                  {zone}
                </MenuItem>
              ))}
            </Select>
          )}
          <Typography variant="p" fontSize={14} mt={2} sx={{ fontWeight: "bold" }}>
            Email
          </Typography>
          <Typography variant="p" fontSize={14}>
            {props.currentUser.email}
          </Typography>
        </Grid>
      </Box>
      {!editProfile ? (
        <Button
          variant="contained"
          sx={{ marginTop: 5, marginBottom: 5, width: "240px" }}
          onClick={() => setEditProfile(true)}>
          Edit Profile
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{ marginTop: 5, marginBottom: 5, width: "240px" }}
          onClick={saveProfile}>
          Save Profile
        </Button>
      )}
    </Stack>
  );
}
