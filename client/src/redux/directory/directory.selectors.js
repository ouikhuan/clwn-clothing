import { createSelector } from "reselect";

const selectDirectory = state => state.directory;
export const selectDirectoryItem = createSelector(
    [selectDirectory],
    directory => directory.sections
);
