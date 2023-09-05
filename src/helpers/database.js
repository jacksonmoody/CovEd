import { db } from "./firebase";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

async function setDocument(collection, uid, data) {
  await setDoc(doc(db, collection, uid), data);
}

export async function addUser(
  uid,
  type,
  name,
  authProvider,
  email,
  image = "",
  onboarded = false,
  partnership = false,
  bio = "",
  school = "",
  subjects = [],
  languages = [],
  location = "",
  timeZone = "",
  academicYear = "",
  gradeLevel = -1,
  gradeLevels = [],
  startDate = "",
  endDate = "",
  days = [],
  startTime = "",
  endTime = "",
  specialNeeds = [],
  createdAt = Date.now()
) {
  const data = {
    uid: uid,
    type: type,
    displayName: name,
    authProvider: authProvider,
    onboarded: onboarded,
    email: email,
    image: image,
    partnership: partnership,
    bio: bio,
    school: school,
    subjects: subjects,
    languages: languages,
    location: location,
    timeZone: timeZone,
    academicYear: academicYear,
    gradeLevel: gradeLevel,
    gradeLevels: gradeLevels,
    startDate: startDate,
    endDate: endDate,
    days: days,
    startTime: startTime,
    endTime: endTime,
    specialNeeds: specialNeeds,
    createdAt: createdAt
  };
  if (type === "Mentee") {
    await setDocument("mentees", uid, data);
  } else if (type === "Mentor") {
    await setDocument("mentors", uid, data);
  } else if (type === "Admin") {
    await setDocument("admin", uid, data);
  }
}

export async function updateUser(uid, type, data) {
  if (type === "Mentee") {
    await updateDoc(doc(db, "mentees", uid), data);
  } else if (type === "Mentor") {
    await updateDoc(doc(db, "mentors", uid), data);
  } else if (type === "Admin") {
    await updateDoc(doc(db, "admin", uid), data);
  }
}

export async function deleteUser(uid, type) {
  await deleteDoc(doc(db, type, uid));
}

export async function addHours(uid, menteeId, type, hours, description = "", attachment = "") {
  await setDocument("hours", uid + Date.now(), {
    id: uid + Date.now(),
    uid: uid,
    menteeId: menteeId,
    type: type,
    hours: hours,
    description: description,
    attachment: attachment,
    status: "Pending",
    createdAt: Date.now()
  });
}

export async function updateHours(id, status) {
  await updateDoc(doc(db, "hours", id), {
    status: status
  });
}
