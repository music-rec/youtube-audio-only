import { observer } from "mobx-react-lite";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Slider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { RootStoreContext } from "../stores/RootStore";
import { ui } from "../utils/UI";

interface Props {}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "100%",
  },
  row: {
    paddingHorizontal: 30,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  x: {
    color: "#b2a1a1",
    fontSize: 30,
  },
  timeText: {
    fontSize: 18,
  },
  line: {
    height: 8,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    marginTop: -30,
  },
  trackStyle: {
    height: 4,
  },
});

const iconSorter = (name: string, onPress: () => void) => (
  <Icon.Button
    color={ui.color1.color}
    backgroundColor="#063642"
    name={name}
    onPress={onPress}
  />
);

export const PlayerFooter: React.FC<Props> = observer(() => {
  const { playerStore } = React.useContext(RootStoreContext);

  console.log(Math.floor(playerStore.currentSong._duration));
  console.log(playerStore.currentSeconds);

  return (
    <View style={[styles.container, ui.bg3]}>
      {playerStore.currentSong._duration > 0 && (
        <View style={[styles.line]}>
          <Slider
            value={playerStore.currentSeconds}
            maximumValue={playerStore.duration}
            minimumValue={0}
            onSlidingComplete={value => {
              playerStore.setCurrentTime(value);
            }}
            trackStyle={styles.trackStyle}
          />
        </View>
      )}
      <View style={styles.row}>
        {iconSorter("backward", () => {
          console.log(playerStore.currentSong);
          playerStore.currentSong.setCurrentTime(455);
        })}
        {playerStore.playbackState === "playing" &&
          iconSorter("pause", () => {
            playerStore.pause();
          })}
        {playerStore.playbackState === "paused" &&
          iconSorter("play", () => {
            playerStore.resume();
          })}
        {iconSorter("forward", () => {
          console.log("ssss");
        })}
      </View>
    </View>
  );
});
