import { AtomEffect, atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const persistAtomEffect: AtomEffect<any> = (param) => {
  param.getPromise(isClientSideState).then(() => persistAtom(param));
};

export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const authorizeState = atom({
  key: "authorizeState", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export const tokenState = atom<string | undefined>({
  key: "token",
  default: undefined,
  effects: [persistAtomEffect],
});

export const isClientSideState = atom({ key: "client-side", default: false });
