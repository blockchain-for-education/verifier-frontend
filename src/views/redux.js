const { createSlice } = require("@reduxjs/toolkit");

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    decodedData: {
      publicKeyHex: "",
      certificate: { address: "", versions: [{ txid: "", timestamp: 1234, active: "", plain: "" }] },
      subjects: [{ address: "", versions: [{ txid: "", timestamp: 1234, active: "", plain: "" }] }, {}],
    },
  },
  reducers: {
    setDecodedData: (state, action) => {
      state.decodedData = action.payload;
    },
    setCertIntegrityCheckResult: (state, action) => {
      state.decodedData.certificate.versions[0].valid = action.payload.valid;
      state.decodedData.certificate.versions[0].timestamp = action.payload.timestamp;
    },
    setSubjectIntegrityCheckResult: (state, action) => {
      const { subjectIndex, versionIndex, valid } = action.payload;
      const version = state.decodedData.subjects[subjectIndex].versions[versionIndex];
      version.valid = valid;
      if (valid === false) {
        version.msg = action.payload.msg;
      } else {
        version.timestamp = action.payload.timestamp;
      }
    },
  },
});

export default appSlice.reducer;
export const { setDecodedData, setCertIntegrityCheckResult, setSubjectIntegrityCheckResult } = appSlice.actions;