const { createSlice } = require("@reduxjs/toolkit");

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    decodedToken: {
      publicKeyHex: "",
      certificate: { address: "", versions: [{ txid: "", timestamp: 1234, active: "", plain: "" }] },
      subjects: [{ address: "", versions: [{ txid: "", timestamp: 1234, active: "", plain: "" }] }, {}],
    },
    offChainCheckResult: {
      sumCredit: 0,
      CPA: 0,
    },
  },
  reducers: {
    setDecodedTokenAndEduProgramOnBKC: (state, action) => {
      state.decodedToken = action.payload.decodedToken;
      state.eduProgramOnBKC = action.payload.eduProgramOnBKC;
    },

    setSubjectIntegrityCheckResult: (state, action) => {
      const { subjectIndex, versionIndex, valid } = action.payload;
      const version = state.decodedToken.subjects[subjectIndex].versions[versionIndex];
      version.valid = valid;
      if (valid === false) {
        version.msg = action.payload.msg;
      } else {
        version.timestamp = action.payload.timestamp;
      }
    },
    setOffChainCheckResult: (state, action) => {
      state.offChainCheckResult.sumCredit = action.sumCredit;
      state.offChainCheckResult.CPA = action.payload.CPA;
    },
  },
});

export default appSlice.reducer;
export const {
  setCertIntegrityCheckResult,
  setSubjectIntegrityCheckResult,
  setOffChainCheckResult,
  setDecodedTokenAndEduProgramOnBKC,
} = appSlice.actions;
