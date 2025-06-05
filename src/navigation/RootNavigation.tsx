import {
  createNavigationContainerRef,
  CommonActions,
} from "@react-navigation/native";
import { RootStackParamList } from "./types";


export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function resetToMain() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Main" }],
      })
    );
  }
}
