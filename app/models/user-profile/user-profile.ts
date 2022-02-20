import {Instance, SnapshotOut, types} from "mobx-state-tree"
import {ProfileTypes} from "../profile-types";


/**
 * Model description here for TypeScript hints.
 */
export const UserProfileModel = types
    .model("UserProfile")
    .props({
        profileType: types.optional(types.number, () => ProfileTypes.CREATE_USER_PROFILE),
        storageProviderName: types.optional(types.string, () => "Github"),
        storageProviderUsername: types.string,
        storageProviderToken: types.string,
        userAppType: types.optional(types.string, () => "Social Trading Desktop App")
    })
    .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
    .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type UserProfileType = Instance<typeof UserProfileModel>

export interface UserProfile extends UserProfileType {
}

type UserProfileSnapshotType = SnapshotOut<typeof UserProfileModel>

export interface UserProfileSnapshot extends UserProfileSnapshotType {
}

export const createUserProfileDefaultModel = () => types.optional(UserProfileModel, {})

