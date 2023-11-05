import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Fallback = () => {
	return (
		<View style={{ alignItems: "center" }}>
			<Image
				source={require("../assets/images/to-do-list.png")}
				style={styles.image}
			/>
			<View
				style={styles.view}
			>
				<Text style={styles.textShow}>Start Adding Your Task</Text>
			</View>
		</View>
	);
};

export default Fallback;

const styles = StyleSheet.create({

    image:{
        height: 300,
         width: 300
    },
    textShow:{
        color: "#fff"
    },
    view:{
        backgroundColor: "#000",
					paddingVertical: 12,
					paddingHorizontal: 12,
					borderRadius: 6,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.8,
					shadowRadius: 3,
					marginTop: 20,
    }


});