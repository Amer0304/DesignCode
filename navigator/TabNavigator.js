import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import { Ionicons } from "@expo/vector-icons";
import CoursesScreen from "../screens/CoursesScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import VideoScreen from "../screens/VideoScreen";

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        Section: SectionScreen,
        Video: VideoScreen
    },
    { mode: "modal" }
);

HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    const routeName = navigation.state.routes[navigation.state.index].routeName;

    if (routeName == "Section" || routeName == "Video") {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
        tabBarLabel: "Home",
        tabBarIcon: ({ focused }) => (
            <Ionicons name="ios-home" style={{ top: 5 }} size={24} color={focused ? activeColor : inactiveColor} />
        )
    };
};

const CoursesStack = createStackNavigator({
    Courses: CoursesScreen
});

CoursesStack.navigationOptions = {
    tabBarLabel: "Courses",
    tabBarIcon: ({ focused }) => (
        <Ionicons name="ios-albums" style={{ top: 5 }} size={24} color={focused ? activeColor : inactiveColor} />
    )
};

const ProjectsStack = createStackNavigator({
    Projects: ProjectsScreen
});

ProjectsStack.navigationOptions = {
    tabBarLabel: "Projects",
    tabBarIcon: ({ focused }) => (
        <Ionicons name="ios-folder" style={{ top: 5 }} size={24} color={focused ? activeColor : inactiveColor} />
    )
};

const TabNavigator = createBottomTabNavigator({
    HomeStack,
    CoursesStack,
    ProjectsStack
});

export default TabNavigator;
